export interface ILogin {
	email: string;
	password: string;
}

export interface IUser {
	email: string;
	password?: string;
	name: string;
	region: string;
	role?: number;
}

export interface IAuth {
	access_token: string;
	token_type: string;
	expires_in: string;
	scope: string;
}
