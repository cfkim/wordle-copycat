"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const found = [""];
const colors = ["bg-yellow-300", "bg-red-300", "bg-teal-300", "bg-purple-300"];

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
}: {
  categoryName: string;
  words: string;
}) {
  if (categoryName != "") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1.6,
          scale: { type: "spring", visualDuration: 0.4, bounce: 0.3 },
        }}
        className="flex w-208 h-50 rounded-lg bg-neutral-600 text-white justify-center"
      >
        <div className="content-center">
          <div className="flex flex-col items-center">
            <div className="pb-6">{categoryName}</div>
            <div>{words}</div>
          </div>
        </div>
      </motion.div>
    );
  }
}

export function ShuffleButton({ shuffle }: { shuffle: () => void }) {
  return (
    <div className="flex justify-center">
      <button
        onClick={shuffle}
        className="w-32 bg-transparent enabled:outline-black enabled:text-black text-black font-bold py-2 px-4 rounded-full outline-[1.5] disabled:outline-gray-300 disabled:text-gray-300"
      >
        Shuffle
      </button>
    </div>
  );
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
      <motion.button
        className={
          "w-32 bg-transparent enabled:bg-black enabled: text-white text-black font-bold py-2 px-4 rounded-full outline-[1.5] disabled:outline-gray-300 disabled:text-gray-300"
        }
        disabled={selected.length != 5}
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
      key={word}
      animate={wrong && isClicked ? { x: [-10, 10, -5, 5, 0] } : ""}
      transition={{
        duration: 0.7,
      }}
      onAnimationComplete={resetWrong}
      layout
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
      <ul style={container}>
        {squares.map((word) => (
          <motion.li key={word} layout transition={spring}>
            <Tile
              word={word}
              onClick={() => handleClick(word)}
              isClicked={selected.includes(word)}
              solved={solved.includes(word)}
              numSolved={numSolved}
              mistakesLeft={mistakesLeft}
              wrong={wrong}
              resetWrong={resetWrong}
            />
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

const spring = {
  type: "spring",
  damping: 20,
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
