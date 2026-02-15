import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/main_img/logo-dom.png';
import { Facebook, Instagram, Linkedin, Phone, Mail, MapPin } from 'lucide-react';

// მოდალების იმპორტი
import TermsModal from './TermsModal';
import PrivacyModal from './PrivacyModal';
import AboutModal from './AboutModal';
import PartnersModal from './PartnersModal'; 
import HollandTestModal from './HollandTestModal'; // შემოვიტანოთ ტესტის მოდალი

const Footer = () => {
  // სტეიტები მოდალებისთვის
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isPartnersOpen, setIsPartnersOpen] = useState(false);
  const [isHollandOpen, setIsHollandOpen] = useState(false); // სტეიტი ტესტისთვის

  return (
    <footer className="bg-[#09002f] text-white py-12 px-6 md:px-16 font-noto">
      {/* მოდალების კომპონენტები */}
      <TermsModal 
        isOpen={isTermsOpen} 
        onClose={() => setIsTermsOpen(false)} 
      />
      <PrivacyModal 
        isOpen={isPrivacyOpen} 
        onClose={() => setIsPrivacyOpen(false)} 
      />
      <AboutModal 
        isOpen={isAboutOpen} 
        onClose={() => setIsAboutOpen(false)} 
      />
      <PartnersModal 
        isOpen={isPartnersOpen} 
        onClose={() => setIsPartnersOpen(false)} 
      />
      <HollandTestModal 
        isOpen={isHollandOpen} 
        onClose={() => setIsHollandOpen(false)} 
      />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12 pl-5 md:pl-0">
        
        {/* 1. ლოგო */}
        <div className="flex flex-col justify-between items-start gap-8">
          <div className="flex flex-col items-start gap-2">
            <img src={logo} alt="Domeniko" className="h-16 md:h-18 object-contain -ml-4 md:-ml-8" />
          </div>
          <p className="hidden md:block text-sm font-bold opacity-60">
            ყველა უფლება დაცულია. 2026
          </p>
        </div>

        {/* 2. ნავიგაცია */}
        <div className="flex flex-col gap-4 items-start xl:pt-5">
          {/* ჩვენ შესახებ - მოდალი */}
          <button 
            onClick={() => setIsAboutOpen(true)}
            className="hover:text-[#f3713d] transition-all text-sm font-bold cursor-pointer outline-none border-none bg-transparent p-0 text-left"
          >
            ჩვენ შესახებ
          </button>

          {/* პარტნიორები - მოდალი */}
          <button 
            onClick={() => setIsPartnersOpen(true)}
            className="hover:text-[#f3713d] transition-all text-sm font-bold cursor-pointer outline-none border-none bg-transparent p-0 text-left"
          >
            პარტნიორები
          </button>
          
          {/* წესები და პირობები - მოდალი */}
          <button 
            onClick={() => setIsTermsOpen(true)}
            className="hover:text-[#f3713d] transition-all text-sm font-bold cursor-pointer outline-none border-none bg-transparent p-0 text-left"
          >
            წესები და პირობები
          </button>

          {/* კონფიდენციალურობის პოლიტიკა - მოდალი */}
          <button 
            onClick={() => setIsPrivacyOpen(true)}
            className="hover:text-[#f3713d] transition-all text-sm font-bold cursor-pointer outline-none border-none bg-transparent p-0 text-left"
          >
            კონფიდენციალურობის პოლიტიკა
          </button>

          <Link to="/calendar" className="hover:text-[#f3713d] transition-all text-sm font-bold">დომენიკოს კალენდარი</Link>
          <Link to="/professions" className="hover:text-[#f3713d] transition-all text-sm font-bold">პროფესიები</Link>
          
          {/* ჰოლანდის ტესტი - მოდალი */}
          <button 
            onClick={() => setIsHollandOpen(true)}
            className="hover:text-[#f3713d] transition-all text-sm font-bold cursor-pointer outline-none border-none bg-transparent p-0 text-left"
          >
            ჰოლანდის ტესტი
          </button>
        </div>

        {/* 3. კონტაქტი */}
        <div className="flex flex-col gap-8 items-start">
          <div className="flex flex-col gap-4 items-start">
            <h4 className="font-bold text-sm opacity-60 uppercase tracking-widest">სოციალური ქსელები</h4>
            <div className="flex gap-5 items-center">
              <a href="#" className="hover:text-[#f3713d] transition-colors"><Facebook className="w-5 h-5" /></a>
              <span className="font-bold text-sm hover:text-[#f3713d] cursor-pointer">TikTok</span>
              <a href="#" className="hover:text-[#f3713d] transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-[#f3713d] transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="bg-[#f3713d]/20 p-2 rounded-full">
                <Phone size={16} className="text-[#f3713d]" />
              </div>
              <span className="text-sm font-bold hover:text-[#f3713d] transition-colors cursor-pointer tracking-wider">
                592 01 50 91
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-[#f3713d]/20 p-2 rounded-full">
                <Mail size={16} className="text-[#f3713d]" />
              </div>
              <span className="text-sm font-bold hover:text-[#f3713d] transition-colors cursor-pointer">
                info@domenico.ge
              </span>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-[#f3713d]/20 p-2 rounded-full mt-0.5 shrink-0">
                <MapPin size={16} className="text-[#f3713d]" />
              </div>
              <span className="text-sm font-bold leading-relaxed max-w-[220px]">
                დავით გურამიშვილის გამზირი 78ბ, თბილისი, საქართველო
              </span>
            </div>
          </div>
        </div>

        <p className="md:hidden text-sm font-bold opacity-50 mt-4 border-t border-white/10 pt-6">
          ყველა უფლება დაცულია. 2026
        </p>
      </div>
    </footer>
  );
};

export default Footer;