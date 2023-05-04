import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { MenuComponent } from '../../components/menu/menu.component';

@Component({
  selector: 'app-map-draw',
  templateUrl: './map-draw.component.html',
  styleUrls: ['./map-draw.component.css'],
})
export class MapDrawComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<MenuComponent>) {}

  ngOnInit(): void {}

  // #region DIALOG ACTIONS

  onStart(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  // #endregion
}
