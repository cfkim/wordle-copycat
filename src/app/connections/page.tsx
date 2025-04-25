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
    "WHISTLE",
    "HOLLOW",
    "THISTLE",
    "EMBER",
    "PEBBLE",
    "VELVET",
    "MURMUR",
    "COBBLE",
    "QUIVER",
    "DRIZZLE",
    "GLIMMER",
    "RIPPLE",
    "MEADOW",
    "LANTERN",
    "CANVAS",
    "FLICKER",
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
  const [orderSelected, setOrderSelected] = useState<number[]>([]);
  const [reveal, setReveal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [canSubmit, setCanSubmit] = useState(true);
  const [canShuffle, setCanShuffle] = useState(true);

  function onClick(word: string, index: number) {
    if (selected.includes(word)) {
      setOrderSelected(orderSelected.filter((item) => item !== index));
      setSelected(selected.filter((item) => item !== word));
    } else {
      if (selected.length < 5) {
        orderSelected.push(index);
        setOrderSelected(orderSelected);
        selected.push(word);
        setSelected(selected);
        setClicks(clicks + 1);
      }
    }
  }

  function reset() {
    setSelected([""]);
    setClicks(1);
    setSubmitted(false);
  }

  function resetWrong() {
    setWrong(false);
    setSubmitted(false);
    if (!canShuffle) {
      setCanShuffle(true);
    }
  }

  async function endGame() {
    setSelected([""]);
    setWrong(false);
    setIsVisible(true);
    setMessage("Next Time!");
    setReveal(true);
  }

  useEffect(() => {
    const set = () => {
      setCanSubmit(true);
    };

    if (!canSubmit) {
      set();
    }
  }, [selected]);

  useEffect(() => {
    console.log(canShuffle);
    const set = () => {
      setCanShuffle(true);
    };

    if (!canShuffle) {
      set();
    }
  }, [submitted]);

  useEffect(() => {
    const solve = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      for (const [words, theme] of solution) {
        setSelected(JSON.parse(words));
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // move selected tiles to first four boxes
        setSquares((prevSquares) => [
          ...JSON.parse(words).slice(1),
          ...prevSquares.filter(
            (element) => !JSON.parse(words).includes(element)
          ),
        ]);

        // pause
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // makes a new answer tile

        setSquares((prevSquares) =>
          prevSquares.filter((element) => !JSON.parse(words).includes(element))
        );

        console.log(squares);

        // add to solved
        for (const word of selected) {
          solved.push(word);
          setSolved(solved);
        }

        setNumGroups((prevNumGroups) => prevNumGroups + 1);

        found.push(solution.get(words) || "");
        setFound(found);

        reset();
        // pause
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    };

    if (reveal) {
      solve();
    } else {
      console.log("not yet");
    }
  }, [reveal]);

  function shuffle() {
    setSquares(shuffleCalc(squares));
  }

  function shuffleCalc([...array]: string[]) {
    return [...array].sort(() => Math.random() - 0.5);
  }
  const answers = found.map((answer, index) => {
    return (
      <li className="flex justify-center pb-2 items-center" key={index}>
        <AnswerTile
          categoryName={answer}
          words={JSON.parse(matches.get(answer) || "[]") || ""}
          numGroups={numGroups}
        />
      </li>
    );
  });

  // checks if its a valid solution
  async function isGroup() {
    setCanSubmit(false);
    setCanShuffle(false);

    const stringversion = JSON.stringify(selected.sort());
    console.log(stringversion);
    if (solution.has(stringversion)) {
      setSubmitted(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      for (const word of selected) {
        solved.push(word);
        setSolved(solved);
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));

      // move selected tiles to first four boxes
      setSquares([
        ...selected.slice(1),
        ...squares.filter((element) => !selected.includes(element)),
      ]);

      // pause
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // makes a new answer tile
      setSquares(squares.filter((element) => !selected.includes(element)));

      setNumGroups(numGroups + 1);

      found.push(solution.get(stringversion) || "");
      setFound(found);
      solution.delete(stringversion);
      reset();
    } else {
      if (!guessed.includes(stringversion)) {
        setSubmitted(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        if (mistakesLeft > 1) {
          setMistakesLeft(mistakesLeft - 1);
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
          reveal={reveal}
          submitted={submitted}
        />
        <Lives count={mistakesLeft} />
        <div className="flex justify-center">
          <div className="flex flex-row justify-evenly w-1/3">
            <ShuffleButton
              shuffle={shuffle}
              reveal={reveal}
              canShuffle={canShuffle}
            />
            <CheckButton
              selected={selected}
              onClick={isGroup}
              reveal={reveal}
              canSubmit={canSubmit}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

// holds the answer keys
const solution = new Map<string, string>();
const matches = new Map<string, string>();
const group1 = ["", "GLIMMER", "LANTERN", "PEBBLE", "WHISTLE"];
const group2 = ["", "CANVAS", "DRIZZLE", "EMBER", "FLICKER"];
const group3 = ["", "HOLLOW", "MEADOW", "RIPPLE", "VELVET"];
const group4 = ["", "COBBLE", "MURMUR", "QUIVER", "THISTLE"];
//const group5 = ["", "DRIZZLE", "MURMUR", "RIPPLE", "THISTLE"];

solution.set(JSON.stringify(group1), "TEST1");
solution.set(JSON.stringify(group2), "TEST2");
solution.set(JSON.stringify(group3), "TEST3");
solution.set(JSON.stringify(group4), "TEST4");
//solution.set(JSON.stringify(group5), "TEST5");

// to get matches
matches.set("TEST1", JSON.stringify(group1));
matches.set("TEST2", JSON.stringify(group2));
matches.set("TEST3", JSON.stringify(group3));
matches.set("TEST4", JSON.stringify(group4));
//matches.set("TEST5", JSON.stringify(group5));

// tiles in same row
const sameRow = [
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10, 11],
  [12, 13, 14, 15],
];
