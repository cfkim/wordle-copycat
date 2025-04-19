"use client";

import { useState } from "react";

export function Tile({ word, onClick }: { word: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-50 h-50 rounded-lg bg-neutral-200 p-4"
    >
      <p>{word}</p>
    </button>
  );
}

function isGroup(group: string[]) {
  if (
    JSON.stringify(group.sort()) == JSON.stringify(["hi", "bye", "hi", "bye"])
  ) {
  }
}
export function board(squares: string[]) {
  const [group, setGroup] = useState();
  const [clicks, setClicks] = useState(1);

  function handleClick(i: number) {
    if (clicks <= 4) {
      const newGroup = [...group.slice(0, clicks - 1), squares[i]];
      console.log(newGroup);
      setGroup(newGroup);
      setClicks(clicks + 1);
      console.log(group);
    } else {
      console.log("oops");
    }
  }

  return (
    <div className="h-full flex justify-center content-center">
      <table className="w-210 h-210 table-fixed">
        <tbody>
          <tr>
            <td>
              <Tile word={squares[0]} onClick={() => handleClick(0)} />
            </td>
            <td>
              <Tile word={squares[1]} onClick={() => handleClick(1)} />
            </td>
            <td>
              <Tile word={squares[2]} onClick={() => handleClick(2)} />{" "}
            </td>
            <td>
              <Tile word={squares[3]} onClick={() => handleClick(3)} />{" "}
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
