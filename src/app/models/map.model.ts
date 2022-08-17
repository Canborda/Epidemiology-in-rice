export interface MapI {
  _id?: string;
  name: string;
  crop: string;
  seedDate: Date;
  polygon: Array<Float32List>;
}
