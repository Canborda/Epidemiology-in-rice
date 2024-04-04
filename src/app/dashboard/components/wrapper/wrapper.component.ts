import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

import { MenuComponent } from './menu/menu.component';
import { MapComponent } from './map/map.component';
import { InfoComponent } from './info/info.component';

import { UserService } from 'src/app/services/user.service';
import { CropsService } from 'src/app/services/crops.service';
import { GeeService } from 'src/app/services/gee.service';

import { IApiSuccess, IApiError } from 'src/app/models/api.model';
import { IUser } from 'src/app/models/user.model';
import { MapI } from 'src/app/models/map.model';
import { GeeImageResponseI, GeeRequestI } from 'src/app/models/gee.model';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css'],
})
export class WrapperComponent implements OnInit {
  // Children
  @ViewChild(MenuComponent) menu?: MenuComponent;
  @ViewChild(MapComponent) map?: MapComponent;
  @ViewChild(InfoComponent) info?: InfoComponent;
  // Component-level variables
  currentUser?: IUser;
  // TODO add currentMap
  // TODO add mapList
  // TODO add cropList
  // TODO add indexList

  constructor(
    private router: Router,
    private userService: UserService,
    private cropService: CropsService,
    private geeService: GeeService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    // Check if login
    const access_token = localStorage.getItem('access_token');
    if (!access_token) {
      this.toastr.error('No has iniciado sesión', 'ERROR');
      this.router.navigate(['home/login']);
    } else {
      // Get user with token
      this.userService.getUser().subscribe({
        next: (v: IApiSuccess<IUser>) => {
          this.currentUser = v.data;
          if (this.menu) {
            this.menu.userName = this.currentUser.name;
            this.menu.isAdmin = this.currentUser.role === 1;
          }
        },
      });
    }
  }

  // #region RECEIVED_EVENTS methods

  onDrawMapEvent(): void {
    this.map?.clearCanvas();
    this.map?.drawNewPolygon();
  }

  onSelectMapEvent(map: MapI): void {
    this.map?.drawExistingPolygon(map);
  }

  onAnalyzeMapEvent(data: GeeRequestI): void {
    data.map_id = this.map!.currentMap!._id!;
    // TODO implement received event
  }

  onLogoutEvent(): void {
    localStorage.clear();
    this.router.navigate(['']);
  }

  // #endregion
}
