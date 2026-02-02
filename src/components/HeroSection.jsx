import React, { useState, useEffect } from 'react';
import mainBg from '../assets/main_img/main-bg.png';
import mainBgMobile from '../assets/main_img/main-bgMobile.png'; 
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
      className={`relative min-h-[70dvh] md:min-h-[80dvh] xl:min-h-[75vh] flex flex-col items-center justify-between md:justify-center pt-24 pb-12 md:py-32 overflow-hidden md:mx-5.5 xl:mx-5.5 rounded-b-[40px] md:rounded-3xl transition-all duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'} bg-cover bg-center`}
      style={{
        // ვიყენებთ CSS ცვლადებს დინამიური ფონისთვის
        '--bg-desktop': `url(${mainBg})`,
        '--bg-mobile': `url(${mainBgMobile})`
      }}
    >
      {/* ლოკალური სტილები ფონისთვის და ბლერისთვის */}
      <style jsx>{`
        section {
          background-image: var(--bg-mobile);
        }
        @media (min-width: 768px) {
          section {
            background-image: var(--bg-desktop);
          }
        }
        .apple-blur {
          -webkit-backdrop-filter: blur(20px);
          backdrop-filter: blur(20px);
        }
      `}</style>

      <div className="absolute inset-0 bg-black/10"></div>

      {/* სათაურის და ღილაკის ბლოკი */}
      <div className="relative z-10 text-center px-4 mt-6 md:-mt-20">
        <h1 className={`font-noto [font-variant-caps:all-petite-caps] text-[#ffe4d1] text-[32px] xs:text-4xl md:text-7xl font-black max-w-4xl leading-tight transition-all duration-1000 delay-100 
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

      {/* STATS BAR - ოპტიმიზირებული მობილურისთვის */}
      <div className={`relative md:absolute bottom-0 md:bottom-6 xl:bottom-10 w-full px-4 md:px-7 z-20 mt-12 md:mt-0 transition-all duration-1000 delay-700
        ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>

        <div className="max-w-8xl mx-auto bg-white/40 backdrop-blur-xl py-6 md:py-8 xl:py-10 rounded-[35px] xl:rounded-4xl shadow-2xl border border-white apple-blur">
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-y-6 gap-x-2 md:gap-y-8 xl:gap-0">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`flex items-center justify-start gap-2 md:gap-3 xl:gap-4 px-3 md:px-6 xl:justify-center transition-all duration-700
                  ${index % 2 === 0 ? 'border-r border-white/20' : ''} 
                  ${index > 1 ? 'xl:border-l xl:border-white/20' : ''}
                  xl:border-r last:border-none`}
              >
                {/* პატარა აიქონი მობილურისთვის */}
                <div className="bg-white/20 p-1.5 md:p-3 rounded-lg md:rounded-2xl shrink-0">
                  {React.cloneElement(stat.icon, { className: "w-5 h-5 md:w-7 md:h-7 text-white" })}
                </div>

                <div className="flex flex-col items-start text-left min-w-0">
                  <div className="text-white text-lg md:text-2xl xl:text-4xl font-black leading-none">
                    {stat.value}
                  </div>
                  {/* whitespace-nowrap უშველის ტექსტის გაწყვეტას */}
                  <div className="font-noto [font-variant-caps:all-petite-caps] text-[13px] md:text-lg xl:text-xl font-black mt-0.5 uppercase tracking-tight leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
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