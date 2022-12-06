export interface ChartI {
  index: string;
  standardized: PointI[];
  estimated: PointI[];
}

export interface PointI {
  x: number;
  y: number;
}
