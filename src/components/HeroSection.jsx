import React, { useState, useEffect } from 'react';
import mainBg from '../assets/main_img/main-bg.png';
import { ArrowUpRight, Users, Briefcase, Presentation, UserStar } from 'lucide-react';

const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const stats = [
    { label: 'მოსწავლე და აბიტურიენტი', value: '6000+', icon: <Users size={28} className="text-[#f3713d]" /> },
    { label: 'პოპულარული პროფესიები', value: '36+', icon: <Briefcase size={28} className="text-[#f3713d]" /> },
    { label: 'საჯარო ლექცია', value: '64+', icon: <Presentation size={28} className="text-[#f3713d]" /> },
    { label: 'პროფესიონალი მენტორი', value: '264+', icon: <UserStar size={28} className="text-[#f3713d]" /> },
  ];

  return (
    <section
      className={`relative min-h-[70vh] flex items-center justify-center pt-20 pb-32 overflow-hidden xl:mx-5.5 md:mx-5.5 rounded-3xl transition-all duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      style={{
        backgroundImage: `url(${mainBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-black/10"></div>

      <div className="relative z-10 text-center px-4 -mt-40">
        {/* სათაურის ანიმაცია */}
        <h1 className={`font-noto [font-variant-caps:all-petite-caps] text-[#ffe4d1] text-4xl md:text-7xl font-black max-w-4xl leading-tight transition-all duration-1000 delay-100 
          ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          გზამკვლევი შენი <br /> მომავალი “მე”-ს ძიებაში
        </h1>

        {/* ღილაკის ანიმაცია - Scale და Fade */}
        <button
          className={`mt-18 bg-[#f3713d] hover:bg-[#d95f2d] text-white md:text-[20px] pr-3 py-2 pl-8 rounded-full flex items-center gap-5 mx-auto font-medium shadow-sm shadow-white border transition-[opacity,transform] duration-700 delay-500 hover:delay-0 hover:duration-200 ${loaded ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`} >
          შემოუერთდი დომენიკოს
          <div className='w-11 h-11 rounded-4xl bg-white text-black flex justify-center items-center group-hover:rotate-45 transition-transform duration-300'>
            <ArrowUpRight size={25} />
          </div>
        </button>
      </div>

      {/* STATS BAR - ამოწევის ანიმაცია */}
      <div className={`absolute bottom-6 md:bottom-10 left-0 w-full px-7 z-20 transition-all duration-1000 delay-700
        ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
        <div className="max-w-8xl mx-auto bg-white/50 backdrop-blur-md py-8 md:py-10 rounded-3xl md:rounded-4xl shadow-2xl border-2 border-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 md:gap-y-0">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`flex items-center justify-start gap-3 md:gap-4 px-4 pl-8 md:pl-0 md:justify-center transition-all duration-700
                  ${index !== stats.length - 1 ? 'md:border-r border-gray-200/50' : ''}`}
              >
                <div className="bg-orange-50 p-2 md:p-3 rounded-xl md:rounded-2xl shrink-0">
                  {React.cloneElement(stat.icon, { size: 24, className: "text-[#f3713d] md:w-7 md:h-7" })}
                </div>

                <div className="flex flex-col items-start text-left">
                  <div className="text-white text-xl md:text-4xl font-black leading-none">
                    {stat.value}
                  </div>
                  <div className="font-noto [font-variant-caps:all-petite-caps] text-[#0A0521] text-[10px] md:text-xl font-black mt-1 uppercase tracking-wide leading-tight">
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