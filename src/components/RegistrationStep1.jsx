import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrationStep1 = ({ onNext }) => {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // ვამოწმებთ, არის თუ არა ნომერი სრულყოფილად შეყვანილი (მაგ. 9 ციფრი)
  // თუ მხოლოდ 5-იანით იწყებ, phone.length === 9 იყოს პირობა
  const isPhoneValid = phone.length === 9;

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!isPhoneValid) return;

    setLoading(true);
    setError('');

    // ფორმატირება API-სთვის
    const formattedPhone = `995${phone}`;

    try {
      const response = await fetch('https://rost.ge/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formattedPhone })
      });

      const result = await response.json();

      if (response.ok) {
        onNext(formattedPhone);
      } else {
        setError(result.message || 'შეცდომა კოდის გაგზავნისას');
      }
    } catch (err) {
      setError('სერვერთან კავშირი ვერ დამყარდა');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center font-noto py-10">
      <h1 className="text-[#0A0521] text-4xl md:text-5xl font-black mb-4 text-center tracking-tight leading-tight uppercase">
        შემოუერთდი <br /> დომენიკოს
      </h1>
      
      <p className="text-[#0A0521]/60 font-medium mb-12 text-center text-sm md:text-base">
        რეგისტრაციისთვის ტელეფონის ნომერი დაგჭირდება
      </p>

      <form onSubmit={handleSendOTP} className="w-full max-w-[450px] flex flex-col items-center">
        <div className="w-full relative mb-10">
          {/* Label რომელიც სურათზეა */}
          <label className="absolute left-6 top-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            ტელეფონი
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => {
              // მხოლოდ ციფრების ნებადართვა და მაქსიმუმ 9 სიმბოლო
              const val = e.target.value.replace(/\D/g, '');
              if (val.length <= 9) setPhone(val);
            }}
            className="w-full bg-white pt-8 pb-4 px-6 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.03)] outline-none text-xl font-bold text-[#0A0521] placeholder:text-gray-300"
            placeholder="5 XX XX XX XX"
            required
          />
        </div>

        {error && <p className="text-red-500 text-xs font-bold mb-4 italic">{error}</p>}

        {/* ღილაკი რომელიც იცვლის ფერს */}
        <button
          type="submit"
          disabled={!isPhoneValid || loading}
          className={`pl-10 pr-4 py-4 rounded-full flex items-center gap-5 transition-all duration-300 group shadow-lg
            ${isPhoneValid 
              ? 'bg-[#f3713d] hover:bg-[#e66330] cursor-pointer' 
              : 'bg-[#777777] cursor-not-allowed opacity-90'
            }`}
        >
          <span className="font-black text-xl uppercase tracking-wider text-white">
            {loading ? 'გაგზავნა...' : 'გაგრძელება'}
          </span>
          <div className="bg-white p-2 rounded-full flex justify-center items-center">
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 17L17 7M17 7H7M17 7V17" 
                  stroke={isPhoneValid ? "#f3713d" : "#777777"} 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"/>
             </svg>
          </div>
        </button>

        <div className="mt-12 text-center">
          <p className="text-[#0A0521]/40 font-bold text-sm mb-4 italic">გაქვს ანგარიში?</p>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-[#f3713d] font-black uppercase text-lg pb-0.5 hover:opacity-70 transition-all"
          >
            გაიარე ავტორიზაცია
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationStep1;