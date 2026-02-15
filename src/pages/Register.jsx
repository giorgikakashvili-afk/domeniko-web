import React, { useState } from 'react';
import RegistrationStep1 from '../components/RegistrationStep1';
import RegistrationStep2 from '../components/RegistrationStep2';
import ProfileUpdate from '../components/ProfileUpdate';


import leftIllustration from '../assets/main_img/left-reg.png';
import rightIllustration from '../assets/main_img/right-reg.png';

const Register = () => {
  const [step, setStep] = useState(1);
  const [userPhone, setUserPhone] = useState('');

  const handleNextStep = (phone) => {
    setUserPhone(phone);
    setStep(2);
  };

  const handleRegistrationComplete = () => {
    setStep(3);
  };

  return (
    /* overflow-hidden და relative უზრუნველყოფს, რომ შიგთავსი ამ კონტეინერიდან არ გავა */
    <div className="relative isolate flex-1 min-h-[calc(100vh-80px)] w-full flex flex-col items-center justify-center py-10 md:py-20 overflow-hidden font-noto">
      {/* --- ფონური ელემენტები (Glow & Images) --- */}
      {/* აბსოლუტური კონტეინერი, რომელიც ფარავს მხოლოდ ამ სექციას */}
      <div className="absolute inset-0 pointer-events-none select-none" style={{ zIndex: -1 }}>
        
        {/* ვარდისფერი რგოლი - ახლა არის absolute და bottom-0, რაც ნიშნავს რომ ამ დივის ბოლოს გაჩერდება */}
        <div className="absolute bottom-[5%] right-[-5%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#ff99c0] opacity-50 blur-[100px] md:blur-[150px] rounded-full"></div>

        {/* ზედა ნათება */}
        <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-[#f3713d] opacity-15 blur-[100px] rounded-full"></div>

        {/* მარცხენა ილუსტრაცია - მიმაგრებულია ამ სექციის ბოლოზე და არა ეკრანზე */}
        <div className="hidden xl:block absolute md:left-20 2xl:left-20 bottom-0">
           <img src={leftIllustration} alt="" className="max-w-[400px] h-auto" />
           
        </div>

        {/* მარჯვენა ილუსტრაცია - ცენტრშია ამ სექციის მიმართ */}
        <div className="hidden xl:block absolute right-10 top-1/2 -translate-y-1/2">
          <img src={rightIllustration} alt="" className="max-w-[320px] h-auto" />
          <div className="w-[320px] h-[350px]" />
        </div>
      </div>

      {/* --- ძირითადი კონტენტი --- */}
      <div className="relative z-10 flex flex-col items-center w-full">
        {/* პროგრესის ინდიკატორი */}
        <div className="flex items-center gap-4 mb-12">
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex justify-center items-center font-black text-lg transition-all duration-500 ${
                step >= num 
                ? 'bg-[#f3713d] text-white shadow-xl shadow-orange-200' 
                : 'bg-white text-gray-300 border-2 border-gray-100'
              }`}>
                {num}
              </div>
              {num < 3 && (
                <div className={`w-12 md:w-20 h-1.5 rounded-full transition-all duration-500 ${
                  step > num ? 'bg-[#f3713d]' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* ფორმის კონტეინერი */}
        <div className="w-full max-w-4xl px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {step === 1 && <RegistrationStep1 onNext={handleNextStep} />}
          {step === 2 && <RegistrationStep2 phone={userPhone} onComplete={handleRegistrationComplete} />}
          {step === 3 && <ProfileUpdate />}
        </div>
      </div>

      <p className="relative z-10 mt-10 text-gray-400 text-sm font-medium"></p>
    </div>
  );
};

export default Register;