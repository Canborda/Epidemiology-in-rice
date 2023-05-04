import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

import { DashboardWrapperComponent } from '../dashboardWrapper/dashboardWrapper.component';
import { MapI } from 'src/app/models/map.model';

import { MapsService } from 'src/app/services/maps.service';
import { ApiErrorI } from 'src/app/models/api.model';

@Component({
  selector: 'app-map-list',
  templateUrl: './map-list.component.html',
  styleUrls: ['./map-list.component.css'],
})
export class MapListComponent implements OnInit {
  table!: MatTableDataSource<MapI>;
  columnsToDisplay: string[] = ['name', 'actions'];

  constructor(
    public dialogRef: MatDialogRef<DashboardWrapperComponent>,
    private mapsService: MapsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.mapsService.getMaps().subscribe((result) => {
      this.table = new MatTableDataSource(result.data as MapI[]);
    });
  }

  selectMap(map: MapI): void {
    this.dialogRef.close({ event: 'select', data: map });
  }

  createMap(): void {
    this.dialogRef.close({ event: 'create' });
  }

  deleteMap(map: MapI): void {
    this.mapsService.deleteMap(map._id!).subscribe({
      next: () => {
        // Update table
        const idx = this.table.data.indexOf(map);
        this.table.data.splice(idx, 1);
        this.table._updateChangeSubscription();
        this.toastr.success('Lote eliminado exitosamente', 'SUCCESS');
      },
      error: (e: HttpErrorResponse) => {
        const error: ApiErrorI = e.error;
        this.toastr.error(error.message, 'ERROR');
      },
    });
  }
}
