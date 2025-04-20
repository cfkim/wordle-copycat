"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export const found = [""];
const colors = ["bg-yellow-300", "bg-red-300", "bg-teal-300", "bg-purple-300"];

export function Lives({ count }: { count: number }) {
  return (
    <motion.div className="flex justify-center py-7" animate={{}}>
      <div className="flex flex-row w-2/3 justify-center">
        Mistakes Remaining:
        <div className="flex justify-left w-1/5 px-5">
          {Array.from({ length: count }, (_, index) => (
            <div className="px-1" key={index}>
              <div className="w-6 h-6 bg-neutral-600 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
export function AnswerTile({ categoryName }: { categoryName: string }) {
  if (categoryName != "") {
    return (
      <div className="flex w-210 h-50 rounded-lg bg-neutral-600 text-white justify-center ">
        <p className="content-center">{categoryName}</p>
      </div>
    );
  }
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
        className={
          "w-32 bg-sky-500 enabled:hover:bg-sky-700 text-white font-bold py-2 px-4 rounded disabled:opacity-25"
        }
        disabled={selected.length != 5}
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
  mistakesLeft,
  wrong,
  resetWrong,
}: {
  word: string;
  onClick: () => void;
  isClicked: boolean;
  solved: boolean;
  numSolved: number;
  mistakesLeft: number;
  wrong: boolean;
  resetWrong: () => void;
}) {
  return (
    <motion.div
      animate={wrong && isClicked ? { x: [-30, 30, -10, 10, 0] } : ""}
      transition={{ duration: 0.7 }}
      onAnimationComplete={resetWrong}
    >
      <button
        onClick={onClick}
        className={`w-50 h-50 rounded-lg ${
          isClicked && !solved
            ? "bg-neutral-600 text-white"
            : "bg-neutral-200 text-black"
        } ${isClicked && wrong ? "opacity-80" : ""} ${
          solved ? "cursor-not-allowed opacity-20" : ""
        } p-4`}
        disabled={solved}
      >
        <p>{word}</p>
      </button>
    </motion.div>
  );
}

export function Board({
  squares,
  selected,
  onClick,
  solved,
  numSolved,
  mistakesLeft,
  wrong,
  resetWrong,
}: {
  squares: string[];
  selected: string[];
  onClick: (word: string) => void;
  reset: () => void;
  solved: string[];
  numSolved: number;
  mistakesLeft: number;
  wrong: boolean;
  resetWrong: () => void;
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
                mistakesLeft={mistakesLeft}
                wrong={wrong}
                resetWrong={resetWrong}
              />
            </td>
            <td>
              <Tile
                word={squares[1]}
                onClick={() => handleClick(squares[1])}
                isClicked={selected.includes(squares[1])}
                solved={solved.includes(squares[1])}
                numSolved={numSolved}
                mistakesLeft={mistakesLeft}
                wrong={wrong}
                resetWrong={resetWrong}
              />
            </td>
            <td>
              <Tile
                word={squares[2]}
                onClick={() => handleClick(squares[2])}
                isClicked={selected.includes(squares[2])}
                solved={solved.includes(squares[2])}
                numSolved={numSolved}
                mistakesLeft={mistakesLeft}
                wrong={wrong}
                resetWrong={resetWrong}
              />
            </td>
            <td>
              <Tile
                word={squares[3]}
                onClick={() => handleClick(squares[3])}
                isClicked={selected.includes(squares[3])}
                solved={solved.includes(squares[3])}
                numSolved={numSolved}
                mistakesLeft={mistakesLeft}
                wrong={wrong}
                resetWrong={resetWrong}
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
                mistakesLeft={mistakesLeft}
                wrong={wrong}
                resetWrong={resetWrong}
              />
            </td>
            <td>
              <Tile
                word={squares[5]}
                onClick={() => handleClick(squares[5])}
                isClicked={selected.includes(squares[5])}
                solved={solved.includes(squares[5])}
                numSolved={numSolved}
                mistakesLeft={mistakesLeft}
                wrong={wrong}
                resetWrong={resetWrong}
              />
            </td>
            <td>
              <Tile
                word={squares[6]}
                onClick={() => handleClick(squares[6])}
                isClicked={selected.includes(squares[6])}
                solved={solved.includes(squares[6])}
                numSolved={numSolved}
                mistakesLeft={mistakesLeft}
                wrong={wrong}
                resetWrong={resetWrong}
              />
            </td>
            <td>
              <Tile
                word={squares[7]}
                onClick={() => handleClick(squares[7])}
                isClicked={selected.includes(squares[7])}
                solved={solved.includes(squares[7])}
                numSolved={numSolved}
                mistakesLeft={mistakesLeft}
                wrong={wrong}
                resetWrong={resetWrong}
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
                mistakesLeft={mistakesLeft}
                wrong={wrong}
                resetWrong={resetWrong}
              />
            </td>
            <td>
              <Tile
                word={squares[9]}
                onClick={() => handleClick(squares[9])}
                isClicked={selected.includes(squares[9])}
                solved={solved.includes(squares[9])}
                numSolved={numSolved}
                mistakesLeft={mistakesLeft}
                wrong={wrong}
                resetWrong={resetWrong}
              />
            </td>
            <td>
              <Tile
                word={squares[10]}
                onClick={() => handleClick(squares[10])}
                isClicked={selected.includes(squares[10])}
                solved={solved.includes(squares[10])}
                numSolved={numSolved}
                mistakesLeft={mistakesLeft}
                wrong={wrong}
                resetWrong={resetWrong}
              />
            </td>
            <td>
              <Tile
                word={squares[11]}
                onClick={() => handleClick(squares[11])}
                isClicked={selected.includes(squares[11])}
                solved={solved.includes(squares[11])}
                numSolved={numSolved}
                mistakesLeft={mistakesLeft}
                wrong={wrong}
                resetWrong={resetWrong}
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
                mistakesLeft={mistakesLeft}
                wrong={wrong}
                resetWrong={resetWrong}
              />
            </td>
            <td>
              <Tile
                word={squares[13]}
                onClick={() => handleClick(squares[13])}
                isClicked={selected.includes(squares[13])}
                solved={solved.includes(squares[13])}
                numSolved={numSolved}
                mistakesLeft={mistakesLeft}
                wrong={wrong}
                resetWrong={resetWrong}
              />
            </td>
            <td>
              <Tile
                word={squares[14]}
                onClick={() => handleClick(squares[14])}
                isClicked={selected.includes(squares[14])}
                solved={solved.includes(squares[14])}
                numSolved={numSolved}
                mistakesLeft={mistakesLeft}
                wrong={wrong}
                resetWrong={resetWrong}
              />
            </td>
            <td>
              <Tile
                word={squares[15]}
                onClick={() => handleClick(squares[15])}
                isClicked={selected.includes(squares[15])}
                solved={solved.includes(squares[15])}
                numSolved={numSolved}
                mistakesLeft={mistakesLeft}
                wrong={wrong}
                resetWrong={resetWrong}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
