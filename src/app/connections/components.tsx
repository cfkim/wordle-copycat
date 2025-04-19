"use client";

import { useState } from "react";

export function CheckButton({ selected }: { selected: string[] }) {
  function handleClick() {
    isGroup(selected);
  }
  return (
    <div className="flex justify-center">
      <button
        className="w-32 bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleClick}
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

// holds the answer keys
const solution = new Map<string, string>();
const group1 = ["", "glimmer", "lantern", "pebble", "whistle"];
solution.set(JSON.stringify(group1), "test");

// checks if its a valid solution
function isGroup(group: string[]) {
  console.log();
  console.log(solution);
  console.log(group.sort());

  if (solution.has(JSON.stringify(group.sort()))) {
    console.log("solution!");
  } else {
    console.log("not yet");
  }
}

export function Board({
  squares,
  selected,
  onClick,
}: {
  squares: string[];
  selected: string[];
  onClick: (word: string) => void;
}) {
  const [clicks, setClicks] = useState(1);

  function handleClick(word: string) {
    if (clicks <= 4) {
      onClick(word);
      setClicks(clicks + 1);
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
          {/* <tr>
            <td>{tile(squares[4], handleClick(4))}</td>
            <td>{tile(squares[5], handleClick(5))}</td>
            <td>{tile(squares[6], handleClick(6))} </td>
            <td>{tile(squares[7], handleClick(7))} </td>
          </tr>
          <tr>
            <td>{tile(squares[8], handleClick(8))}</td>
            <td>{tile(squares[9], handleClick(9))}</td>
            <td>{tile(squares[10], handleClick(10))} </td>
            <td>{tile(squares[11], handleClick(11))} </td>
          </tr>
          <tr>
            <td>{tile(squares[12], handleClick(12))}</td>
            <td>{tile(squares[13], handleClick(13))}</td>
            <td>{tile(squares[14], handleClick(14))} </td>
            <td>{tile(squares[15], handleClick(15))} </td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
}
