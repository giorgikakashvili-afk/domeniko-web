import React, { useState, useEffect } from 'react';
import mainBg from '../assets/main_img/main-bg.png';
import { ArrowUpRight, Users, Briefcase, Presentation, UserStar } from 'lucide-react';

const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const stats = [
    { label: 'მოსწავლე და აბიტურიენტი', value: '6000+', icon: <Users size={28} /> },
    { label: 'პოპულარული პროფესიები', value: '36+', icon: <Briefcase size={28} /> },
    { label: 'საჯარო ლექცია', value: '64+', icon: <Presentation size={28} /> },
    { label: 'პროფესიონალი მენტორი', value: '264+', icon: <UserStar size={28} /> },
  ];

  return (
    <section
      className={`relative min-h-[70dvh] md:min-h-[70vh] flex flex-col items-center justify-between md:justify-center pt-24 pb-12 md:py-32 overflow-hidden xl:mx-5.5 md:mx-5.5 rounded-b-[40px] md:rounded-3xl transition-all duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      style={{
        backgroundImage: `url(${mainBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-black/10"></div>

      {/* სათაურის და ღილაკის ბლოკი */}
      <div className="relative z-10 text-center px-4 mt-10 md:-mt-20">
        <h1 className={`font-noto [font-variant-caps:all-petite-caps] text-[#ffe4d1] text-4xl md:text-7xl font-black max-w-4xl leading-tight transition-all duration-1000 delay-100 
          ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          გზამკვლევი შენი <br /> მომავალი “მე”-ს ძიებაში
        </h1>

        <button
          className={`mt-10 md:mt-18 bg-[#f3713d] hover:bg-[#d95f2d] text-white md:text-[20px] pr-3 py-2 pl-8 rounded-full flex items-center gap-5 mx-auto font-medium shadow-sm shadow-white border transition-all duration-700 delay-500 hover:delay-0 ${loaded ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`} >
          შემოუერთდი დომენიკოს
          <div className='w-11 h-11 rounded-full bg-white text-black flex justify-center items-center transition-transform duration-300'>
            <ArrowUpRight size={25} />
          </div>
        </button>
      </div>

      {/* STATS BAR - ფიქსირებული აიფონისთვის */}
      <div className={`relative md:absolute bottom-0 md:bottom-6 xl:bottom-10 w-full px-4 md:px-7 z-20 mt-12 md:mt-0 transition-all duration-1000 delay-700
        ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
        
        <div className="max-w-8xl mx-auto bg-white/40 backdrop-blur-xl py-6 md:py-8 xl:py-10 rounded-[35px] xl:rounded-4xl shadow-2xl border border-white apple-blur">
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-y-6 md:gap-y-8 xl:gap-y-0">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`flex items-center justify-start gap-3 xl:gap-4 px-6 md:px-4 xl:justify-center transition-all duration-700
                  ${index % 2 === 0 ? 'border-r border-white/10 xl:border-r' : 'xl:border-r border-gray-200/50'} 
                  ${index === 1 ? 'border-none md:border-r' : ''} 
                  ${index === stats.length - 1 ? 'xl:border-none' : ''}`}
              >
                <div className="bg-white/20 p-2 md:p-3 rounded-xl md:rounded-2xl shrink-0">
                  {React.cloneElement(stat.icon, { size: 22, className: "text-[#ffffff] md:w-7 md:h-7" })}
                </div>

                <div className="flex flex-col items-start text-left">
                  <div className="text-white text-lg md:text-2xl xl:text-4xl font-black leading-none">
                    {stat.value}
                  </div>
                  <div className="font-noto [font-variant-caps:all-petite-caps] text-[15px] md:text-lg xl:text-xl font-black mt-1 uppercase tracking-wide leading-tight">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .apple-blur {
          -webkit-backdrop-filter: blur(20px);
          backdrop-filter: blur(20px);
        }
      `}</style>
    </section>
  );
};

export default HeroSection;