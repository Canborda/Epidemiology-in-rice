export interface ChartDatabaseI {
  name: string;
  date: Date;
  value: number;
  min: number;
  max: number;
}

export interface ChartGeeI {
  name?: string;
  date: Date;
  value: number;
}
