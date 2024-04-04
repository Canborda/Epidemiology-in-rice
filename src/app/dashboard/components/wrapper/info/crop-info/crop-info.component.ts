import { Component, OnInit } from '@angular/core';
import { IMap } from 'src/app/models/map.model';

@Component({
	selector: 'app-crop-info',
	templateUrl: './crop-info.component.html',
	styleUrls: ['./crop-info.component.css']
})
export class CropInfoComponent implements OnInit {
	name?: string;
	variety?: string;
	cluster?: string;
	startDate?: string;
	endDate?: string;

	constructor() { }

	ngOnInit(): void {
	}

	setTable(map?: IMap): void {
		this.name = map?.name;
		this.variety = map?.varietyId;
		this.cluster = map?.clusterId;
		this.startDate = map?.seedDate ? new Date(map.seedDate).toISOString().slice(0, 10) : undefined;
		// TODO this.endDate = map?.endDate
	}

}
