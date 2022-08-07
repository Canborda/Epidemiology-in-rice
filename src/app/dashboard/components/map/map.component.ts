import { Component, AfterViewInit, Input } from '@angular/core';

import * as Leaflet from 'leaflet';
import 'leaflet-draw';

import { MapI } from 'src/app/models/map.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  private LEAFLET_MAP?: Leaflet.DrawMap;
  @Input() currentMap?: MapI;

  constructor() {}

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
    this.LEAFLET_MAP.addLayer(googleSat);
    // this.LEAFLET_MAP.addLayer(googleHybrid);

    // Add leaflet-draw callbacks
    this.LEAFLET_MAP.on(Leaflet.Draw.Event.CREATED, (e) =>
      this.storeNewPolygon(e)
    );
  }

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
  }

  drawNewPolygon() {
    if (this.LEAFLET_MAP) new Leaflet.Draw.Polygon(this.LEAFLET_MAP).enable();
  }

  storeNewPolygon(event: Leaflet.LeafletEvent) {
    // TODO Rise dialog to store new map
    console.log(event.layer._latlngs);
    this.LEAFLET_MAP?.addLayer(event.layer);
  }
}
