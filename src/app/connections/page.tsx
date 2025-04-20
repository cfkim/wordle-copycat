"use client";
import { Board, CheckButton, AnswerTile } from "@/app/connections/components";
import { useState } from "react";

export default function Connections() {
  const [squares, setSquares] = useState([
    "lantern",
    "whistle",
    "pebble",
    "glimmer",
    "canvas",
    "flicker",
    "drizzle",
    "ember",
    "meadow",
    "ripple",
    "velvet",
    "hollow",
    "cobble",
    "quiver",
    "murmur",
    "thistle",
  ]);
  const [selected, setSelected] = useState([""]);
  const [found, setFound] = useState([""]);
  const [clicks, setClicks] = useState(1);
  const [solved, setSolved] = useState([""]);
  const [numGroups, setNumGroups] = useState(0);
  const [mistakesLeft, setMistakesLeft] = useState(4);

  function onClick(word: string) {
    if (selected.includes(word)) {
      setSelected(selected.filter((item) => item !== word));
      console.log(selected);
    } else {
      if (selected.length < 5) {
        selected.push(word);
        setSelected(selected);
        setClicks(clicks + 1);
      }
    }
  }

  function reset() {
    setSelected([""]);
    setClicks(1);
  }

  function endGame() {
    window.alert("Game ended!");
  }

  const answers = found.map((answer, index) => {
    return (
      <li key={index}>
        <AnswerTile categoryName={answer} />
      </li>
    );
  });

  // checks if its a valid solution
  function isGroup() {
    const stringversion = JSON.stringify(selected.sort());
    if (solution.has(stringversion)) {
      found.push(solution.get(stringversion) || "");
      setFound(found);
      reset();
      console.log(selected);
      for (const word of selected) {
        solved.push(word);
        setSolved(solved);
      }
      setNumGroups(numGroups + 1);
    } else {
      if (mistakesLeft > 1) {
        setMistakesLeft(mistakesLeft - 1);
      } else {
        setMistakesLeft(mistakesLeft - 1);
        endGame();
      }
    }
  }

  return (
    <main className="flex min-h-screen px-50 py-50 text-xl">
      <div className="flex flex-row ">
        <div className="flex justify-center flex-col">
          <Board
            squares={squares}
            selected={selected}
            onClick={onClick}
            reset={reset}
            solved={solved}
            numSolved={numGroups}
          />
          <CheckButton selected={selected} onClick={isGroup} />
        </div>
        <div className="flex flex-col list-none">{answers}</div>
      </div>
    </main>
  );
}

// holds the answer keys
const solution = new Map<string, string>();
const group1 = ["", "glimmer", "lantern", "pebble", "whistle"];
const group2 = ["", "canvas", "drizzle", "ember", "flicker"];
const group3 = ["", "hollow", "meadow", "ripple", "velvet"];
const group4 = ["", "cobble", "murmur", "quiver", "thistle"];
solution.set(JSON.stringify(group1), "test1");
solution.set(JSON.stringify(group2), "test2");
solution.set(JSON.stringify(group3), "test3");
solution.set(JSON.stringify(group4), "test4");
