import { ICluster, IVariety } from "./admin.models";

export interface IMap {
	_id?: string;
	varietyId: IVariety['_id'],
	clusterId: ICluster['_id'],
	name: string;
	seedDate: Date;
	polygon: Array<Float32List>;
}

export interface IPosition {
	latitude: number;
	longitude: number;
	zoom: number;
}