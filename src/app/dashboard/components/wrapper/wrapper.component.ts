import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { UserService } from 'src/app/services/user.service';
import { SignupI } from 'src/app/models/user.model';

import { MapComponent } from '../map/map.component';
import { MapListComponent } from '../map-list/map-list.component';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css'],
})
export class WrapperComponent implements OnInit {
  isExpanded: boolean = true;
  currentUser?: SignupI;

  @ViewChild(MapComponent) map?: MapComponent;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private userService: UserService,
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
      this.onMapList();
    }
  }

  // #region NavBar actions

  onMapList(): void {
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

  onLogout(): void {
    localStorage.clear();
    this.router.navigate(['']);
  }

  geeTest(): void {
    this.map?.overlayImage();
  }

  // #endregion
}
