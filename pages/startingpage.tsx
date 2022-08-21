import React from "react";
import Meta from "../components/Meta";

function startingpage() {
  return (
    <div className="page align-items-center justify-content-center">
      <Meta />
      <h1>Wellcome!</h1>
      <div className="w-300">
        <p className="text-center">
          Trivial Roulette is trivia game for web developers. Think of it as a
          new "spin" on the traditional TP boardgame. All the questions
          "revolve" around the terms, technology and history of web development.
          <br />
          The questions have been submitted by generous people of the developer
          community.
          <br />
          <br />
          <span className="text-xs">
            If you would like to contribute to this project with questions,
            please follow this link:
          </span>
        </p>
      </div>
      <a
        href="https://trivialwebapi.herokuapp.com/"
        className="underline bold"
        target="_blank"
        rel="noreferrer"
      >
        Trival Roulette Portal
      </a>
      <button
        className="text-l m-top-2 p-1 bg-acc1"
        onClick={() => {
          window.location.href = "/playerspage";
        }}
      >
        Play The Game
      </button>
    </div>
  );
}

export default startingpage;
