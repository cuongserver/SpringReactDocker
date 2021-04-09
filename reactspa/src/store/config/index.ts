import { AppState } from "store/models";
import { IdentityReducers, initIdentity } from "store/config/identity";
import { combineReducers } from "redux";

export const initAppState: AppState = {
  identity: initIdentity,
};

export const reducers = combineReducers({
  identity: IdentityReducers,
});
