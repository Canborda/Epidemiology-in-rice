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

interface ICoordinates {
    latitude: number;
    longitude: number;
}