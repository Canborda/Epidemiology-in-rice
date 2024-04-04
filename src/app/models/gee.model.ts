import { INDEXES } from "src/utils/enums";

export interface IGeeRequest {
	mapId: string;
	index: INDEXES;
	cloudyPercentage: number;
}

export interface IGeeImage {
	url: string;
	date: Date;
	bbox: Array<Float32List>;
}

export interface IGeeValueByDate {
	date: Date;
	value: number;
}
