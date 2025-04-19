"use client";

import { useState } from "react";

export const found = [""];

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
}: {
  word: string;
  onClick: () => void;
  isClicked: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-50 h-50 rounded-lg ${
        isClicked ? "bg-neutral-600 text-white" : "bg-neutral-200 text-black"
      } p-4`}
    >
      <p>{word}</p>
    </button>
  );
}

export function Board({
  squares,
  selected,
  onClick,
}: {
  squares: string[];
  selected: string[];
  onClick: (word: string) => void;
  reset: () => void;
}) {
  function handleClick(word: string) {
    if (selected.length <= 4) {
      onClick(word);
    } else {
    }
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
              />
            </td>
            <td>
              <Tile
                word={squares[1]}
                onClick={() => handleClick(squares[1])}
                isClicked={selected.includes(squares[1])}
              />
            </td>
            <td>
              <Tile
                word={squares[2]}
                onClick={() => handleClick(squares[2])}
                isClicked={selected.includes(squares[2])}
              />
            </td>
            <td>
              <Tile
                word={squares[3]}
                onClick={() => handleClick(squares[3])}
                isClicked={selected.includes(squares[3])}
              />
            </td>
          </tr>
          <tr>
            <td>
              <Tile
                word={squares[4]}
                onClick={() => handleClick(squares[4])}
                isClicked={selected.includes(squares[4])}
              />
            </td>
            <td>
              <Tile
                word={squares[5]}
                onClick={() => handleClick(squares[5])}
                isClicked={selected.includes(squares[5])}
              />
            </td>
            <td>
              <Tile
                word={squares[6]}
                onClick={() => handleClick(squares[6])}
                isClicked={selected.includes(squares[6])}
              />
            </td>
            <td>
              <Tile
                word={squares[7]}
                onClick={() => handleClick(squares[7])}
                isClicked={selected.includes(squares[7])}
              />
            </td>
          </tr>
          <tr>
            <td>
              <Tile
                word={squares[8]}
                onClick={() => handleClick(squares[8])}
                isClicked={selected.includes(squares[8])}
              />
            </td>
            <td>
              <Tile
                word={squares[9]}
                onClick={() => handleClick(squares[9])}
                isClicked={selected.includes(squares[9])}
              />
            </td>
            <td>
              <Tile
                word={squares[10]}
                onClick={() => handleClick(squares[10])}
                isClicked={selected.includes(squares[10])}
              />
            </td>
            <td>
              <Tile
                word={squares[11]}
                onClick={() => handleClick(squares[11])}
                isClicked={selected.includes(squares[11])}
              />
            </td>
          </tr>
          <tr>
            <td>
              <Tile
                word={squares[12]}
                onClick={() => handleClick(squares[12])}
                isClicked={selected.includes(squares[12])}
              />
            </td>
            <td>
              <Tile
                word={squares[13]}
                onClick={() => handleClick(squares[13])}
                isClicked={selected.includes(squares[13])}
              />
            </td>
            <td>
              <Tile
                word={squares[14]}
                onClick={() => handleClick(squares[14])}
                isClicked={selected.includes(squares[14])}
              />
            </td>
            <td>
              <Tile
                word={squares[15]}
                onClick={() => handleClick(squares[15])}
                isClicked={selected.includes(squares[15])}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
