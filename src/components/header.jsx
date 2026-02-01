import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from '../assets/main_img/logo-dom.png';
import {User} from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full font-noto md:mb-1">
      {/* bg-[#09002f] - ლურჯი ფერი მობილურზე
        md:bg-[#fff4ec] - 768px-დან ფერი იცვლება ღიაზე
        xl:justify-around - 1280px-დან გასწორება იცვლება დესკტოპისთვის
      */}
      <div className="bg-[#09002f] md:bg-[#fff4ec] w-full h-21 flex justify-between items-center mt-6 px-4 xl:px-5">

        {/* ლოგო */}
        <div className="bg-[#09002f] px-8 py-3 rounded-3xl">
          <Link to="/" className="h-full flex items-center">
            <img src={logo} alt="Domeniko Logo" className="h-13 object-contain shrink-0" />
          </Link>
        </div>

        {/* დესკტოპ ნავიგაცია - გამოჩნდება მხოლოდ xl (1280px) ზემოთ */}
        <nav className="hidden xl:flex items-center gap-8 font-medium text-[#0A0521] text-sm">
          <Link to="/about" className="flex items-center gap-1 hover:text-[#f3713d] transition-colors">
            <span>ჩვენ შესახებ</span>
            <svg className="w-4 h-4 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </Link>
          <Link to="/calendar" className="hover:text-[#f3713d] transition-colors">კალენდარი</Link>
          <Link to="/professions" className="hover:text-[#f3713d] transition-colors">პროფესიები</Link>
          <Link to="/tests" className="hover:text-[#f3713d] transition-colors">ტესტირება</Link>
          <Link to="/part" className="hover:text-[#f3713d] transition-colors">პარტნიორები</Link>
        </nav>

        {/* დესკტოპ რეგისტრაციის ღილაკი - გამოჩნდება მხოლოდ xl (1280px) ზემოთ */}
        <div className="flex items-center gap-2 md:gap-4">

          {/* რეგისტრაცია ავტორიზაცია ღილაკი */}
          <button className="flex w-auto xl:w-88.5 h-10 xl:h-14 bg-[#ffe4d1] rounded-full border border-[#f3713d] justify-center gap-2 items-center hover:bg-[#ffd8bc] transition-all cursor-pointer py-2 px-2 md:py-6 md:px-5  xl:py-2  xl:px-4 shrink-0">
            <span className="font-black text-xs md:text-sm xl:text-xl [font-variant-caps:all-petite-caps] tracking-wide">
              <span className="xl:hidden inline-block text-base md:text-xl -translate-y-0.5">ავტორიზაცია</span>
              <span className="hidden xl:inline">
                რეგისტრაცია <span className="font-normal text-base opacity-50">|</span> ავტორიზაცია
              </span>
            </span>
            <div className="w-5 h-5 xl:w-8 xl:h-8 bg-[#f3713d] rounded-full shrink-0 flex justify-center items-center"><User size={22} /></div>
          </button>

          {/* ჰამბურგერი - ჩნდება მხოლოდ xl-მდე */}
          <button
            className="xl:hidden p-1 transition-transform active:scale-90"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X size={32} className="text-white md:text-[#09002f]"/>
            ) : (
              <div className="w-8 h-8">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* ნარინჯისფერი რგოლები*/}
                  <circle cx="28" cy="28" r="14" stroke="#f3713d" strokeWidth="10" />
                  <circle cx="75" cy="75" r="14" stroke="#f3713d" strokeWidth="10" />

                  {/* ეს რგოლი იცვლის ფერს: 
                    მობილურზე: თეთრი (ლურჯ ფონზე)
                    პლანშეტზე (md): მუქი ლურჯი (კრემისფერ ფონზე)*/}
                  <circle
                    cx="75"
                    cy="28"
                    r="14"
                    strokeWidth="10"
                    stroke="currentColor"
                    className="text-white md:text-[#09002f]"
                  />

                  {/* მეორე ცვალებადი რგოლი */}
                  <circle
                    cx="28"
                    cy="75"
                    r="14"
                    strokeWidth="10"
                    stroke="currentColor"
                    className="text-white md:text-[#09002f]"
                  />
                </svg>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* მობილური მენიუ - იხსნება xl (1280px) ზომამდე */}
      {isOpen && (
        <div className="absolute top-21 left-0 w-full bg-white z-50 shadow-2xl flex flex-col items-center py-10 gap-6 xl:hidden">
          <Link to="/about" className="text-xl font-bold" onClick={() => setIsOpen(false)}>ჩვენ შესახებ</Link>
          <Link to="/calendar" className="text-xl font-bold" onClick={() => setIsOpen(false)}>კალენდარი</Link>
          <Link to="/professions" className="text-xl font-bold" onClick={() => setIsOpen(false)}>პროფესიები</Link>
          <Link to="/tests" className="text-xl font-bold" onClick={() => setIsOpen(false)}>ტესტირება</Link>
          <Link to="/part" className="text-xl font-bold" onClick={() => setIsOpen(false)}>პარტნიორები</Link>


        </div>
      )}
    </div>
  );
};

export default Header;