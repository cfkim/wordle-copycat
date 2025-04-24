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
    console.log(color);
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
        className={`flex w-208 h-50 rounded-lg ${color} text-black justify-center`}
      >
        <div className="content-center text-2xl">
          <div className="flex flex-col items-center">
            <div className="pb-6">{categoryName}</div>
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
}: {
  shuffle: () => void;
  reveal: boolean;
}) {
  return (
    <div className="flex justify-center">
      <button
        disabled={reveal}
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
  reveal,
}: {
  selected: string[];
  onClick: () => void;
  reveal: boolean;
}) {
  return (
    <div className="flex justify-center">
      <motion.button
        className={
          "w-32 bg-transparent enabled:bg-black enabled: text-white text-black font-bold py-2 px-4 rounded-full outline-[1.5] disabled:outline-gray-300 disabled:text-gray-300"
        }
        disabled={selected.length != 5 || reveal}
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
}) {
  return (
    <motion.div
      key={word}
      animate={{
        ...(wrong && isClicked ? { x: [-10, 10, -5, 5, 0] } : ""),
        ...(reveal && solved ? { x: [-10, 10, -5, 5, 0] } : ""),
      }}
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
  reveal,
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
}) {
  function handleClick(word: string, index: number) {
    onClick(word, index);
  }

  return (
    <div className="h-full flex justify-center content-center text-2xl">
      <ul style={container}>
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
