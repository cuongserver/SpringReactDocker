import { Method } from "axios";

export const userEndpoints = {
  login: {
    method: "POST" as Method,
    url: "user/authenticate",
  },
  getTOTPSetupInfo: {
    method: "GET" as Method,
    url: "user/otp-setup",
  },
  postTOTPSetup: {
    method: "POST" as Method,
    url: "user/otp-setup",
  },
  loginWithOtp: {
    method: "POST" as Method,
    url: "user/authenticate-by-otp",
  },
};
