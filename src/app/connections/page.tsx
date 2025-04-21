"use client";
import {
  Board,
  CheckButton,
  AnswerTile,
  Lives,
} from "@/app/connections/components";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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
  const [guessed, setGuessed] = useState([""]);
  const [wrong, setWrong] = useState(false);

  function onClick(word: string) {
    if (selected.includes(word)) {
      setSelected(selected.filter((item) => item !== word));
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

  function resetWrong() {
    setWrong(false);
  }
  function endGame() {
    window.alert("Game ended!");
  }
  function shuffle([...array]: string[]) {
    return array.sort(() => Math.random() - 0.5);
  }
  const answers = found.map((answer, index) => {
    return (
      <li className="flex justify-center pb-4" key={index}>
        <AnswerTile categoryName={answer} />
      </li>
    );
  });

  // checks if its a valid solution
  async function isGroup() {
    const stringversion = JSON.stringify(selected.sort());
    if (solution.has(stringversion)) {
      found.push(solution.get(stringversion) || "");
      setFound(found);
      reset();
      setSquares(squares.filter((item) => item !== "lantern"));
      setSquares(squares.filter((element) => !selected.includes(element)));
      for (const word of selected) {
        solved.push(word);
        setSolved(solved);
      }
      setNumGroups(numGroups + 1);
    } else {
      if (!guessed.includes(stringversion)) {
        setWrong(true);
        guessed.push(JSON.stringify(selected.sort()));
        setGuessed(guessed);
        if (mistakesLeft > 1) {
          setMistakesLeft(mistakesLeft - 1);
        } else {
          setMistakesLeft(mistakesLeft - 1);
          endGame();
        }
      } else {
        window.alert("you already guessed that");
      }
    }
  }

  return (
    <main className="flex min-h-screen px-50 py-50 text-2xl font-bold justify-center">
      <div className="flex flex-col justify-center content-center">
        <div className="flex flex-col list-none justify-center">{answers}</div>
        <Board
          squares={squares}
          selected={selected}
          onClick={onClick}
          reset={reset}
          solved={solved}
          numSolved={numGroups}
          mistakesLeft={mistakesLeft}
          wrong={wrong}
          resetWrong={resetWrong}
        />
        <Lives count={mistakesLeft} />
        <CheckButton selected={selected} onClick={isGroup} />
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
const group5 = ["", "drizzle", "murmur", "ripple", "thistle"];
solution.set(JSON.stringify(group1), "test1");
solution.set(JSON.stringify(group2), "test2");
solution.set(JSON.stringify(group3), "test3");
solution.set(JSON.stringify(group4), "test4");
solution.set(JSON.stringify(group5), "test5");
