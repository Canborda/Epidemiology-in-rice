import { Component, AfterViewInit, Input } from '@angular/core';

import * as Leaflet from 'leaflet';

import { MapI } from 'src/app/models/map.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  private LEAFLET_MAP: Leaflet.Map | undefined;
  @Input() currentMap: MapI | undefined;

  constructor() {}

  private initMap(): void {
    // Create leaflet map
    this.LEAFLET_MAP = Leaflet.map('map', {
      center: [4.711, -74.0721],
      zoom: 12,
    });
    // Add openStreetMap layer to map
    const tiles = Leaflet.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );
    tiles.addTo(this.LEAFLET_MAP);
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  drawMap(map: MapI) {
    // Clean previous map
    //TODO this.LEAFLET_MAP?.removeLayer()
    // Add polygon
    const polygon = Leaflet.polygon(map.polygon as [number, number][], {
      color: 'red',
    }).addTo(this.LEAFLET_MAP as Leaflet.Map);
    this.LEAFLET_MAP?.fitBounds(polygon.getBounds());

    console.log(polygon);
  }
}
