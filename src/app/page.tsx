"use client";
import Image from "next/image";
import Link from "next/link";
import { Squares2X2Icon } from "@heroicons/react/24/solid";
import { easeIn, motion } from "framer-motion";
import Connections from "@/app/connections/page";

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

export default function Home() {
  return (
    <Connections />
    // <motion.div
    //   className="flex flex-col min-h-screen justify-center items-center justify-items-center bg-pink-300"
    //   variants={variants}
    //   initial="hidden"
    //   animate="visible"
    // >
    //   <motion.div variants={child} className="flex justify-center p-4">
    //     <Squares2X2Icon className="w-24" />
    //   </motion.div>

    //   <motion.h1 variants={child} className="text-6xl font-bold p-4">
    //     Connections
    //   </motion.h1>
    //   <motion.h2 variants={child} className="text-xl p-4">
    //     Essentially Reverse Code Names
    //   </motion.h2>
    //   <motion.div variants={child} className="p-3">
    //     <Link
    //       href="/connections"
    //       className="flex bg-black text-white rounded-full w-50 h-15 text-center items-center justify-center text-xl font-bold"
    //     >
    //       <span>Play</span>
    //     </Link>
    //   </motion.div>
    // </motion.div>
  );
}
