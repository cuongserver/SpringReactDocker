export interface TOTPSetupInfo {
  info: {
    totpInfo: {
      issuer: string;
      loginName: string;
      base32Key: string;
      TOTPUrl: string;
    };

    signature: string;
  };
}

export interface UserSetupMfaRequest {
  pin1: string;
  pin2: string;
  signature: string;
}

export interface UserSetupMfaResponse {
  result: boolean;
}
