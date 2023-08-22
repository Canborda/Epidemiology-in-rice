export interface GeeRequestI {
  map_id: string;
  index: string;
  cloudyPercentage: number;
}

export interface GeeImageResponseI {
  url: string;
  date: Date;
  bbox: Array<Float32List>;
}

// TODO remove deprecated interface when unused
export interface GeeDataResponseI {
  name?: string;
  date: Date;
  value: number;
}