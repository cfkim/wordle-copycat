"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { div } from "framer-motion/client";

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
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1.6,
          scale: { type: "spring", visualDuration: 0.4, bounce: 0.3 },
        }}
        className="flex w-208 h-50 rounded-lg bg-neutral-600 text-white justify-center "
      >
        <p className="content-center">{categoryName}</p>
      </motion.div>
    );
  }
}

export function ShuffleButton({ shuffle }: { shuffle: () => void }) {
  return (
    <div className="flex justify-center">
      <button
        onClick={shuffle}
        className="w-32 bg-sky-500 enabled:hover:bg-sky-700 text-white font-bold py-2 px-4 rounded disabled:opacity-25"
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
          "w-32 bg-sky-500 enabled:hover:bg-sky-700 text-white font-bold py-2 px-4 rounded disabled:opacity-25"
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
      animate={wrong && isClicked ? { x: [-30, 30, -10, 10, 0] } : ""}
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
          <motion.li key={word} layout transition={spring} style={{}}>
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
