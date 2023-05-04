import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

import { GeeService } from 'src/app/services/gee.service';
import { UserService } from 'src/app/services/user.service';
import { SignupI } from 'src/app/models/user.model';
import { ImagesRequestI, ImagesResponseI } from 'src/app/models/gee.model';
import { ApiErrorI, ApiSuccessI } from 'src/app/models/api.model';

import { MapComponent } from '../map/map.component';
import { MapListComponent } from '../map-list/map-list.component';
import { ChartComponent } from '../chart/chart.component';
import { ImageLoadComponent } from '../image-load/image-load.component';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css'],
})
export class WrapperComponent implements OnInit {
  isExpanded: boolean = true;
  currentUser?: SignupI;

  @ViewChild(MapComponent) map?: MapComponent;
  @ViewChild(ChartComponent) chart?: ChartComponent;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private userService: UserService,
    private geeService: GeeService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // Check if login
    const access_token = localStorage.getItem('access_token');
    if (!access_token) {
      this.toastr.error('No has iniciado sesión', 'ERROR');
      this.router.navigate(['home/login']);
    } else {
      // Get user with token
      this.userService.getUser().subscribe((result) => {
        this.currentUser = result.data;
      });
      this.onLoadMaps();
    }
  }

  // #region NavBar actions

  onLoadMaps(): void {
    const dialogRef = this.dialog.open(MapListComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.event === 'select') {
        this.map?.drawExistingPolygon(result.data);
        this.toastr.info(
          `Obteniendo información del lote "${result.data.name}".`,
          'INFO'
        );
      } else if (result?.event === 'create') {
        this.map?.drawNewPolygon();
        this.toastr.info(
          `Agregue puntos en el mapa hasta crear una forma cerrada.`,
          'INFO'
        );
      }
    });
  }

  onLoadImages(): void {
    const dialogRef = this.dialog.open(ImageLoadComponent);
    dialogRef.afterClosed().subscribe((data: ImagesRequestI) => {
      if (this.map?.currentMap?._id) {
        // Add map_id
        data.map_id = this.map.currentMap._id;
        // Http request
        this.geeService.getImages(data).subscribe({
          next: (v: ApiSuccessI<ImagesResponseI>) => {
            this.map?.overlayImage(v.data);
            this.toastr.success(
              `Obtenida imagen para índice ${data.index} de ${v.data.date}`,
              'SUCCESS'
            );
          },
          error: (e: HttpErrorResponse) => {
            const error: ApiErrorI = e.error;
            this.toastr.error(error.message, 'ERROR');
          },
        });
      }
    });
  }

  onLogout(): void {
    localStorage.clear();
    this.router.navigate(['']);
  }

  onIndexSelected(index: string): void {
    // this.map?.overlayImage();
    this.chart?.plotPolygonInfo(index);
  }

  geeTest(): void {
    // this.map?.overlayImage();
  }

  // #endregion
}
