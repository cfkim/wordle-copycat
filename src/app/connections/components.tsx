"use client";

import { useRef, useState } from "react";
import { AnimatePresence, easeIn, motion } from "framer-motion";

export const found = [""];
const colors = ["bg-yellow-100", "bg-red-100", "bg-teal-100", "bg-purple-100"];

export function Lives({ count }: { count: number }) {
  return (
    <motion.div className="flex justify-center py-7" animate={{}}>
      <div className="flex flex-row w-2/3 justify-center">
        Mistakes Remaining:
        <div className="flex justify-left w-1/5 px-5">
          <AnimatePresence>
            {Array.from({ length: count }, (_, index) => (
              <motion.div
                className="flex px-1 items-center"
                key={index}
                transition={{
                  transform: { duration: 0.2 },
                  opacity: { duration: 0.2 },
                }}
                initial={{ transform: "scale(0.8)", opacity: 0 }}
                animate={{ transform: "scale(1)", opacity: 1 }}
                exit={{ transform: "scale(0.8)", opacity: 0 }}
              >
                <div className="w-6 h-6 bg-neutral-600 rounded-full"></div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
export function AnswerTile({
  categoryName,
  words,
  numGroups,
}: {
  categoryName: string;
  words: string[];
  numGroups: number;
}) {
  const countRef = useRef(numGroups);
  let color = "";
  if (countRef.current != 0) {
    color = colors[countRef.current - 1];
  }

  if (categoryName != "") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1.6,
          scale: { type: "spring", visualDuration: 0.4, bounce: 0.3 },
        }}
        className={`flex w-208 h-30 rounded-lg ${color} text-black justify-center`}
      >
        <div className="content-center text-2xl">
          <div className="flex flex-col items-center">
            <div className="pb-3">{categoryName}</div>
            <div className="font-normal">
              {JSON.stringify(words.slice(1))
                .replace(/\[|\]|"|/g, "")
                .replace(/, ?/g, ", ")}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
}

export function ShuffleButton({
  shuffle,
  reveal,
  isChecking,
}: {
  shuffle: () => void;
  reveal: boolean;
  isChecking: boolean;
}) {
  return (
    <div className="flex justify-center">
      <button
        disabled={reveal || isChecking}
        onClick={shuffle}
        className="w-32 bg-transparent dark:enabled:outline-white dark:enabled:text-white enabled:outline-black enabled:text-black text-white font-bold py-2 px-4 rounded-full outline-[1.5] dark:disabled:outline-gray-600 dark:disabled:text-gray-600 disabled:outline-gray-300 disabled:text-gray-300"
      >
        Shuffle
      </button>
    </div>
  );
}
export function CheckButton({
  selected,
  onClick,
  reveal,
  canSubmit,
}: {
  selected: string[];
  onClick: () => void;
  reveal: boolean;
  canSubmit: boolean;
}) {
  return (
    <div className="flex justify-center">
      <motion.button
        className={
          "w-32 bg-transparent enabled:bg-black enabled: text-white text-black font-bold py-2 px-4 rounded-full outline-[1.5] dark:disabled:outline-gray-600 dark:disabled:text-gray-600 disabled:outline-gray-300 disabled:text-gray-300"
        }
        disabled={selected.length != 5 || reveal || !canSubmit}
        onClick={onClick}
      >
        Submit
      </motion.button>
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
  reveal,
  isChecking,
}: {
  word: string;
  onClick: () => void;
  isClicked: boolean;
  solved: boolean;
  numSolved: number;
  mistakesLeft: number;
  wrong: boolean;
  resetWrong: () => void;
  reveal: boolean;
  isChecking: boolean;
}) {
  return (
    <motion.div
      key={word}
      animate={{
        ...(wrong && isClicked ? { x: [-10, 10, -5, 5, 0] } : ""),
      }}
      transition={{
        duration: 0.7,
      }}
      onAnimationComplete={resetWrong}
      layout
      variants={{
        enter: {
          ...(isClicked
            ? { y: [0, -35, 0], transition: { duration: 0.4 } }
            : ""),
        },
      }}
    >
      <button
        onClick={onClick}
        className={`transition duration 2100 ease-in-out w-50 h-30 rounded-lg ${
          isClicked && !solved && !reveal
            ? "bg-neutral-600 text-white"
            : "bg-neutral-200 text-black"
        } ${isClicked && wrong ? "opacity-80" : ""} ${
          solved
            ? "cursor-not-allowed opacity-100 bg-neutral-600 text-white"
            : ""
        } p-4`}
        disabled={solved || isChecking}
      >
        <p>{word}</p>
      </button>
    </motion.div>
  );
}

// For staggering submitted tiles
const variants = {
  enter: {
    transition: { staggerChildren: 0.02, delayChildren: 0.1 },
  },
  exit: {
    opacity: 1,
    transition: { staggerChildren: 0.02, staggerDirection: -1 },
  },
};

export function Board({
  squares,
  selected,
  onClick,
  solved,
  numSolved,
  mistakesLeft,
  wrong,
  resetWrong,
  reveal,
  submitted,
  resetIsChecking,
  isChecking,
}: {
  squares: string[];
  selected: string[];
  onClick: (word: string, index: number) => void;
  reset: () => void;
  solved: string[];
  numSolved: number;
  mistakesLeft: number;
  wrong: boolean;
  resetWrong: () => void;
  reveal: boolean;
  submitted: boolean;
  resetIsChecking: () => void;
  isChecking: boolean;
}) {
  function handleClick(word: string, index: number) {
    onClick(word, index);
  }

  return (
    <div className="h-full flex justify-center content-center text-2xl">
      <motion.ul
        style={container}
        variants={variants}
        initial="exit"
        animate={`${submitted ? "enter" : ""}`} // animate tiles on a guess
        exit="exit"
        onAnimationComplete={resetIsChecking}
      >
        {squares.map((word, index) => (
          <motion.li key={word} layout transition={spring}>
            <Tile
              word={word}
              onClick={() => handleClick(word, index)}
              isClicked={selected.includes(word)}
              solved={solved.includes(word)}
              numSolved={numSolved}
              mistakesLeft={mistakesLeft}
              wrong={wrong}
              resetWrong={resetWrong}
              reveal={reveal}
              isChecking={isChecking}
            />
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}

const spring = {
  type: "spring",
  damping: 50,
  stiffness: 300,
};

const container: React.CSSProperties = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  position: "relative",
  display: "flex",
  flexWrap: "wrap",
  gap: 10,
  width: 1000,
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
};
