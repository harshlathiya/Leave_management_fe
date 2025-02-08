import { configureStore, combineReducers } from "@reduxjs/toolkit";
import type { Action, ThunkAction } from "@reduxjs/toolkit";
import changeLeaveBalance from "./redux/reducers/leaveBalance";
import userReducer from "./redux/reducers/userActions";

// Combine your reducers here
const rootReducer = combineReducers({
  leaveBalance: changeLeaveBalance,
  users: userReducer,
});

// Infer the `RootState` type from the `rootReducer` itself
export type RootState = ReturnType<typeof rootReducer>;

// Configure and create the store
export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });
};

// Infer the `AppStore` type from the `makeStore` function
export type AppStore = ReturnType<typeof makeStore>;

// Infer the `AppDispatch` type from the `AppStore`
export type AppDispatch = AppStore["dispatch"];

// Define a type for the thunk action
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
