// MobileNav.js
import React from "react";
import { NavLink } from "react-router-dom";
import { X } from "@phosphor-icons/react";

function MobileNav({ isOpen, handleMobNav }) {
  const handleBodyOverflow = () => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  React.useEffect(() => {
    handleBodyOverflow();
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const mobileNavClass = isOpen
    ? "fixed inset-0 z-100 flex items-center justify-center bg-white/5 backdrop-blur-md"
    : "hidden";

  return (
    <div className={mobileNavClass}>
      <div className="w-full h-full flex flex-col justify-center items-center transition-transform">
        <ul className="space-y-4 font-semibold text-lg">
          <li>
            <NavLink to="/" onClick={handleMobNav}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="about" onClick={handleMobNav}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="contact" onClick={handleMobNav}>
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default MobileNav;
