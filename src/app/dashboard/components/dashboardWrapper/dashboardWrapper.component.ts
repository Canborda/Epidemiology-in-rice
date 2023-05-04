import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

import { MenuComponent } from '../menu/menu.component';
import { MapComponent } from '../map/map.component';
import { ChartComponent } from '../chart/chart.component';

import { UserService } from 'src/app/services/user.service';
import { GeeService } from 'src/app/services/gee.service';

import { UserI } from 'src/app/models/user.model';
import { ApiSuccessI, ApiErrorI } from 'src/app/models/api.model';
import { ImageRequestI, ImageResponseI } from 'src/app/models/gee.model';

import { MapI } from 'src/app/models/map.model';

@Component({
  selector: 'app-dashboard-wrapper',
  templateUrl: './dashboardWrapper.component.html',
  styleUrls: ['./dashboardWrapper.component.css'],
})
export class DashboardWrapperComponent implements OnInit {
  isExpanded: boolean = true;
  currentUser?: UserI;

  @ViewChild(MenuComponent) menu?: MenuComponent;
  @ViewChild(MapComponent) map?: MapComponent;
  @ViewChild(ChartComponent) chart?: ChartComponent;

  constructor(
    private router: Router,
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
        if (this.menu) this.menu.userName = this.currentUser.name;
      });
    }
  }

  // #region MENU OPTIONS actions

  onDrawMap() {
    this.map?.drawNewPolygon();
  }

  onSelectMap(map: MapI) {
    this.map?.drawExistingPolygon(map);
  }

  onGenerateImage(imgReq: ImageRequestI) {
    if (this.map?.currentMap?._id) {
      // Add map_id
      imgReq.map_id = this.map?.currentMap?._id;
      // Http request
      this.geeService.getImage(imgReq).subscribe({
        next: (v: ApiSuccessI<ImageResponseI>) => {
          this.map?.overlayImage(v.data);
          this.toastr.success(
            `Obtenida imagen para índice ${imgReq.index} de ${v.data.date}`,
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
