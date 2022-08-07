import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { WrapperComponent } from '../wrapper/wrapper.component';
import { MapsService } from 'src/app/services/maps.service';
import { MapI } from 'src/app/models/map.model';

@Component({
  selector: 'app-map-list',
  templateUrl: './map-list.component.html',
  styleUrls: ['./map-list.component.css'],
})
export class MapListComponent implements OnInit {
  maplist?: MapI[];

  constructor(
    public dialogRef: MatDialogRef<WrapperComponent>,
    private mapsService: MapsService
  ) {}

  ngOnInit(): void {
    this.mapsService.getMaps().subscribe((result) => {
      this.maplist = result.data as MapI[];
    });
  }

  selectMap(map: MapI): void {
    this.dialogRef.close({ event: 'select', data: map });
  }

  createMap(): void {
    this.dialogRef.close({ event: 'create' });
  }
}
