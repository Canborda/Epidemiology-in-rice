import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

import { MenuComponent } from '../menu.component';
import { CellDialogComponent } from './cell-dialog/cell-dialog.component';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

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
    public dialogRef: MatDialogRef<MenuComponent>,
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
    this.dialog
      .open(AddDialogComponent, {
        disableClose: true,
        data: {
          entity: 'Variedad',
          list: this.cropList.map((crop) => crop.variety),
        },
      })
      .afterClosed()
      .subscribe((name: any) => {
        if (name) {
          const newCrop: CropI = {
            variety: name,
            phenology: [],
          };
          this.cropList.push(newCrop);
          this.selectedCrop = this.cropList[this.cropList.length - 1];
          this.table = this.phenology2table(this.selectedCrop!.phenology);
        }
      });
  }

  onDeleteCrop(): void {
    this.dialog
      .open(DeleteDialogComponent, {
        disableClose: true,
        data: { entity: 'Variedad' },
      })
      .afterClosed()
      .subscribe((name: any) => {
        this.cropList = this.cropList.filter(
          (crop: CropI) => crop.variety !== name
        );
        if (this.selectedCrop?.variety === name) this.selectedCrop = undefined;
      });
  }

  onCellClick(row: any, col: string): void {
    this.dialog
      .open(CellDialogComponent, {
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
    this.dialog
      .open(AddDialogComponent, {
        disableClose: true,
        data: {
          entity: this.tableHeaders[0],
          list: this.table.map((row: any) => row[this.tableHeaders[0]]),
        },
      })
      .afterClosed()
      .subscribe((name: any) => {
        if (name) {
          const allDays = this.table?.length
            ? this.table.map((row: any) => row[this.tableHeaders[1]])
            : [0];
          const newPhenology: PhenologyI = {
            name: name,
            days: Math.max(...allDays),
            indexes: [],
          };
          this.selectedCrop!.phenology.push(newPhenology);
          this.table = this.phenology2table(this.selectedCrop!.phenology);
        }
      });
  }

  onDeleteRow(): void {
    this.dialog
      .open(DeleteDialogComponent, {
        disableClose: true,
        data: { entity: this.tableHeaders[0] },
      })
      .afterClosed()
      .subscribe((name: any) => {
        this.selectedCrop!.phenology = this.selectedCrop!.phenology.filter(
          (stage: PhenologyI) => stage.name !== name
        );
        this.table = this.phenology2table(this.selectedCrop!.phenology);
      });
  }

  onSave(): void {
    this.cropsService.updateAllCrops(this.cropList).subscribe({
      next: () => {
        this.toastr.success('Cultivos actualizados exitosamente', 'SUCCESS');
      },
      error: (e: HttpErrorResponse) => {
        const error: ApiErrorI = e.error;
        this.toastr.error(error.message, 'ERROR');
      },
    });
    this.dialogRef.close();
  }

  // #endregion

  // #region AUX methods

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
