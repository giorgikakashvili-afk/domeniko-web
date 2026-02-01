import React from 'react';
import HeroSection from '../components/HeroSection'; // აქაც HeroSection
import Services from '../components/Services';
import ProfessionsSlider from '../components/ProfessionsSlider';
import Slider from '../components/Slider';
import { Reveal } from '../components/animations/Reveal';


const Home = () => {
  return (
    <div className="relative min-h-screen bg-[#fdf2e9]">

      {/* ფონის ფენა - ეს მთლიანად მიჰყვება სქროლს */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">

        {/* იასამნისფერი რგოლი - ზედა სექციისთვის */}
        <div className="absolute top-150 md:top-120 -right-37 w-120 h-120 bg-purple-400/65 rounded-full blur-[120px]"></div>

        {/* ყვითელი რგოლი - სერვისების სექციის სიმაღლეზე (მაგალითად 1200px-ზე ზემოდან) */}
        <div className="absolute top-350 md:top-250 -left-5 w-75 h-75 bg-yellow-300/65 rounded-full blur-[80px]"></div>

        {/* სურვილისამებრ: მესამე რგოლი გვერდის ბოლოსკენ, რომ სიცარიელე არ დარჩეს */}
        <div className="absolute bottom-125 right-0 w-105 h-105 bg-purple-400/65 rounded-full blur-[130px]"></div>
      </div>
      {/* შენი დანარჩენი კონტენტი აქ უნდა იყოს */}
      <div className="relative z-10">
        <HeroSection />

        <Reveal>
          <Services />
        </Reveal>

        <Reveal>
          <ProfessionsSlider />
        </Reveal>
        <Reveal>
          <Slider />
        </Reveal>
      </div>
    </div>
  );
};

export default Home;