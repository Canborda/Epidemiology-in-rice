import { Component, AfterViewInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

import * as Leaflet from 'leaflet';
import 'leaflet-draw';

import { MapAddComponent } from '../map-add/map-add.component';
import { MapI } from 'src/app/models/map.model';

import { MapsService } from 'src/app/services/maps.service';
import { GeeService } from 'src/app/services/gee.service';
import {
  ApiErrorI,
  ApiGeeSuccessI,
  ApiMapSuccessI,
} from 'src/app/models/api.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  private LEAFLET_MAP?: Leaflet.DrawMap;
  @Input() currentMap?: MapI;

  constructor(
    private dialog: MatDialog,
    private mapsService: MapsService,
    private geeService: GeeService,
    private toastr: ToastrService
  ) {}

  ngAfterViewInit(): void {
    // Create leaflet map
    this.LEAFLET_MAP = Leaflet.map('map').setView([4.711, -74.0721], 12);

    // Declare tile layers
    let osm = Leaflet.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>',
    });
    // TODO add google attributions
    let googleSat = Leaflet.tileLayer(
      'http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
      {
        minZoom: 2,
        maxZoom: 21,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      }
    );
    let googleHybrid = Leaflet.tileLayer(
      'http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',
      {
        minZoom: 2,
        maxZoom: 21,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      }
    );

    // Add tile layers
    // this.LEAFLET_MAP.addLayer(osm);
    // this.LEAFLET_MAP.addLayer(googleSat);
    this.LEAFLET_MAP.addLayer(googleHybrid);

    // Add leaflet-draw callbacks
    this.LEAFLET_MAP.on(Leaflet.Draw.Event.CREATED, (e) =>
      this.storeNewPolygon(e)
    );
  }

  // #region Maps CRUD

  drawExistingPolygon(map: MapI) {
    // Clean previous map
    //TODO this.LEAFLET_MAP?.removeLayer()
    // Add polygon
    const polygon = Leaflet.polygon(map.polygon as [number, number][], {
      color: 'red',
    }).addTo(this.LEAFLET_MAP as Leaflet.Map);
    this.LEAFLET_MAP?.fitBounds(polygon.getBounds());
    // Add map name
    polygon.bindPopup(map.name).openPopup();
    // Update current map
    this.currentMap = map;
  }

  drawNewPolygon() {
    if (this.LEAFLET_MAP) new Leaflet.Draw.Polygon(this.LEAFLET_MAP).enable();
  }

  storeNewPolygon(event: Leaflet.LeafletEvent) {
    const dialogRef = this.dialog.open(MapAddComponent);
    dialogRef.afterClosed().subscribe((map: MapI) => {
      if (map) {
        // Add polygon coordinates
        map.polygon = event.layer._latlngs[0].map(
          (pt: { lat: number; lng: number }) => [pt.lat, pt.lng]
        );
        // Http request
        this.mapsService.createMap(map).subscribe({
          next: (v: ApiMapSuccessI) => {
            this.toastr.success('Lote guardado exitosamente', 'SUCCESS');
            this.drawExistingPolygon(map);
          },
          error: (e: HttpErrorResponse) => {
            const error: ApiErrorI = e.error;
            this.toastr.error(error.message, 'ERROR');
          },
        });
        // Update current map
        this.currentMap = map;
      }
    });
  }

  // #endregion

  // #region GEE operations

  overlayImage(): void {
    if (this.currentMap) {
      this.geeService.getNdviImage(this.currentMap._id!).subscribe({
        next: (v: ApiGeeSuccessI) => {
          Leaflet.imageOverlay(
            v.data.url,
            v.data.bbox as Leaflet.LatLngBoundsExpression,
            { opacity: 0.8 }
          ).addTo(this.LEAFLET_MAP as Leaflet.Map);
          this.toastr.success(`Obtenido NDVI de ${v.data.date}`, 'SUCCESS');
        },
        error: (e: HttpErrorResponse) => {
          const error: ApiErrorI = e.error;
          this.toastr.error(error.message, 'ERROR');
        },
      });
    }
  }

  // #endregion
}
