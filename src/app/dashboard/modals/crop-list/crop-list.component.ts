import { Component, OnInit } from '@angular/core';

import { CropsService } from 'src/app/services/crops.service';

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
  columnsToDisplay: string[];

  constructor(private cropsService: CropsService) {
    this.columnsToDisplay = ['Phenology', 'Days'].concat(
      Object.values(INDEXES)
    );
  }

  ngOnInit(): void {
    this.cropsService.getCrops().subscribe((result) => {
      this.cropList = result.data;
    });
  }

  // #region BUTTON ACTIONS

  onSelectChange(): void {
    console.log('SELECT VALUE CHANGED');
    console.log(this.selectedCrop);
    if (this.selectedCrop) {
      this.table = this.phenology2table(this.selectedCrop.phenology);
    }
  }

  onCellClick(row: any, col: string): void {
    console.log('CELL CLICKED');
    console.log(row);
    console.log(col);
  }

  onAddRow(): void {
    console.log('ADD ROW BUTTON');
    // TODO implement Add Row button
  }
  
  onDeleteRow(): void {
    console.log('DELETE ROW BUTTON'); 
    // TODO implement Delete Row button
  }

  onUpdate(): void {
    console.log('UPDATE BUTTON!');
    // TODO implement update crop button
  }

  // #endregion

  // #region AUX method

  phenology2table(phenologyList: PhenologyI[]) {
    return phenologyList.map((phenology) => {
      let row: any = {};
      row['Phenology'] = phenology.name;
      row['Days'] = phenology.days;
      Object.values(INDEXES).forEach((index) => {
        row[index] =
          phenology.indexes.find((i) => i.name === index)?.value ?? null;
      });
      return row;
    });
  }

  // #endregion
}
