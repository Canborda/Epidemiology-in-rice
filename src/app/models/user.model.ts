export interface LoginI {
  email: string;
  password: string;
}

export interface SignupI {
  email: string;
  password: string;
  name: string;
  region: string;
}

export interface AuthI {
  access_token: string;
  token_type: string;
  expires_in: string;
  scope: string;
}

export interface ResultI {
  success: boolean;
  message: string;
}
