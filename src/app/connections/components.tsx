"use client";

import { useState } from "react";

export const found = [""];
const colors = ["bg-yellow-300", "bg-red-300", "bg-teal-300", "bg-purple-300"];

export function AnswerTile({ categoryName }: { categoryName: string }) {
  return (
    <div className="w-210 h-50 rounded-lg bg-neutral-600 text-white">
      {categoryName}
    </div>
  );
}
export function CheckButton({
  selected,
  onClick,
}: {
  selected: string[];
  onClick: () => void;
}) {
  return (
    <div className="flex justify-center">
      <button
        className="w-32 bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
        onClick={onClick}
      >
        Submit
      </button>
    </div>
  );
}

export function Tile({
  word,
  onClick,
  isClicked,
  solved,
  numSolved,
}: {
  word: string;
  onClick: () => void;
  isClicked: boolean;
  solved: boolean;
  numSolved: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-50 h-50 rounded-lg ${
        isClicked && !solved
          ? "bg-neutral-600 text-white"
          : "bg-neutral-200 text-black"
      } ${solved ? "cursor-not-allowed opacity-50" : ""} p-4`}
      disabled={solved}
    >
      <p>{word}</p>
    </button>
  );
}

export function Board({
  squares,
  selected,
  onClick,
  solved,
  numSolved,
}: {
  squares: string[];
  selected: string[];
  onClick: (word: string) => void;
  reset: () => void;
  solved: string[];
  numSolved: number;
}) {
  function handleClick(word: string) {
    onClick(word);
  }

  return (
    <div className="h-full flex justify-center content-center">
      <table className="w-210 h-210 table-fixed">
        <tbody>
          <tr>
            <td>
              <Tile
                word={squares[0]}
                onClick={() => handleClick(squares[0])}
                isClicked={selected.includes(squares[0])}
                solved={solved.includes(squares[0])}
                numSolved={numSolved}
              />
            </td>
            <td>
              <Tile
                word={squares[1]}
                onClick={() => handleClick(squares[1])}
                isClicked={selected.includes(squares[1])}
                solved={solved.includes(squares[1])}
                numSolved={numSolved}
              />
            </td>
            <td>
              <Tile
                word={squares[2]}
                onClick={() => handleClick(squares[2])}
                isClicked={selected.includes(squares[2])}
                solved={solved.includes(squares[2])}
                numSolved={numSolved}
              />
            </td>
            <td>
              <Tile
                word={squares[3]}
                onClick={() => handleClick(squares[3])}
                isClicked={selected.includes(squares[3])}
                solved={solved.includes(squares[3])}
                numSolved={numSolved}
              />
            </td>
          </tr>
          <tr>
            <td>
              <Tile
                word={squares[4]}
                onClick={() => handleClick(squares[4])}
                isClicked={selected.includes(squares[4])}
                solved={solved.includes(squares[4])}
                numSolved={numSolved}
              />
            </td>
            <td>
              <Tile
                word={squares[5]}
                onClick={() => handleClick(squares[5])}
                isClicked={selected.includes(squares[5])}
                solved={solved.includes(squares[5])}
                numSolved={numSolved}
              />
            </td>
            <td>
              <Tile
                word={squares[6]}
                onClick={() => handleClick(squares[6])}
                isClicked={selected.includes(squares[6])}
                solved={solved.includes(squares[6])}
                numSolved={numSolved}
              />
            </td>
            <td>
              <Tile
                word={squares[7]}
                onClick={() => handleClick(squares[7])}
                isClicked={selected.includes(squares[7])}
                solved={solved.includes(squares[7])}
                numSolved={numSolved}
              />
            </td>
          </tr>
          <tr>
            <td>
              <Tile
                word={squares[8]}
                onClick={() => handleClick(squares[8])}
                isClicked={selected.includes(squares[8])}
                solved={solved.includes(squares[8])}
                numSolved={numSolved}
              />
            </td>
            <td>
              <Tile
                word={squares[9]}
                onClick={() => handleClick(squares[9])}
                isClicked={selected.includes(squares[9])}
                solved={solved.includes(squares[9])}
                numSolved={numSolved}
              />
            </td>
            <td>
              <Tile
                word={squares[10]}
                onClick={() => handleClick(squares[10])}
                isClicked={selected.includes(squares[10])}
                solved={solved.includes(squares[10])}
                numSolved={numSolved}
              />
            </td>
            <td>
              <Tile
                word={squares[11]}
                onClick={() => handleClick(squares[11])}
                isClicked={selected.includes(squares[11])}
                solved={solved.includes(squares[11])}
                numSolved={numSolved}
              />
            </td>
          </tr>
          <tr>
            <td>
              <Tile
                word={squares[12]}
                onClick={() => handleClick(squares[12])}
                isClicked={selected.includes(squares[12])}
                solved={solved.includes(squares[12])}
                numSolved={numSolved}
              />
            </td>
            <td>
              <Tile
                word={squares[13]}
                onClick={() => handleClick(squares[13])}
                isClicked={selected.includes(squares[13])}
                solved={solved.includes(squares[13])}
                numSolved={numSolved}
              />
            </td>
            <td>
              <Tile
                word={squares[14]}
                onClick={() => handleClick(squares[14])}
                isClicked={selected.includes(squares[14])}
                solved={solved.includes(squares[14])}
                numSolved={numSolved}
              />
            </td>
            <td>
              <Tile
                word={squares[15]}
                onClick={() => handleClick(squares[15])}
                isClicked={selected.includes(squares[15])}
                solved={solved.includes(squares[15])}
                numSolved={numSolved}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
