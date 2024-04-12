import React from "react";

import Upload from "./Upload";
export function Hero() {
  return (
    <main className="w-[90%] mt-8 max-w-[900px] mx-auto flex flex-col  gap-20 subpixel-antialiased font-sans">
      <section className="text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-7 bg-gradient-to-r from-blue-800 text-transparent via-blue-700 to-blue-600 bg-clip-text">
          A Simple File Converter
        </h1>
        <p className="text-base md:text-lg text-gray-400">
          Welcome to File Converter, your ultimate solution for effortless file
          conversion. With our intuitive platform, convert images, videos, and
          files seamlessly and swiftly. It's fast, free, and secure - no hidden
          charges, just hassle-free conversions. Experience the convenience of
          versatile file conversion with us today.
        </p>
      </section>
      <Upload />
    </main>
  );
}

export default Hero;
