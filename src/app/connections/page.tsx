"use client";
import { Board, CheckButton } from "@/app/connections/components";
import { useState } from "react";
export default function Connections() {
  const squares = [
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
  ];

  function onClick(word: string) {
    selected.push(word);
    setSelected(selected);
    //console.log(selected);
  }
  const [selected, setSelected] = useState([""]);
  return (
    <div className="flex justify-center flex-col">
      <Board squares={squares} selected={selected} onClick={onClick} />
      <CheckButton selected={selected} />
    </div>
  );
}
