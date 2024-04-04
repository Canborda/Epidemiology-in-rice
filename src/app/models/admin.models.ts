import { INDEXES } from "src/utils/enums";

export interface IVariety {
    _id?: string;
    name: string;
}

export interface ICluster {
    _id?: string;
    varietyId: string;
    name: string;
    polygon: Array<ICoordinates>
}

export interface IPhenology {
    _id?: string;
    varietyId: string;
    clusterId: string;
    name: string;
    days: number;
}

export interface IIndex {
    _id?: string;
    varietyId: string;
    clusterId: string;
    phenologyId: string;
    name: INDEXES;
    min?: number;
    mean?: number;
    max?: number;
}

interface ICoordinates {
    latitude: number;
    longitude: number;
}