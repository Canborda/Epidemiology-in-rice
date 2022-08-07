import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { WrapperComponent } from '../wrapper/wrapper.component';
import { MapsService } from 'src/app/services/maps.service';
import { MapI } from 'src/app/models/map.model';

@Component({
  selector: 'app-maplist',
  templateUrl: './maplist.component.html',
  styleUrls: ['./maplist.component.css'],
})
export class MaplistComponent implements OnInit {
  maplist: MapI[] | undefined;

  constructor(
    public dialogRef: MatDialogRef<WrapperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private mapsService: MapsService
  ) {}

  ngOnInit(): void {
    this.mapsService.getMaps().subscribe((result) => {
      this.maplist = result.data;
    });
  }

  selectMap(map: MapI): void {
    this.dialogRef.close({ event: 'select', data: map });
  }

  createMap(): void {
    this.dialogRef.close({ event: 'create' });
  }

  // TODO Logic to create new map
}
