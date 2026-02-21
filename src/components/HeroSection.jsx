import React, { useState, useEffect } from 'react';
import mainBg from '../assets/main_img/main-bg.png';
import mainBgMobile from '../assets/main_img/main-bgMobile.png';
import { ArrowUpRight, Users, Briefcase, Presentation, UserStar, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const calculateTimeLeft = () => {
    const targetDate = new Date('2026-03-01T00:00:00');
    const now = new Date();
    const difference = targetDate - now;
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return null;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setLoaded(true);
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    { label: 'მოსწავლე და აბიტურიენტი', value: '6000+', icon: <Users size={28} /> },
    { label: 'პოპულარული პროფესია', value: '36+', icon: <Briefcase size={28} /> },
    { label: 'Live შეხვედრა', value: '240+', icon: <Presentation size={28} /> },
    { label: 'პროფესიონალი მენტორი', value: '100+', icon: <UserStar size={28} /> },
  ];

  // პირობა, რომელიც განსაზღვრავს, ტაიმერის რეჟიმში ვართ თუ არა
  const showTimer = isLoggedIn && timeLeft;

  return (
    <section
      className={`relative min-h-[70dvh] md:min-h-[80dvh] xl:min-h-180 flex flex-col items-center justify-between md:justify-center pt-24 pb-12 md:py-30 overflow-hidden md:mx-5.5 xl:mx-5.5 rounded-b-[40px] md:rounded-3xl transition-all duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'} bg-cover bg-center font-noto`}
      style={{
        '--bg-desktop': `url(${mainBg})`,
        '--bg-mobile': `url(${mainBgMobile})`
      }}
    >
      <style>{`
        section { background-image: var(--bg-mobile); }
        @media (min-width: 768px) { section { background-image: var(--bg-desktop); } }
        .apple-blur { -webkit-backdrop-filter: blur(20px); backdrop-filter: blur(20px); }
      `}</style>

      <div className="absolute inset-0 bg-black/10"></div>

      <div className="relative z-10 text-center px-4 mt-6 md:-mt-50">
        <h1 className={`font-noto [font-variant-caps:all-petite-caps] text-[#ffe4d1] text-[32px] xs:text-4xl md:text-7xl font-black max-w-4xl leading-tight transition-all duration-1000 delay-100 
          ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          გაიცანი პროფესიები  <br /> იპოვე შენი
        </h1>

        <button
          onClick={() => navigate(isLoggedIn ? '/dashboard' : '/login')}
          className={`mt-10 md:mt-18 bg-[#f3713d] hover:bg-[#d95f2d] text-white md:text-[20px] rounded-full flex items-center justify-center mx-auto font-bold shadow-sm shadow-white border transition-all duration-700 delay-500 hover:delay-0 font-noto 
            ${loaded ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}
            ${showTimer ? 'px-8 py-3.25 min-w-70 md:min-w-[320px]' : 'pl-8 pr-3 py-2'}
          `}
        >
          {showTimer ? (
            <div className="flex items-center gap-3 tabular-nums">
              <Clock size={20} />
              <span>{timeLeft.days}დ : {timeLeft.hours}ს : {timeLeft.minutes}წ : {timeLeft.seconds}წმ</span>
            </div>
          ) : (
            <>
              შემოუერთდი დომენიკოს
              <div className='w-11 h-11 rounded-full bg-white text-black flex justify-center items-center transition-transform duration-300 ml-5'>
                <ArrowUpRight size={25} />
              </div>
            </>
          )}
        </button>
      </div>

      <div className={`relative md:absolute bottom-0 md:bottom-6 xl:bottom-20 w-full px-4 md:px-7 z-20 mt-12 md:mt-0 transition-all duration-1000 delay-700
        ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>

        <div className="max-w-8xl mx-auto bg-white/40 backdrop-blur-xl py-6 md:py-8 xl:py-10 rounded-[35px] xl:rounded-4xl shadow-2xl border border-white apple-blur">
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-y-6 gap-x-2 md:gap-y-8 xl:gap-0">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`flex items-center justify-start gap-2 md:gap-3 xl:gap-4 px-3 md:px-6 xl:justify-center transition-all duration-700
                  ${index % 2 === 0 ? 'border-r border-white/20' : 'border-transparent'} 
                  xl:border-r xl:border-white/20 xl:last:border-none
                  xl:border-l-0`}
              >
                <div className="bg-white/20 p-1.5 md:p-3 rounded-lg md:rounded-2xl shrink-0">
                  {React.cloneElement(stat.icon, { className: "w-5 h-5 md:w-7 md:h-7 text-white" })}
                </div>

                <div className="flex flex-col items-start text-left min-w-0 flex-1">
                  <div className="text-white text-lg md:text-2xl xl:text-4xl font-black leading-none font-noto">
                    {stat.value}
                  </div>
                  <div className=" font-noto [font-variant-caps:all-petite-caps] text-[13px] md:text-lg xl:text-xl font-black mt-0.5 uppercase tracking-tight leading-[1.1] whitespace-normal">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;