import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

import { CellEditComponent } from '../cell-edit/cell-edit.component';

import { CropsService } from 'src/app/services/crops.service';

import { ApiErrorI, ApiSuccessI } from 'src/app/models/api.model';
import { CropI, PhenologyI } from 'src/app/models/crop.model';
import { INDEXES } from 'src/utils/enums';

@Component({
  selector: 'app-crop-list',
  templateUrl: './crop-list.component.html',
  styleUrls: ['./crop-list.component.css'],
})
export class CropListComponent implements OnInit {
  cropList!: CropI[];
  selectedCrop?: CropI;
  table: any;
  tableHeaders: string[];

  constructor(
    private dialog: MatDialog,
    private cropsService: CropsService,
    private toastr: ToastrService
  ) {
    this.tableHeaders = ['Etapa Fenológica', 'Días'].concat(
      Object.values(INDEXES)
    );
  }

  ngOnInit(): void {
    this.cropsService.getCrops().subscribe({
      next: (v: ApiSuccessI<CropI[]>) => {
        this.cropList = v.data;
      },
      error: (e: HttpErrorResponse) => {
        const error: ApiErrorI = e.error;
        this.toastr.error(error.message, 'ERROR');
      },
    });
  }

  // #region BUTTON ACTIONS

  onSelectChange(): void {
    if (this.selectedCrop) {
      this.table = this.phenology2table(this.selectedCrop.phenology);
    }
  }

  onAddCrop(): void {
    console.log('ADD CROP BUTTON');
    // TODO implement Add Crop button
  }

  onDeleteCrop(): void {
    console.log('DELETE CROP BUTTON');
    // TODO implement Delete Crop button
  }

  onCellClick(row: any, col: string): void {
    this.dialog
      .open(CellEditComponent, {
        disableClose: true,
        data: { row, col, keys: this.tableHeaders },
      })
      .afterClosed()
      .subscribe((row: any) => {
        if (row) {
          this.selectedCrop!.phenology = this.table2phenology(this.table);
        }
      });
  }

  onAddRow(): void {
    console.log('ADD ROW BUTTON');
    // TODO implement Add Row button
  }

  onDeleteRow(): void {
    console.log('DELETE ROW BUTTON');
    // TODO implement Delete Row button
  }

  onSave(): void {
    console.log('SAVE BUTTON!');
    console.log(this.cropList);
    // TODO implement update crop button
    // TODO implement update ALL CROPS endpoint
  }

  // #endregion

  // #region AUX method

  phenology2table(phenologyList: PhenologyI[]): any {
    return phenologyList.map((phenology: PhenologyI) => {
      const row: any = {};
      row[this.tableHeaders[0]] = phenology.name;
      row[this.tableHeaders[1]] = phenology.days;
      Object.values(INDEXES).forEach((index) => {
        row[index] =
          phenology.indexes.find((i) => i.name === index)?.value ?? null;
      });
      return row;
    });
  }

  table2phenology(table: any): PhenologyI[] {
    return table.map((row: any) => {
      const phenology: PhenologyI = {
        name: row[this.tableHeaders[0]],
        days: row[this.tableHeaders[1]],
        indexes: [],
      };
      Object.values(INDEXES).forEach((index) => {
        if (row[index] !== null) {
          phenology.indexes.push({
            name: index,
            value: row[index],
          });
        }
      });
      return phenology;
    });
  }

  // #endregion
}
