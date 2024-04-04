export interface ITableRow {
	name: string;
	days: number;
	min?: number;
	mean?: number;
	max?: number;
}

export interface ITableCol {
	label: string;
	value: string;
}
