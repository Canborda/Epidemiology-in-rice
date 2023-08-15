export interface CropI {
  _id?: string;
  variety: string;
  phenology: PhenologyI[];
}

export interface PhenologyI {
  name: string;
  days: number;
  indexes: Array<IndexI>;
}

export interface IndexI {
  name: string;
  value: number;
}