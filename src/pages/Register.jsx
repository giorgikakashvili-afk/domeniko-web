import React, { useState } from 'react';
import RegistrationStep1 from '../components/RegistrationStep1';
import RegistrationStep2 from '../components/RegistrationStep2';
import ProfileUpdate from '../components/ProfileUpdate';

const Register = () => {
  // ნაბიჯების მართვა: 1 - ნომერი, 2 - კოდი/პაროლი, 3 - პროფილის შევსება
  const [step, setStep] = useState(1);
  const [userPhone, setUserPhone] = useState('');

  // ფუნქცია, რომელიც Step 1-დან Step 2-ზე გადაგვიყვანს
  const handleNextStep = (phone) => {
    setUserPhone(phone);
    setStep(2);
  };

  // ფუნქცია, რომელიც Step 2-დან Step 3-ზე გადაგვიყვანს
  const handleRegistrationComplete = () => {
    setStep(3);
  };

  return (
    <div className="min-h-screen bg-[#fff4ec] py-10 md:py-20 flex flex-col items-center">
      {/* პროგრესის ინდიკატორი (1-2-3 წრეები) */}
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

      {/* კონტენტი ნაბიჯების მიხედვით */}
      <div className="w-full max-w-4xl px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {step === 1 && (
          <RegistrationStep1 onNext={handleNextStep} />
        )}
        
        {step === 2 && (
          <RegistrationStep2 
            phone={userPhone} 
            onComplete={handleRegistrationComplete} 
          />
        )}
        
        {step === 3 && (
          <ProfileUpdate />
        )}
      </div>

      {/* დამხმარე ტექსტი */}
      <p className="mt-10 text-gray-400 text-sm font-medium">
      </p>
    </div>
  );
};

export default Register;