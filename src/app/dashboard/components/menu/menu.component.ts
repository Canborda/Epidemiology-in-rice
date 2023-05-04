import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MapDrawComponent } from '../../modals/map-draw/map-draw.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  isExpanded: boolean = true;
  userName: string = 'USUARIO DE PRUEBA';

  @Output() drawMapEvent = new EventEmitter<void>();

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  // #region MENU OPTIONS actions

  onDrawMap(): void {
    const dialogRef = this.dialog.open(MapDrawComponent);
    dialogRef.afterClosed().subscribe((flag) => {
      if (flag) {
        this.drawMapEvent.emit(flag);
      }
    });
  }

  onSelectMap(): void {
    console.log('ON SELECT MAP');
  }

  onGenerateImage(): void {
    console.log('ON GENERATE IMAGE');
  }

  onGenerateChart(): void {
    console.log('ON GENERATE CHART');
  }

  onLogout(): void {
    console.log('ON LOGOUT');
  }

  // #endregion
}
