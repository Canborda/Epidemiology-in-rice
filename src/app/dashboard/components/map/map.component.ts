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
  private LEAFLET_MAP?: Leaflet.Map;
  @Input() currentMap?: MapI;

  constructor() {}

  private initMap(): void {
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

    // Add edit toolbar
    const drawnItems = new Leaflet.FeatureGroup();
    this.LEAFLET_MAP?.addLayer(drawnItems);
    const drawControl = new Leaflet.Control.Draw({
      draw: {
        polyline: false,
        circlemarker: false,
      },
      edit: { featureGroup: drawnItems },
    });
    this.LEAFLET_MAP?.addControl(drawControl);

    // Add callbacks

    this.LEAFLET_MAP.on(Leaflet.Draw.Event.CREATED, (e) => {
      console.log(e.layer._latlngs);
      this.LEAFLET_MAP?.addLayer(e.layer);
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  loadPolygon(map: MapI) {
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
}
