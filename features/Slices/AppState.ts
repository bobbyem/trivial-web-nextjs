import { createSlice } from "@reduxjs/toolkit";

interface AppState {
  gameRunning: boolean;
}

const initialState: AppState = {
  gameRunning: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setGameRunning(state) {
      if (!state.gameRunning) {
        state.gameRunning = true;
      }
    },
    setGameStopped(state) {
      if (state.gameRunning) {
        state.gameRunning = false;
      }
    },
  },
});
export const { setGameRunning, setGameStopped } = appSlice.actions;
export default appSlice.reducer;
