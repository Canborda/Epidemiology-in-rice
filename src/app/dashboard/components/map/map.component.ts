import { Component, AfterViewInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

import * as Leaflet from 'leaflet';
import 'leaflet-draw';

import { MapAddComponent } from '../../modals/map-add/map-add.component';

import { MapsService } from 'src/app/services/maps.service';

import { MapI } from 'src/app/models/map.model';
import { ApiSuccessI, ApiErrorI } from 'src/app/models/api.model';
import { ImageResponseI } from 'src/app/models/gee.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  @Input() currentMap?: MapI;
  private LEAFLET_MAP?: Leaflet.DrawMap;
  private currentPolygon?: Leaflet.Polygon;
  private currentImage?: Leaflet.ImageOverlay;

  constructor(
    private dialog: MatDialog,
    private mapsService: MapsService,
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
    this.currentPolygon?.remove();
    this.currentImage?.remove();
    // Add polygon
    this.currentPolygon = Leaflet.polygon(map.polygon as [number, number][], {
      color: 'red',
    }).addTo(this.LEAFLET_MAP as Leaflet.Map);
    this.LEAFLET_MAP?.fitBounds(this.currentPolygon.getBounds());
    // Add map name
    this.currentPolygon.bindPopup(map.name).openPopup();
    // Update current map
    this.currentMap = map;
  }

  drawNewPolygon() {
    if (this.LEAFLET_MAP) new Leaflet.Draw.Polygon(this.LEAFLET_MAP).enable();
  }

  storeNewPolygon(event: Leaflet.LeafletEvent) {
    this.dialog
      .open(MapAddComponent)
      .afterClosed()
      .subscribe((map: MapI) => {
        if (map) {
          // Add polygon coordinates
          map.polygon = event.layer._latlngs[0].map(
            (pt: { lat: number; lng: number }) => [pt.lat, pt.lng]
          );
          // Http request
          this.mapsService.createMap(map).subscribe({
            next: (v: ApiSuccessI<MapI>) => {
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

  overlayImage(data: ImageResponseI): void {
    // Clean previous map
    this.currentPolygon?.remove();
    this.currentImage?.remove();
    if (this.currentMap) {
      this.currentImage = Leaflet.imageOverlay(
        data.url,
        data.bbox as Leaflet.LatLngBoundsExpression,
        { opacity: 1 }
      );
      this.currentImage.addTo(this.LEAFLET_MAP as Leaflet.Map);
    }
  }

  // #endregion
}
