"use client";
import { Tile, board } from "@/app/connections/components";
export default function Connections() {
  const squares = [
    "hi",
    "bye",
    "group",
    "hi",
    "bye",
    "group",
    "hi",
    "bye",
    "group",
    "hi",
    "bye",
    "group",
    "hi",
    "bye",
    "group",
    "group",
  ];
  const combos = [["hi", "bye", "group", "hi"]];
  return board(squares);
}
