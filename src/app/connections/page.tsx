"use client";
import {
  Board,
  CheckButton,
  AnswerTile,
  Lives,
  ShuffleButton,
} from "@/app/connections/components";
import { AnimatePresence, motion } from "framer-motion";
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
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");

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
    setIsVisible(true);
    setMessage("Next Time!");
  }

  function shuffle() {
    setSquares(shuffleCalc(squares));
  }

  function shuffleCalc([...array]: string[]) {
    return [...array].sort(() => Math.random() - 0.5);
  }
  const answers = found.map((answer, index) => {
    return (
      <li className="flex justify-center pb-2 items-center" key={index}>
        <AnswerTile categoryName={answer} words={matches.get(answer) || ""} />
      </li>
    );
  });

  // checks if its a valid solution
  async function isGroup() {
    const stringversion = JSON.stringify(selected.sort());

    if (solution.has(stringversion)) {
      // move selected tiles to first four boxes
      setSquares([
        ...selected.slice(1),
        ...squares.filter((element) => !selected.includes(element)),
      ]);

      // pause
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // makes a new answer tile
      setSquares(squares.filter((element) => !selected.includes(element)));
      for (const word of selected) {
        solved.push(word);
        setSolved(solved);
      }

      setNumGroups(numGroups + 1);

      found.push(solution.get(stringversion) || "");
      setFound(found);

      reset();
    } else {
      if (!guessed.includes(stringversion)) {
        // see if one away

        // loop through solutions
        for (const [words, theme] of solution) {
          let testArray = JSON.parse(words).filter(
            (item: string) => !selected.includes(item)
          );

          if (testArray.length == 1) {
            setIsVisible(true);
            setMessage("One Away!");
            break;
          }
        }

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
        setIsVisible(true);
        setMessage("Already guessed!");
      }
    }
  }

  return (
    <main className="flex min-h-screen px-50 py-50 text-2xl font-bold justify-center">
      <AnimatePresence>
        <motion.div
          className="z-100 top-25 w-45 h-15 font-normal bg-gray-800 rounded flex justify-center items-center absolute"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: [0, 1, 1, 1, 1, 0] } : ""}
          exit={{ opacity: 0 }}
          onAnimationComplete={() => {
            setIsVisible(false);
          }}
          transition={{ duration: 3, times: [0, 0.1, 0.5, 0.7, 0.8, 1] }}
        >
          <p className="text-white text-lg text-center">{message}</p>
        </motion.div>
      </AnimatePresence>
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
        <div className="flex justify-center">
          <div className="flex flex-row justify-evenly w-1/3">
            <ShuffleButton shuffle={shuffle} />
            <CheckButton selected={selected} onClick={isGroup} />
          </div>
        </div>
      </div>
    </main>
  );
}

// holds the answer keys
const solution = new Map<string, string>();
const matches = new Map<string, string>();
const group1 = ["", "glimmer", "lantern", "pebble", "whistle"];
const group2 = ["", "canvas", "drizzle", "ember", "flicker"];
const group3 = ["", "hollow", "meadow", "ripple", "velvet"];
const group4 = ["", "cobble", "murmur", "quiver", "thistle"];
//const group5 = ["", "drizzle", "murmur", "ripple", "thistle"];
solution.set(JSON.stringify(group1), "test1");
solution.set(JSON.stringify(group2), "test2");
solution.set(JSON.stringify(group3), "test3");
solution.set(JSON.stringify(group4), "test4");
//solution.set(JSON.stringify(group5), "test5");
// to get matches
matches.set("test1", JSON.stringify(group1));
matches.set("test2", JSON.stringify(group2));
matches.set("test3", JSON.stringify(group3));
matches.set("test4", JSON.stringify(group4));
//matches.set("test5", JSON.stringify(group5));
