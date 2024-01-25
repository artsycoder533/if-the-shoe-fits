import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

type Props = {
  title: string;
};

const Hero = async ({ title }: Props) => {
 

  if (!title) return;
  return (
    <section className="h-screen
     flex flex-col justify-center items-center gap-16 relative">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        preload="auto"
        className="absolute top-0 left-0 w-full h-full object-cover bg-black"
      >
        <source src={"/videos/hero-vid.mp4"} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>

      <div className="z-10 text-white flex flex-col max-w-[1400px] w-[90vw] mx-auto ">
        <h1 className="text-5xl md:text-7xl 2xl:text-8xl font-bold flex flex-col gap-1">
          <span className="inline-block first-letter:text-purple-700">Make</span>
          <span className="inline-block">every</span>
          <span className="inline-block">step</span>
          <span className="inline-block">a</span>
          <span className="inline-block">statement.</span>
        </h1>
        <Link
          href="/products"
          className="w-full justify-center sm:w-auto flex gap-2 items-center py-4 px-5 bg-purple-700 animate-bounce text-white text-center mt-24 self-center rounded-md hover:bg-purple-900"
        >
          Shop Now <FaArrowRight />
        </Link>
      </div>
    </section>
  );
};

export default Hero;
