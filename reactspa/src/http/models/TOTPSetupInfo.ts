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
