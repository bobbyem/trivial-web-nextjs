import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { Category } from "../../Utils/Interfaces";

export interface Player {
  name: String;
  completed: Array<Category>;
}

export interface PlayerState {
  players: Array<Player>;
  currentPlayer: number;
}

const initialState: PlayerState = {
  players: [
    {
      name: "Bobby",
      completed: [Category.html],
    },
    {
      name: "Billy",
      completed: [Category.history],
    },
  ],
  currentPlayer: 0,
};

function calcNextPlayer(arr: Array<Player>, num: number): number {
  if (num >= arr.length) {
    return 0;
  }
  const result = arr.length + 1;
  return result;
}

const playerSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    addPlayer(state, action: PayloadAction<Player>) {
      const player: Player = action.payload;
      state.players.push(player);
    },
    deletePlayer(state, action: PayloadAction<number>) {
      const newState = { ...state };
      let newPlayers = [...state.players];
      newPlayers.splice(action.payload, 1);
      newState.players = newPlayers;
      return newState;
    },
    addScore(state, action: PayloadAction<Category>) {
      const newArr = [...state.players];
      const index = state.currentPlayer;
      const player = newArr[index];
      //Check if player has already completed category
      if (player.completed.includes(action.payload)) {
        return state;
      }
      newArr[index].completed.push(action.payload);
      newArr[index].completed.sort();
      state.players = newArr;
    },
    advanceGame(state) {
      // let num = calcNextPlayer(state.players, state.currentPlayer);
      // const newState = { ...state };
      // newState.currentPlayer = num;
      // state = newState;
      state.currentPlayer =
        state.currentPlayer >= state.players.length - 1
          ? 0
          : state.currentPlayer + 1;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.players,
      };
    },
  },
});

export const { addPlayer, updatePlayer, deletePlayer, addScore, advanceGame } =
  playerSlice.actions;
export default playerSlice.reducer;
