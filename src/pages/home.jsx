import React from 'react';
import HeroSection from '../components/HeroSection'; // აქაც HeroSection
import Services from '../components/Services';
import ProfessionsSlider from '../components/ProfessionsSlider';
import Slider from '../components/Slider';
import { Reveal } from '../components/animations/Reveal';


const Home = () => {
  return (
    <main>
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
    </main>
  );
};

export default Home;