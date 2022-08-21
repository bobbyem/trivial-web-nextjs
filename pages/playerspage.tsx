import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Meta from "../components/Meta";
import PlayerItem from "../components/PlayerItem";
import { addPlayer } from "../features/Slices/PlayerSlice";
import { RootState } from "../features/store";

function playerspage() {
  const { players } = useSelector((state: RootState) => state.playerReducer);
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleAdd = (): void => {
    if (!name) {
      return alert("Name can't be blank");
    }
    const player = {
      name,
      completed: [],
    };
    //Add to state
    dispatch(addPlayer(player));
    //Clear input
    setName("");
  };

  const handlePlay = (): void => {
    if (players.length === 0) {
      return alert("Can't play with zero players");
    }
    window.location.href = "/gamepage";
  };

  return (
    <div className="page align-items-center justify-content-between">
      <Meta />
      <h2>Players</h2>
      <ul className="scroll w-300 list-style-none b-1 flex-column p-1 h-400 b-round">
        {players
          ? players.map((player, index) => (
              <PlayerItem key={index} player={player} index={index} />
            ))
          : null}
      </ul>
      <div className="flex-column">
        <label htmlFor="input">Enter Name</label>
        <input
          name="input"
          type="text"
          className="w-300 text-l b-round"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <button className="m-top-1 p-1 w-300 html" onClick={handleAdd}>
          Add player
        </button>
        <button
          className="m-top-1 m-bottom-1 p-1 w-300 bg-acc1"
          onClick={handlePlay}
          disabled={players.length === 0 ? true : false}
        >
          Play Game
        </button>
      </div>
    </div>
  );
}

export default playerspage;
