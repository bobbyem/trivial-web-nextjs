import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import questionReducer from "./Slices/QuestionSlice";
import playerReducer from "./Slices/PlayerSlice";
import appReducer from "./Slices/AppState";
import { createWrapper } from "next-redux-wrapper";
import PlayerSlice from "./Slices/PlayerSlice";
const reducers = combineReducers({
  questionReducer,
  playerReducer,
  appReducer,
});
const makeStore = () =>
  configureStore({
    reducer: {
      [PlayerSlice.name]: PlayerSlice.reducer,
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export type RootState = ReturnType<typeof makeStore.getState>;
export const wrapper = createWrapper<AppStore>(makeStore);
