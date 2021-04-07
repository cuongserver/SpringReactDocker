export interface UserLoginRequest {
  loginName: string;
  password: string;
}

export interface UserLoginDto {
  displayName: string;
  jwt: string;
  mfaEnabled: boolean;
}

export interface UserLoginResponse {
  result: UserLoginDto | null;
}
