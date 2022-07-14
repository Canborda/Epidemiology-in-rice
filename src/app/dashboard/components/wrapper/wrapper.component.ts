import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { MaplistComponent } from '../maplist/maplist.component';
import { MapComponent } from '../map/map.component';
import { UserService } from 'src/app/services/user.service';
import { SignupI } from 'src/app/models/user.model';
import { MapI } from 'src/app/models/map.model';

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
      this.onMaps();
    }
  }

  ngAfterViewInit() {}

  // #region NavBar actions

  onMaps(): void {
    const dialogRef = this.dialog.open(MaplistComponent);
    dialogRef.afterClosed().subscribe((result) => {
      this.toastr.info(
        `Obteniendo información del lote "${result.name}".`,
        'INFO'
      );
      // Draw map on Leaflet
      this.map?.drawMap(result);
    });
  }

  onLogout(): void {
    localStorage.clear();
    this.router.navigate(['']);
  }

  // #endregion
}
