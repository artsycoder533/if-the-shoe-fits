import Link from "next/link";
import React from "react";
import { FaRegCopy } from "react-icons/fa6";

type Props = {
  title: string;
};

const Hero = async ({ title }: Props) => {
  // const copyToClipboard = async(text:string) => {
  //   if('clipboard' in navigator) {
  //     return await navigator.clipboard.writeText(text);
  //   } 
  // }
  // if('clipboard' in navigator) {
  //   console.log(navigator.clipboard.readText) 
  // } 
  
  if (!title) return;
  return (
    <section className="h-[calc(100vh-64px)] flex flex-col justify-center items-center gap-12 relative">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        preload="metadata"
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={"/videos/hero-vid.mp4"} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p className="absolute top-0 left-0 p-2 bg-white flex items-center gap-1">Enter code FKFYB26Q98QR <FaRegCopy /> at checkout for 15% off your purchase!</p>
      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>

      <div className="z-10 text-white flex flex-col">
        <h1 className="text-3xl font-bold">Make every step a statement.</h1>
        <Link href="/products" className="py-3 px-4 bg-purple-700 text-white text-center mt-24 self-center rounded-md">
          Shop Now
        </Link>
      </div>
    </section>
  );
};

export default Hero;
