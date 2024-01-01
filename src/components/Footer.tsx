import Link from "next/link";
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaPhone,
  FaHeart,
} from "react-icons/fa";

type Props = {};

const ClassicFooter = (props: Props) => {
  const getDate = () => {
    const date = new Date();
    return date.getFullYear();
  };

  return (
    <footer className="flex flex-col sticky mt-auto pt-6 px-4 bg-black text-white">
      <div className="max-w-[1400px] w-[90vw] mx-auto">
        <div className="flex flex-col lg:flex-row lg:justify-between py-4 gap-8 lg:gap-0">
          <div className="w-full flex flex-col items-center lg:items-start">
            <p className="flex flex-col mb-4 text-purple-500 text-2xl font-bold">
              If The Shoe Fits
            </p>

            <Link
              className="flex flex-row gap-3  items-center hover:text-purple-500 font-extralight"
              href="tel:555-555-5555"
            >
              <FaPhone />
              555-555-5555
            </Link>
            <Link
              href="shop@iftheshoefits.com"
              className="hover:text-purple-500 flex flex-row gap-3 items-center font-extralight"
            >
              <FaEnvelope />
              shop@iftheshoefits.com
            </Link>
            <div className="flex space-x-4 mt-6 lg:mt-auto">
              <Link
                href="https://www.instagram.com/mallofamerica/"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram
                  className="text-3xl hover:text-purple-500"
                  alt="Instagram"
                />
              </Link>
              <Link
                href="https://www.facebook.com/MallofAmerica/"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaFacebookF
                  className="text-3xl hover:text-purple-500"
                  alt="Facebook"
                />
              </Link>
              <Link
                href="https://twitter.com/mallofamerica?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <FaTwitter
                  className="text-3xl hover:text-purple-500"
                  alt="Twitter"
                />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 w-full">
            <div className="w-full">
              <h3 className=" text-lg mb-2 text-purple-500 underline underline-offset-8">
                Links
              </h3>
              <ul className="flex flex-col justify-between font-extralight">
                <li className="py-2">
                  <Link href="/" className="hover:text-purple-500">Home</Link>
                </li>
                <li className="py-2">
                  <Link href="/products" className="hover:text-purple-500">Products</Link>
                </li>
                <li className="py-2">
                  <Link href="/contact" className="hover:text-purple-500">Contact</Link>
                </li>
              </ul>
            </div>
            <div className="w-full">
              <h3 className="text-lg mb-2 text-purple-500 underline underline-offset-8">
                Customer Service
              </h3>
              <ul className="font-extralight">
                <li className="py-2">
                  <Link href="/returns-exchanges" className="hover:text-purple-500">Returns/Exchanges</Link>
                </li>
                <li className="py-2">
                  <Link href="/refunds" className="hover:text-purple-500">Refunds</Link>
                </li>
                <li className="py-2">
                  <Link href="/privacy-policy" className="hover:text-purple-500">Privacy Policy</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col py-4 border-t border-purple-500 w-full">
          <p className=" items-center justify-center text-center text-xs">
            Copyright &copy; {getDate()} If The Shoe Fits. All Rights
            Reserved.
          </p>
          <p className=" flex flex-row  items-center justify-center gap-1 text-center text-xs">
            Made with <FaHeart className="text-red-500"/> by:{" "}
            <Link
              href="https://www.natashajohnson.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="underline py-2 hover:text-purple-500"
            >
              Natasha Johnson
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default ClassicFooter;