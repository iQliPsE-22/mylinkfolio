"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FaUser, FaHome, FaShoppingCart } from "react-icons/fa";
import Res_category_menu from './Res_category_menu';

const ResNavbar = () => {
  const [showCategories, setShowCategories] = useState(false);
  const dropdownRef = useRef(null);

  

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCategories(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <nav className="lg:hidden w-full fixed bottom-0 p-4 bg-black text-white shadow-inner shadow-lg shadow-[#407bff]">
      <ul className="flex justify-around items-center space-x-4 text-xs">
        {/* Home Link */}
        <li className="relative">
          <Link
            href="/"
            className="flex flex-col items-center hover:text-[#E90074]"
          >
            <FaHome />
            <span className="text-xs mt-1">Home</span>
          </Link>
        </li>

        {/* Categories with Dropdown */}
        <li className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowCategories(!showCategories)}
            className="flex flex-col items-center hover:text-[#E90074] focus:outline-none"
          >
            <MdCategory />
            <span className="text-xs mt-1">Categories</span>
          </button>
          {showCategories && (
            <Res_category_menu  setShowCategories = {setShowCategories}/>
          )}
        </li>

        {/* User/Login Link */}
        <li className="relative">
          <Link
            href="/login"
            className="flex flex-col items-center hover:text-[#E90074]"
          >
            <FaUser />
            <span className="text-xs mt-1">Login</span>
          </Link>
        </li>

        {/* Cart Link */}
        <li className="relative">
          <Link
            href="/cart"
            className="flex flex-col items-center hover:text-[#E90074]"
          >
            <FaShoppingCart />
            <span className="text-xs mt-1">Cart</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default ResNavbar;
