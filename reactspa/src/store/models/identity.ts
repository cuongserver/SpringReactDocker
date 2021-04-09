import { Action } from "redux";

export type IdentityAction = "IDENTITY_SET_STATE";
export interface IdentityState {
  jwt: string;
  displayName: string;
  isLoggedIn: boolean;
}
export interface IdentityMutation extends Action<IdentityAction> {
  type: IdentityAction;
  payload: IdentityState;
}
