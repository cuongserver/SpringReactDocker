import { BaseApiHandler } from "http/base-api-handler";
import {
  UserLoginRequest,
  UserLoginRequestWithOtp,
  UserLoginResponse,
  UserLoginWithOtpResponse,
} from "http/models/user-login";
import { userEndpoints } from "http/config/endpoints";
import {
  TOTPSetupInfo,
  UserSetupMfaRequest,
  UserSetupMfaResponse,
} from "http/models/TOTPSetupInfo";
import { store } from "store";

export const userApiHandlers = {
  async doLogin(request: UserLoginRequest) {
    const handler = new BaseApiHandler().setRetry(3);
    return await handler.send<UserLoginResponse>({
      url: userEndpoints.login.url,
      method: userEndpoints.login.method,
      data: request,
    });
  },
  async getTOTPSetupInfo() {
    const handler = new BaseApiHandler()
      .setRetry(3)
      .appendHeader("Authorization", store.getState().identity.jwt);
    return await handler.send<TOTPSetupInfo>({
      url: userEndpoints.getTOTPSetupInfo.url,
      method: userEndpoints.getTOTPSetupInfo.method,
    });
  },
  async postTOTPSetup(request: UserSetupMfaRequest) {
    const handler = new BaseApiHandler()
      .setRetry(3)
      .appendHeader("Authorization", store.getState().identity.jwt);
    return await handler.send<UserSetupMfaResponse>({
      url: userEndpoints.postTOTPSetup.url,
      method: userEndpoints.postTOTPSetup.method,
      data: request,
    });
  },
  async doLoginWithOtp(request: UserLoginRequestWithOtp) {
    const handler = new BaseApiHandler().setRetry(3);
    return await handler.send<UserLoginWithOtpResponse>({
      url: userEndpoints.loginWithOtp.url,
      method: userEndpoints.loginWithOtp.method,
      data: request,
    });
  },
};
