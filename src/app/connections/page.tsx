"use client";
import {
  Board,
  CheckButton,
  AnswerTile,
  Lives,
  ShuffleButton,
} from "@/app/connections/components";
import { Squares2X2Icon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import { div } from "framer-motion/client";
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
  const [found, setFound] = useState<string[]>([]);
  const [clicks, setClicks] = useState(1);
  const [solved, setSolved] = useState([""]);
  const [numGroups, setNumGroups] = useState(0);
  const [mistakesLeft, setMistakesLeft] = useState(4);
  const [guessed, setGuessed] = useState([""]);
  const [wrong, setWrong] = useState(false);
  const [message, setMessage] = useState("");
  const [orderSelected, setOrderSelected] = useState<number[]>([]);
  const [reveal, setReveal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [canSubmit, setCanSubmit] = useState(true);
  const [canShuffle, setCanShuffle] = useState(true);
  const [isChecking, setIsChecking] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  // const [time, setTime] = useState(0);
  const [popkey, setPopkey] = useState(0);

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
    if (!canSubmit) {
      setCanShuffle(true);
    }
  }

  async function endGame() {
    setSelected([""]);
    setWrong(false);
    let now = new Date();
    setPopkey(now.getTime());
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

  async function resetIsChecking() {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsChecking(false);
  }

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
    }
  }, [reveal]);

  async function shuffle() {
    setCanSubmit(false);
    setSquares(shuffleCalc(squares));
    // make so can't submit during shuffle
    await new Promise((resolve) => setTimeout(resolve, 500));

    setCanSubmit(true);
  }

  function shuffleCalc([...array]: string[]) {
    return [...array].sort(() => Math.random() - 0.5);
  }
  const answers = found.map((answer, index) => {
    return (
      <li className="flex justify-center pb-2.5 items-center" key={index}>
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
    setIsChecking(true);
    const stringversion = JSON.stringify(selected.sort());
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
              let now = new Date();
              setPopkey(now.getTime());

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
        let now = new Date();
        setPopkey(now.getTime());
        setIsChecking(false);

        setMessage("Already guessed!");
      }
    }
  }

  const variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        ease: "easeIn",
        duration: 1,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  function startPlay() {
    setShowBanner(false);
  }

  return (
    <div className="flex justify-center min-h-screen items-center">
      {/* play banner */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            id={"banner"}
            className="flex absolute w-full flex-col h-full justify-center items-center justify-items-center bg-pink-300 z-50"
            variants={variants}
            initial="hidden"
            animate="visible"
            exit={{
              opacity: 0,
              transition: { duration: 0.1, ease: "easeOut" },
            }}
          >
            <motion.div variants={child} className="flex justify-center p-4">
              <Squares2X2Icon className="w-24 text-black" />
            </motion.div>

            <motion.h1
              variants={child}
              className="text-6xl font-bold p-4 dark:text-black"
            >
              Connections
            </motion.h1>
            <motion.h2
              variants={child}
              className="text-2xl p-4 dark:text-black"
            >
              Essentially Reverse Code Names
            </motion.h2>
            <motion.div variants={child} className="p-3">
              <button
                onClick={startPlay}
                //href="/connections"
                className="flex bg-black text-white rounded-full w-50 h-15 text-center items-center justify-center text-xl font-bold"
              >
                Play
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {popkey && (
          <motion.div
            key={popkey}
            className="z-100 top-30 w-45 h-15 font-normal bg-black rounded flex justify-center items-center absolute bg-black dark:bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [1, 1, 1, 0.8, 0.7, 0] }}
            transition={{ duration: 3, times: [0, 0.1, 0.5, 0.7, 0.8, 1] }}
          >
            <p className="font-bold text-white dark:text-black text-lg text-center">
              {message}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.main className="flex h-full text-2xl font-bold justify-center items-center">
        <div className="flex flex-col justify-center content-center">
          <div>
            <div className="flex flex-col list-none justify-center">
              {answers}
            </div>
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
              resetIsChecking={resetIsChecking}
              isChecking={isChecking}
            />
          </div>
          <div className={`${numGroups == 4 ? "pt-4.5" : "pt-7"}`}>
            <Lives count={mistakesLeft} />
            <div className="flex justify-center">
              <div className="flex flex-row justify-evenly w-1/3">
                <ShuffleButton
                  shuffle={shuffle}
                  reveal={reveal}
                  isChecking={isChecking}
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
        </div>
      </motion.main>
    </div>
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
