export interface ImagesRequestI {
  map_id: string;
  index: string;
  cloudyPercentage: number;
}

export interface ImagesResponseI {
  url: string;
  date: Date;
  bbox: Array<Float32List>;
}
