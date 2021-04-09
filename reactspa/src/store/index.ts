import { compose, createStore } from "redux";
import { initAppState, reducers } from "store/config";

const enhancers = [];
const windowIfDefined = typeof window === "undefined" ? null : (window as any);
if (windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__) {
  enhancers.push(windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__());
}
export const store = createStore(reducers, initAppState, compose(...enhancers));
