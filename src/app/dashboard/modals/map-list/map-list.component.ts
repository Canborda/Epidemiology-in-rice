import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

import { MenuComponent } from '../../components/menu/menu.component';

import { CropsService } from 'src/app/services/crops.service';
import { MapsService } from 'src/app/services/maps.service';

import { ApiErrorI, ApiSuccessI } from 'src/app/models/api.model';
import { CropI } from 'src/app/models/crop.model';
import { MapI } from 'src/app/models/map.model';

@Component({
  selector: 'app-map-list',
  templateUrl: './map-list.component.html',
  styleUrls: ['./map-list.component.css'],
})
export class MapListComponent implements OnInit {
  mapList!: MapI[];
  tableHeaders: string[] = [
    'Nombre',
    'Cultivo',
    'Fecha de Emergencia',
    'Acciones',
  ];
  cropNames: any = {};

  constructor(
    public dialogRef: MatDialogRef<MenuComponent>,
    private cropsService: CropsService,
    private mapsService: MapsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.mapsService.getMaps().subscribe({
      next: (v_map: ApiSuccessI<MapI[]>) => {
        this.mapList = v_map.data;
        this.cropsService.getCrops().subscribe({
          next: (v_crop: ApiSuccessI<CropI[]>) => {
            v_crop.data.forEach((crop) => {
              this.cropNames[crop._id!] = crop.variety;
            });
          },
          error: (e: HttpErrorResponse) => {
            const error: ApiErrorI = e.error;
            this.toastr.error(error.message, 'ERROR');
          },
        });
      },
      error: (e: HttpErrorResponse) => {
        const error: ApiErrorI = e.error;
        this.toastr.error(error.message, 'ERROR');
      },
    });
  }

  // #region BUTTON ACTIONS

  onEditMap(map: MapI): void {
    console.log('EDIT MAP');
    console.log(map);
    // TODO implement modal to edit map name, crop & seedDate (can use add-map modal ?)
  }

  onSelectMap(map: MapI): void {
    this.dialogRef.close(map);
  }

  onDeleteMap(deletedMap: MapI): void {
    this.mapsService.deleteMap(deletedMap._id!).subscribe({
      next: () => {
        this.mapList = this.mapList.filter((map) => map._id !== deletedMap._id);
        this.toastr.success('Lote eliminado exitosamente', 'SUCCESS');
      },
      error: (e: HttpErrorResponse) => {
        const error: ApiErrorI = e.error;
        this.toastr.error(error.message, 'ERROR');
      },
    });
  }

  // #endregion

  // #region AUX methods

  formatDate(date: any) {
    return new Date(date).toISOString().slice(0, 10);
  }

  // #endregion
}
