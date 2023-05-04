import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { MenuComponent } from '../../components/menu/menu.component';

@Component({
  selector: 'app-draw-map',
  templateUrl: './draw-map.component.html',
  styleUrls: ['./draw-map.component.css'],
})
export class DrawMapComponent implements OnInit {
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
