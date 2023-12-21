"use client";
import React from "react";

type Props = {
  toggleNav: boolean;
  setToggleNav: (val: boolean) => void;
};

const Hamburger = ({ toggleNav, setToggleNav }: Props) => {
  return (
    <button
      className="w-11 h-11 flex flex-col items-center justify-center relative md:hidden ml-1"
      onClick={() => setToggleNav(!toggleNav)}
    >
      <span
        className={`bg-purple-700 h-1 w-full rounded-lg transition-all ease-in duration-300 ${
          toggleNav ? " origin-center rotate-45" : "-translate-y-4"
        }`}
      />
      <span
        className={`bg-purple-500 h-1 w-full rounded-lg transition-opacity absolute ${
          toggleNav ? "opacity-0" : "transition-all duration-400 opacity-100"
        }`}
      />
      <span
        className={`bg-purple-300 h-1 w-full rounded-lg transition-all ease-in duration-300 absolute ${
          toggleNav ? "origin-center  -rotate-45" : "translate-y-4"
        }`}
      />
    </button>
  );
};

export default Hamburger;
