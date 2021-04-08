import { BaseApiHandler } from "http/base-api-handler";
import { UserLoginRequest, UserLoginResponse } from "http/models/user-login";
import { userEndpoints } from "http/config/endpoints";
import { TOTPSetupInfo } from "../models/TOTPSetupInfo";

export const userApiHandlers = {
  async doLogin(request: UserLoginRequest) {
    const handler = new BaseApiHandler().setRetry(3);
    return await handler.send<UserLoginResponse>({
      url: userEndpoints.login.url,
      method: userEndpoints.login.method,
      data: request,
    });
  },
  async getTOTPSetupInfo(headers: { [key: string]: string }) {
    const handler = new BaseApiHandler().setRetry(3).setHeaders(headers);
    return await handler.send<TOTPSetupInfo>({
      url: userEndpoints.getTOTPSetupInfo.url,
      method: userEndpoints.getTOTPSetupInfo.method,
    });
  },
};
