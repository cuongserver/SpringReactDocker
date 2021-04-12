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

export interface UserLoginRequestWithOtp {
  loginName: string;
  password: string;
  otp: string;
}

export interface UserLoginWithOtpDto {
  displayName: string;
  jwt: string;
}

export interface UserLoginWithOtpResponse {
  result: UserLoginWithOtpDto | null;
}
