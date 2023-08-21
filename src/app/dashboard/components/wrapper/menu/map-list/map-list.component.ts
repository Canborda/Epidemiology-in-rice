import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

import { MenuComponent } from '../menu.component';
import { MapAddComponent } from '../../map/map-add/map-add.component';

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
    private dialog: MatDialog,
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

  onEditMap(oldMap: MapI): void {
    this.dialog
      .open(MapAddComponent, {
        data: { map: oldMap },
      })
      .afterClosed()
      .subscribe((newMap: MapI) => {
        if (newMap) {
          this.mapsService.updateMap(newMap).subscribe({
            next: () => {
              this.mapList[this.mapList.indexOf(oldMap)] = newMap;
              this.toastr.success('Lote actualizado exitosamente', 'SUCCESS');
            },
            error: (e: HttpErrorResponse) => {
              const error: ApiErrorI = e.error;
              this.toastr.error(error.message, 'ERROR');
            },
          });
        }
      });
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
