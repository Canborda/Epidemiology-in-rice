import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

import { MenuComponent } from './menu/menu.component';
import { MapComponent } from './map/map.component';
import { ChartComponent } from '../chart/chart.component';

import { UserService } from 'src/app/services/user.service';
import { CropsService } from 'src/app/services/crops.service';
import { GeeService } from 'src/app/services/gee.service';

import { ApiSuccessI, ApiErrorI } from 'src/app/models/api.model';
import { UserI } from 'src/app/models/user.model';
import {
  GeeRequestI,
  GeeImageResponseI,
  GeeDataResponseI,
} from 'src/app/models/gee.model';

import { MapI } from 'src/app/models/map.model';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css'],
})
export class WrapperComponent implements OnInit {
  currentUser?: UserI;

  @ViewChild(MenuComponent) menu?: MenuComponent;
  @ViewChild(MapComponent) map?: MapComponent;
  @ViewChild(ChartComponent) chart?: ChartComponent;

  constructor(
    private router: Router,
    private userService: UserService,
    private cropService: CropsService,
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
      this.userService.getUser().subscribe({
        next: (v: ApiSuccessI<UserI>) => {
          this.currentUser = v.data;
          if (this.menu) {
            this.menu.userName = this.currentUser.name;
            this.menu.isAdmin = this.currentUser.role === 1;
          }
        },
      });
    }
  }

  // #region MENU OPTIONS actions

  onDrawMap(): void {
    this.map?.clearCanvas();
    this.map?.drawNewPolygon();
  }

  onSelectMap(map: MapI): void {
    this.map?.drawExistingPolygon(map);
  }

  onAnalyzeMap(geeReq: GeeRequestI): void {
    if (this.map?.currentMap?._id) {
      // Add map_id
      geeReq.map_id = this.map?.currentMap?._id;
      // Http request to get image
      this.geeService.getImage(geeReq).subscribe({
        next: (v: ApiSuccessI<GeeImageResponseI>) => {
          this.map?.overlayImage(v.data);
          this.toastr.success(
            `Obtenida imagen para índice ${geeReq.index} de ${v.data.date}`,
            'SUCCESS'
          );
        },
        error: (e: HttpErrorResponse) => {
          const error: ApiErrorI = e.error;
          this.toastr.error(error.message, 'ERROR');
        },
      });
      // Http request to get crop data from DB
      this.cropService.getPhenology(geeReq).subscribe({
        next: (v: ApiSuccessI<GeeDataResponseI[]>) => {
          if (this.chart) {
            // Set crop data into chart component
            this.chart.cropData = v.data;
            // Update chart
            this.chart.updateChart(geeReq.index);
          }
          this.toastr.success(
            `Obtenido modelo para índice ${geeReq.index} con ${v.count} etapas fenológicas`,
            'SUCCESS'
          );
        },
        error: (e: HttpErrorResponse) => {
          const error: ApiErrorI = e.error;
          this.toastr.error(error.message, 'ERROR');
        },
      });
      // Http request to get crop data from GEE
      this.geeService.getPhenology(geeReq).subscribe({
        next: (v: ApiSuccessI<GeeDataResponseI[]>) => {
          if (this.chart) {
            // Set gee data into chart component
            this.chart.geeData = v.data;
            // Update chart
            this.chart.updateChart(geeReq.index);
          }
          this.toastr.success(
            `Obtenidos datos para índice ${geeReq.index} con ${v.count} imágenes`,
            'SUCCESS'
          );
        },
        error: (e: HttpErrorResponse) => {
          const error: ApiErrorI = e.error;
          this.toastr.error(error.message, 'ERROR');
        },
      });
    } else {
      this.toastr.error('Debe seleccionar un mapa primero', 'ERROR');
    }
  }

  onLogout(): void {
    localStorage.clear();
    this.router.navigate(['']);
  }

  // #endregion
}
