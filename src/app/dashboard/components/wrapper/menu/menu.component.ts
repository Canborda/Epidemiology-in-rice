import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MapDrawComponent } from './map-draw/map-draw.component';
import { MapSelectComponent } from './map-select/map-select.component';
import { MapAnalyzeComponent } from './map-analyze/map-analyze.component';
import { StandardsConfigComponent } from './standards-config/standards-config.component'; //TODO REMOVE
import { AdminVarietiesComponent } from './admin-varieties/admin-varieties.component';
import { AdminClustersComponent } from './admin-clusters/admin-clusters.component';
import { UserConfigComponent } from './user-config/user-config.component';

import { MapI } from 'src/app/models/map.model';
import { GeeRequestI } from 'src/app/models/gee.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  isExpanded: boolean = true;
  userName: string = 'USER NAME';
  isAdmin: boolean = false;
  isMapSelected: boolean = false;

  @Output() drawMapEvent = new EventEmitter<void>();
  @Output() selectMapEvent = new EventEmitter<MapI>();
  @Output() analyzeMapEvent = new EventEmitter<GeeRequestI>();
  @Output() logoutEvent = new EventEmitter<void>();

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void { }

  // #region MAP SECTION methods

  onDrawMap(): void {
    this.dialog
      .open(MapDrawComponent)
      .afterClosed()
      .subscribe((flag: boolean) => {
        if (flag) this.drawMapEvent.emit();
      });
  }

  onSelectMap(): void {
    this.dialog
      .open(MapSelectComponent)
      .afterClosed()
      .subscribe((map: MapI) => {
        if (map) {
          this.selectMapEvent.emit(map);
          this.isMapSelected = true;
        }
      });
  }

  onAnalyzeMap(): void {
    this.dialog
      .open(MapAnalyzeComponent)
      .afterClosed()
      .subscribe((imgReq: GeeRequestI) => {
        if (imgReq) this.analyzeMapEvent.emit(imgReq);
      });
  }

  // #endregion

  // #region ADMIN SECTION methods

  // TODO REMOVE
  onStandardOptions(): void {
    this.dialog.open(StandardsConfigComponent);
  }

  onAdminVarieties(): void {
    this.dialog.open(AdminVarietiesComponent, { panelClass: 'custom-dialog', disableClose: true });
  }

  onAdminClusters(): void {
    this.dialog.open(AdminClustersComponent, { panelClass: 'custom-dialog', disableClose: true });
  }

  // #endregion

  // #region USER SECTION methods

  onUserOptions(): void {
    this.dialog.open(UserConfigComponent);
    // TODO update user name after closed
  }

  onLogout(): void {
    this.logoutEvent.emit();
  }

  // #endregion
}
