import { IdentityMutation, IdentityState } from "store/models/identity";
import { Reducer } from "redux";

export const initIdentity: IdentityState = {
  jwt: "",
  displayName: "",
  isLoggedIn: false,
};

export const IdentityReducers: Reducer<IdentityState, IdentityMutation> = (
  state,
  mutation
) => {
  if (state === undefined) return { ...initIdentity };
  switch (mutation.type) {
    case "IDENTITY_SET_STATE":
      return { ...state, ...mutation.payload };
    default:
      return state;
  }
};
