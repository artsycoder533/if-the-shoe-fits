"use client";
import React from "react";
import { FaRegCopy } from "react-icons/fa";

type Props = {};

const ClickToCopy = (props: Props) => {

  const copyToClipboard = async (text: string) => {
    try {
        if ("clipboard" in navigator) {
            await navigator.clipboard.writeText(text);
            console.log('clipboard text==>', text)
          }
    } catch (error) {
        console.error('Error copying to clipboard:', error);
    }
    
  };

  return (
    <FaRegCopy className="pointer" onClick={async () => await copyToClipboard("FKFYB26Q98QR")} />
  );
};

export default ClickToCopy;
