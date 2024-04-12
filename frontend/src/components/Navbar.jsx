// Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import { List, X } from "@phosphor-icons/react";

function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const handleMobNav = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <header className="py-8 px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-24 subpixel-antialiased top-0 sticky z-50 backdrop-blur-md bg-white/3">
        <nav className="flex justify-between items-center">
          <Link to="/" className="font-bold text-xl">
            Let's <span className="text-blue-600">Convert</span> it
          </Link>
          <ul className="space-x-8 font-semibold text-lg max-[600px]:hidden">
            <li className="inline hover:underline">
              <Link to="/" onClick={() => setIsOpen(false)}>
                Home
              </Link>
            </li>
            <li className="inline hover:underline">
              <Link to="about" onClick={() => setIsOpen(false)}>
                About
              </Link>
            </li>
            <li className="inline hover:underline">
              <Link to="contact" onClick={() => setIsOpen(false)}>
                Contact
              </Link>
            </li>
          </ul>
          <button className="px-4 py-2 bg-blue-400 group rounded max-[600px]:hidden">
            <a href="https://twitter.com/rahul_s_twts">
              Found a Bug 🪲
            </a>
          </button>
          <button
            className=" rounded md:hidden min-[600px]:hidden  "
            onClick={handleMobNav}
          >
            {isOpen ? <X size={32} /> : <List size={32} />}
          </button>
        </nav>
      </header>
      <MobileNav isOpen={isOpen} handleMobNav={handleMobNav} />
    </>
  );
}

export default Navbar;
