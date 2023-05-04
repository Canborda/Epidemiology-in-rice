import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MapDrawComponent } from '../../modals/map-draw/map-draw.component';
import { MapListComponent } from '../../modals/map-list/map-list.component';
import { MapImageComponent } from '../../modals/map-image/map-image.component';

import { MapI } from 'src/app/models/map.model';
import { ImageRequestI } from 'src/app/models/gee.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  isExpanded: boolean = true;
  userName: string = 'USUARIO DE PRUEBA';

  @Output() drawMapEvent = new EventEmitter<void>();
  @Output() selectMapEvent = new EventEmitter<MapI>();
  @Output() generateImageEvent = new EventEmitter<ImageRequestI>();

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  // #region MENU OPTIONS actions

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
      .open(MapListComponent)
      .afterClosed()
      .subscribe((map: MapI) => {
        if (map) this.selectMapEvent.emit(map);
      });
  }

  onGenerateImage(): void {
    this.dialog
      .open(MapImageComponent)
      .afterClosed()
      .subscribe((imgReq: ImageRequestI) => {
        if (imgReq) this.generateImageEvent.emit(imgReq);
      });
  }

  onGenerateChart(): void {
    console.log('ON GENERATE CHART');
  }

  onLogout(): void {
    console.log('ON LOGOUT');
  }

  // #endregion
}
