import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/main_img/logo-dom.png';
// სახელები უნდა ემთხვეოდეს ქვემოთ გამოყენებულს
import { Facebook, Instagram, Linkedin, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#09002f] text-white py-12 px-6 md:px-16 font-noto">
      {/* დავამატე md:pl-0, რომ კომპიუტერზე ცენტრირება არ აირიოს */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12 pl-5 md:pl-0">
        
        {/* 1. ლოგო */}
        <div className="flex flex-col justify-between items-start gap-8">
          <div className="flex flex-col items-start gap-2">
            {/* -ml-6 მობილურზე ძალიან ბევრია, სცადე -ml-4 ან -ml-2 */}
            <img src={logo} alt="Domeniko" className="h-16 md:h-18 object-contain -ml-4 md:-ml-8" />
          </div>
          <p className="hidden md:block text-sm font-bold">
            ყველა უფლება დაცულია. 2026
          </p>
        </div>

        {/* 2. ნავიგაცია */}
        <div className="flex flex-col gap-4 items-start xl:pt-5">
          <Link to="/about" className="hover:text-[#f3713d] transition-all text-sm font-bold">ჩვენ შესახებ</Link>
          <Link to="/terms" className="hover:text-[#f3713d] transition-all text-sm font-bold">წესები და პირობები</Link>
          <Link to="/privacy" className="hover:text-[#f3713d] transition-all text-sm font-bold">კონფიდენციალურობის პოლიტიკა</Link>
          <Link to="/partners" className="hover:text-[#f3713d] transition-all text-sm font-bold">პარტნიორები</Link>
          <Link to="/calendar" className="hover:text-[#f3713d] transition-all text-sm font-bold">დომენიკოს კალენდარი</Link>
          <Link to="/professions" className="hover:text-[#f3713d] transition-all text-sm font-bold">პროფესიები</Link>
          <Link to="/tests" className="hover:text-[#f3713d] transition-all text-sm font-bold">ტესტირება</Link>
        </div>

        {/* 3. კონტაქტი */}
        <div className="flex flex-col gap-8 items-start">
          <div className="flex flex-col gap-4 items-start">
            <h4 className="font-bold text-sm">კონტაქტი</h4>
            <h4 className="font-bold text-sm">სოციალური ქსელები</h4>
            <div className="flex gap-5 items-center">
              {/* აქ სახელები დაემთხვა იმპორტს */}
              <Facebook className="w-5 h-5 hover:text-[#f3713d] cursor-pointer transition-colors" />
              <span className="font-bold text-sm hover:text-[#f3713d] cursor-pointer">TikTok</span>
              <Instagram className="w-5 h-5 hover:text-[#f3713d] cursor-pointer transition-colors" />
              <Linkedin className="w-5 h-5 hover:text-[#f3713d] cursor-pointer transition-colors" />
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="bg-[#f3713d]/20 p-2 rounded-full">
                <Phone size={16} className="text-[#f3713d]" />
              </div>
              <span className="text-sm font-bold">0322 2 36 21 23</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-[#f3713d]/20 p-2 rounded-full">
                <Mail size={16} className="text-[#f3713d]" />
              </div>
              <span className="text-sm font-bold">contact@domenico.ge</span>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-[#f3713d]/20 p-2 rounded-full mt-0.5">
                <MapPin size={16} className="text-[#f3713d]" />
              </div>
              <span className="text-sm font-bold leading-relaxed max-w-55">
                გურამიშვილის ქ. №14 ბ, თბილისი, საქართველო
              </span>
            </div>
          </div>
        </div>

        <p className="md:hidden text-sm font-bold opacity-80 mt-4 border-t border-white/10 pt-6">
          ყველა უფლება დაცულია. 2026
        </p>
      </div>
    </footer>
  );
};

export default Footer;