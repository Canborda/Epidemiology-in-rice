import { AfterViewInit, Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import * as Leaflet from 'leaflet';
import 'leaflet-draw';

import { MapAddComponent } from './map-add/map-add.component';
import { MapsService } from 'src/app/services/maps.service';
import { LocationService } from 'src/app/services/location.service';

import { IMap, IPosition } from 'src/app/models/map.model';
import { GeeImageResponseI } from 'src/app/models/gee.model';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
	@Input() currentMap?: IMap;
	private LEAFLET_MAP?: Leaflet.DrawMap;
	private currentPolygon?: Leaflet.Polygon;
	private currentImage?: Leaflet.ImageOverlay;
	private defaultPosition!: IPosition;

	constructor(
		private dialog: MatDialog,
		private toastr: ToastrService,
		private mapsService: MapsService,
		private locationService: LocationService,
	) { }

	ngAfterViewInit(): void {
		// Get user location
		this.locationService
			.getPosition()
			.then((pos: IPosition) => {
				this.defaultPosition = pos;
			})
			.then(() => {
				// Create leaflet map
				this.LEAFLET_MAP = Leaflet.map('map').setView(
					[this.defaultPosition.latitude, this.defaultPosition.longitude],
					this.defaultPosition.zoom
				);

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
			});
	}

	// #region MAP actions

	drawExistingPolygon(map: IMap): void {
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

	drawNewPolygon(): void {
		if (this.LEAFLET_MAP) new Leaflet.Draw.Polygon(this.LEAFLET_MAP).enable();
	}

	storeNewPolygon(event: Leaflet.LeafletEvent): void {
		this.dialog
			.open(MapAddComponent, {
				data: {
					polygon: event.layer._latlngs[0].map((pt: { lat: number; lng: number }) => [pt.lat, pt.lng]),
				},
			}).afterClosed()
			.subscribe((map: IMap) => {
				if (map) {
					this.mapsService.create(map).subscribe({
						next: s => {
							this.toastr.success(`Lote "${map.name}" guardado exitosamente`);
							this.drawExistingPolygon(map);
						},
						error: e => {
							this.toastr.error(e.error.message);
						},
					});
					this.currentMap = map;
				} else {
					this.clearCanvas();
				}
			});
	}

	// #endregion

	// #region GEE actions

	overlayImage(data: GeeImageResponseI): void {
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

	// #region AUX methods

	clearCanvas(): void {
		this.currentMap = undefined;
		// Clean previous map
		this.currentPolygon?.remove();
		this.currentImage?.remove();
		// Restart view
		this.LEAFLET_MAP?.setView(
			[this.defaultPosition.latitude, this.defaultPosition.longitude],
			this.defaultPosition.zoom
		);
	}

	// #endregion
}
