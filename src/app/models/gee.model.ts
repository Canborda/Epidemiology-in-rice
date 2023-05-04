export interface ImageRequestI {
  map_id: string;
  index: string;
  cloudyPercentage: number;
}

export interface ImageResponseI {
  url: string;
  date: Date;
  bbox: Array<Float32List>;
}
