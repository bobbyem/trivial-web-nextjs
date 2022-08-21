import React from "react";
import { useDispatch } from "react-redux";
import { deletePlayer } from "../features/Slices/PlayerSlice";

type props = {
  index: number;
  player?: {
    name: String;
    completed: number[];
  };
};

function PlayerItem({ player, index }: props) {
  const dispatch = useDispatch();

  const handleDelete = (): void => {
    if (player && index !== undefined) {
      dispatch(deletePlayer(index));
    }
  };

  return (
    <>
      <li className="flex-row w-full justify-content-between">
        <p>
          {index + 1}. {player?.name}
        </p>
        <button className="css p-1" onClick={handleDelete}>
          Delete
        </button>
      </li>
      <hr className="w-full" />
    </>
  );
}

export default PlayerItem;
