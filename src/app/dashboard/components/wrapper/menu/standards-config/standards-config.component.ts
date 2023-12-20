import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { VarietyI } from 'src/app/models/variety.model';
import { ClusterI } from 'src/app/models/cluster.model';
import { PhenologyI } from 'src/app/models/phenology.model';
import { IndexI } from 'src/app/models/index.model';
import { TableColI, TableRowI } from 'src/app/models/table.model';

import { INDEXES } from 'src/utils/enums';

@Component({
  selector: 'app-standards-config',
  templateUrl: './standards-config.component.html',
  styleUrls: ['./standards-config.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class StandardsConfigComponent implements OnInit {
  // HTML variables
  selectCluster: ClusterI[] = [];
  tabIndex = Object.values(INDEXES);
  tableHeaders: TableColI[] = [
    { label: 'Etapa Fenológica', value: 'name' },
    { label: 'Días', value: 'days' },
    { label: 'Límite inferior', value: 'min' },
    { label: 'Valor medio', value: 'mean' },
    { label: 'Límite superior', value: 'max' },
  ];
  table: any;
  // Component-level variables
  // TODO replace hardcoded values for mapped values from GetAll requests
  varietyList: VarietyI[] = [
    { _id: 'varietyId_1', name: 'GENEROSA' },
    { _id: 'varietyId_2', name: 'FEDEARROZ 70' },
  ];
  clusterList: ClusterI[] = [
    {
      _id: 'clusterId_1',
      varietyId: 'varietyId_1',
      name: 'Caribe',
      polygon: [],
    },
    {
      _id: 'clusterId_2',
      varietyId: 'varietyId_2',
      name: 'Llanos',
      polygon: [],
    },
    {
      _id: 'clusterId_3',
      varietyId: 'varietyId_1',
      name: 'Cluster 3',
      polygon: [],
    },
  ];
  phenologyList: PhenologyI[] = [
    {
      _id: 'phenologyId_1',
      varietyId: 'varietyId_1',
      clusterId: 'clusterId_1',
      name: 'Emergencia',
      days: 0,
    },
    {
      _id: 'phenologyId_2',
      varietyId: 'varietyId_1',
      clusterId: 'clusterId_1',
      name: 'Primordio',
      days: 10,
    },
    {
      _id: 'phenologyId_3',
      varietyId: 'varietyId_1',
      clusterId: 'clusterId_1',
      name: 'Floración',
      days: 20,
    },
    {
      _id: 'phenologyId_4',
      varietyId: 'varietyId_1',
      clusterId: 'clusterId_1',
      name: 'Cosecha',
      days: 30,
    },
    {
      _id: 'phenologyId_5',
      varietyId: 'varietyId_2',
      clusterId: 'clusterId_2',
      name: 'Etapa 1',
      days: 5,
    },
    {
      _id: 'phenologyId_6',
      varietyId: 'varietyId_2',
      clusterId: 'clusterId_2',
      name: 'Etapa 2',
      days: 12,
    },
  ];
  indexList: IndexI[] = [
    {
      _id: 'indexId_1',
      varietyId: 'varietyId_1',
      clusterId: 'clusterId_1',
      phenologyId: 'phenologyId_1',
      name: 'NDVI',
      min: 0.1,
      mean: 0.2,
      max: 0.3,
    },
    {
      _id: 'indexId_2',
      varietyId: 'varietyId_2',
      clusterId: 'clusterId_2',
      phenologyId: 'phenologyId_5',
      name: 'RVI',
      min: 0.5,
      mean: 0.4,
      max: 0.3,
    },
  ];
  selectedIndex: string = this.tabIndex[0];
  selectedVarietyId?: string;
  selectedClusterId?: string;
  selectedPhenologyId?: string;
  selectedIndexId?: string;

  constructor() {}

  ngOnInit(): void {}

  // #region SELECTORS actions

  onVarietyChange(id: string): void {
    this.selectedVarietyId = id;
    this.selectedClusterId = undefined;
    this.selectedIndex = this.tabIndex[0];

    // TODO restart other variables
    // Update cluster select according to selectedVarietyId
    this.selectCluster = this.clusterList.filter(
      (cluster) => cluster.varietyId === id
    );
  }

  onClusterChange(id: string): void {
    this.selectedClusterId = id;
    this.selectedIndex = this.tabIndex[0];
    this.table = this.models2table();
  }

  onIndexChange(index: number): void {
    this.selectedIndex = this.tabIndex[index];
    this.table = this.models2table();
  }

  // #region BUTTONS actions

  onVarietyAdd(): void {
    console.log('ADD VARIETY');
  }

  onVarietyDelete(): void {
    console.log('DELETE VARIETY');
  }

  onVarietyEdit(): void {
    console.log('EDIT VARIETY');
  }

  onClusterAdd(): void {
    console.log('ADD CLUSTER');
  }

  onClusterDelete(): void {
    console.log('DELETE CLUSTER');
  }

  onClusterEdit(): void {
    console.log('EDIT CLUSTER');
  }

  onPhenologyAdd(): void {
    console.log('ADD PHENOLOGY');
  }

  onPhenologyDelete(): void {
    console.log('DELETE PHENOLOGY');
  }

  onCellHover(row: TableRowI, col: TableColI): void {
    // Update phenologyId
    console.log(row);
    
    //TODO reset to undefined when out of table
    const phenology = this.phenologyList.find(
      (phenology: PhenologyI) =>
        phenology.varietyId === this.selectedVarietyId &&
        phenology.clusterId === this.selectedClusterId &&
        phenology.name === row.name
    );
    this.selectedPhenologyId = phenology?._id;
    // Update indexId
    //TODO reset to undefined when out of table
    const index = this.indexList.find(
      (index: IndexI) =>
        index.varietyId === this.selectedVarietyId &&
        index.clusterId === this.selectedClusterId &&
        index.phenologyId === this.selectedPhenologyId &&
        index.name === this.selectedIndex
    );
    this.selectedIndexId = index?._id;
  }

  onCellClick(row: TableRowI, col: TableColI): void {
    console.log('CELL CLICKED');
    //TODO implement modal to update cell values
  }

  onSave(): void {
    console.log('SAVE BUTTON PRESSED');
    // TODO implement update DB collections
  }

  // #endregion

  // #region AUX methods

  models2table(): TableRowI[] {
    return this.phenologyList
      .filter(
        (phenology: PhenologyI) =>
          phenology.varietyId === this.selectedVarietyId &&
          phenology.clusterId === this.selectedClusterId
      )
      .map((phenology: PhenologyI) => {
        const currentIndex: IndexI | undefined = this.indexList.find(
          (index: IndexI) =>
            index.varietyId === this.selectedVarietyId &&
            index.clusterId === this.selectedClusterId &&
            index.phenologyId === phenology._id &&
            index.name === this.selectedIndex
        );
        const currentRow: TableRowI = {
          name: phenology.name,
          days: phenology.days,
          min: currentIndex?.min,
          mean: currentIndex?.mean,
          max: currentIndex?.max,
        };
        return currentRow;
      });
  }

  // #endregion
}
