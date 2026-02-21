import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { X, User, LogOut } from "lucide-react";
import logo from '../assets/main_img/logo-dom.png';
import { useAuth } from '../context/AuthContext';
import HollandTestModal from './HollandTestModal';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHollandModalOpen, setIsHollandModalOpen] = useState(false);
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.style.scrollbarGutter = "stable";
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
      navigate('/');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleStartTest = () => {
    setIsHollandModalOpen(false);
    navigate('/tests');
  };

  // ნავიგაციის ლინკების სტილი (დესკტოპისთვის)
  const navLinkStyle = "hover:text-[#f3713d] transition-colors font-bold";
  // ნავიგაციის ლინკების სტილი (მობილურისთვის)
  const mobileNavLinkStyle = "text-xl font-bold";

  return (
    <div className="relative w-full font-noto md:mb-1">
      {/* მხოლოდ ჰოლანდის ტესტის მოდალი დავტოვეთ */}
      <HollandTestModal
        isOpen={isHollandModalOpen}
        onClose={() => setIsHollandModalOpen(false)}
        onStart={handleStartTest}
      />

      <div className="bg-[#09002f] md:bg-[#fff4ec] w-full h-21 flex justify-between items-center mt-0 md:mt-6 px-4 xl:px-5 relative">

        {/* ლოგო */}
        <div className="bg-[#09002f] px-8 py-3 rounded-3xl z-10">
          <Link to="/" className="h-full flex items-center">
            <img src={logo} alt="Domeniko Logo" className="h-13 object-contain shrink-0" />
          </Link>
        </div>

        {/* დესკტოპ ნავიგაცია */}
        <nav className="hidden xl:flex absolute left-1/2 -translate-x-1/2 items-center gap-8 font-medium text-[#0A0521] text-sm whitespace-nowrap">
          {/* ღილაკი შეიცვალა Link-ით */}
          <Link to="/how-it-works" className={navLinkStyle}>
            როგორ მუშაობს
          </Link>

          <Link to="/calendar" className={navLinkStyle}>კალენდარი</Link>
          <Link to="/professions" className={navLinkStyle}>პროფესიები</Link>
          <Link to="/speakers" className={navLinkStyle}>სპიკერები</Link>
          <Link to="/news" className={navLinkStyle}>სიახლეები</Link>

          <button
            onClick={() => setIsHollandModalOpen(true)}
            className={`${navLinkStyle} cursor-pointer outline-none`}
          >
            ჰოლანდის ტესტი
          </button>
        </nav>

        {/* ავტორიზაციის / პროფილის ბლოკი */}
        <div className="flex items-center gap-2 md:gap-4 z-10">
          {loading ? (
            <div className="w-8 h-8 border-4 border-[#f3713d] border-t-transparent rounded-full animate-spin"></div>
          ) : user ? (
            <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm p-1 xl:p-2 pr-4 rounded-full border border-[#f3713d]/20">
              <Link to="/dashboard" className="w-8 h-8 xl:w-10 xl:h-10 bg-[#f3713d] rounded-full flex justify-center items-center text-white hover:scale-105 transition-transform">
                <User size={20} />
              </Link>
              <div className="hidden md:flex flex-col min-w-20">
                <span className="text-[10px] font-black opacity-50 uppercase leading-none">პროფილი</span>
                <span className="text-sm font-black text-[#0A0521] truncate max-w-30">
                  {user.firstname || "მომხმარებელი"}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-red-50 text-red-500 rounded-full transition-colors active:scale-90"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate('/register')}
              className="flex w-auto xl:w-88.5 h-10 xl:h-14 bg-[#ffe4d1] rounded-full border border-[#f3713d] justify-center gap-2 items-center hover:bg-[#ffd8bc] transition-all cursor-pointer py-2 px-2 md:py-6 md:px-5 xl:py-2 xl:px-4 shrink-0"
            >
              <span className="font-black text-xs md:text-sm xl:text-xl [font-variant-caps:all-petite-caps] tracking-wide uppercase">
                რეგისტრაცია <span className="hidden xl:inline font-normal text-base opacity-50">|</span> <span className="hidden xl:inline">ავტორიზაცია</span>
              </span>
              <div className="w-5 h-5 xl:w-8 xl:h-8 bg-[#f3713d] rounded-full shrink-0 flex justify-center items-center text-white">
                <User size={22} />
              </div>
            </button>
          )}

          {/* ჰამბურგერი */}
          <button className="xl:hidden p-1" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={32} className="text-white md:text-[#09002f]" /> : (
              <div className="w-8 h-8">
                <svg viewBox="0 0 100 100" fill="none">
                  <circle cx="28" cy="28" r="14" stroke="#f3713d" strokeWidth="10" />
                  <circle cx="75" cy="75" r="14" stroke="#f3713d" strokeWidth="10" />
                  <circle cx="75" cy="28" r="14" strokeWidth="10" stroke="currentColor" className="text-white md:text-[#09002f]" />
                  <circle cx="28" cy="75" r="14" strokeWidth="10" stroke="currentColor" className="text-white md:text-[#09002f]" />
                </svg>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* მობილური მენიუ */}
      {isOpen && (
        <div className="absolute top-21 left-0 w-full bg-white z-100 shadow-2xl flex flex-col items-center py-10 gap-6 xl:hidden">
          <Link to="/how-it-works" className={mobileNavLinkStyle} onClick={() => setIsOpen(false)}>როგორ მუშაობს</Link>
          <Link to="/calendar" className={mobileNavLinkStyle} onClick={() => setIsOpen(false)}>კალენდარი</Link>
          <Link to="/professions" className={mobileNavLinkStyle} onClick={() => setIsOpen(false)}>პროფესიები</Link>
          <Link to="/speakers" className={mobileNavLinkStyle} onClick={() => setIsOpen(false)}>სპიკერები</Link>
          <Link to="/news" className={mobileNavLinkStyle} onClick={() => setIsOpen(false)}>სიახლეები</Link>

          <button
            className={mobileNavLinkStyle}
            onClick={() => { setIsOpen(false); setIsHollandModalOpen(true); }}
          >
            ჰოლანდის ტესტი
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;