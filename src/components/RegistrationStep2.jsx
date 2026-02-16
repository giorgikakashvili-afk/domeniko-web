import React, { useState, useRef, useEffect } from 'react';
import { Eye, EyeOff, AlertCircle, X, Check } from 'lucide-react';

const RegistrationStep2 = ({ phone, onComplete }) => {
  const [code, setCode] = useState(['', '', '', '']);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  
  const [timeLeft, setTimeLeft] = useState(19);
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [codeError, setCodeError] = useState(''); 
  const [passError, setPassError] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [hasOpenedTerms, setHasOpenedTerms] = useState(false);

  const inputRefs = useRef([]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleResendCode = async () => {
    if (!canResend) return;
    setLoading(true);
    try {
      const response = await fetch('https://rost.ge/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phone })
      });
      if (response.ok) {
        setTimeLeft(19);
        setCanResend(false);
        setCodeError('');
        setCode(['', '', '', '']);
        inputRefs.current[0].focus();
      }
    } catch (err) {
      setCodeError('სერვერთან კავშირი ვერ დამყარდა');
    } finally {
      setLoading(false);
    }
  };

  const isFilled = code.every(digit => digit !== '') && 
                   password !== '' && 
                   passwordConfirm !== '' && 
                   termsAccepted;

  const handleRegisterAttempt = (e) => {
    e.preventDefault();
    setPassError('');
    setCodeError('');

    if (password.length < 8) {
      setPassError('პაროლი უნდა შედგებოდეს მინიმუმ 8 სიმბოლოსგან');
      return;
    }
    if (password !== passwordConfirm) {
      setPassError('პაროლები არ ემთხვევა ერთმანეთს');
      return;
    }

    setShowConsentModal(true);
  };

  const executeRegistration = async (communicationValue) => {
    setShowConsentModal(false);
    setLoading(true);
    try {
      const response = await fetch('https://rost.ge/api/verify-otp-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone,
          code: code.join(''),
          password,
          password_confirmation: passwordConfirm,
          communication: communicationValue
        })
      });

      const result = await response.json();
      if (response.ok) {
        localStorage.setItem('token', result.token);
        onComplete(result.user);
      } else {
        setCodeError(result.message || 'არასწორი SMS კოდი');
      }
    } catch (err) {
      setCodeError('სერვერთან კავშირი ვერ დამყარდა');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center font-noto">
      
      {/* --- თანხმობის ფანჯარა (Consent Modal) --- */}
      {showConsentModal && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-[580px] rounded-[40px] p-10 md:p-14 text-left shadow-2xl relative">
            <h3 className="text-[#0A0521] text-2xl md:text-3xl font-black mb-6 leading-tight">
              გსურს, რომ არასდროს გამოგრჩეს შენთვის მნიშვნელოვანი სიახლეები დომენიკოსგან?
            </h3>
            <p className="text-[#0A0521] text-[14px] md:text-[15px] leading-relaxed mb-10 font-medium opacity-90">
              ვადასტურებ, რომ თანახმა ვარ, ააიპ დომენიკოსგან (ს/კ 764654752) მივიღო ინფორმაცია სიახლეების, ტესტების და მისი შედეგების, ონლაინ შეხვედრების, ვორქშოფების და სპეციალური შეთავაზებების შესახებ ელექტრონული ფოსტის, SMS-ის ან სხვა საკომუნიკაციო არხების მეშვეობით. მე გაცნობიერებული მაქვს, რომ ნებისმიერ დროს შემიძლია თანხმობის გამოხმობა.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => executeRegistration(0)}
                className="flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-full border-2 border-[#F1E9E9] text-[#0A0521] font-bold text-sm hover:bg-gray-50 transition-all"
              >
                <div className="w-6 h-6 rounded-full bg-[#A8A3B9] flex items-center justify-center text-white">
                  <Check size={14} strokeWidth={4} />
                </div>
                არ ვეთანხმები
              </button>
              
              <button 
                onClick={() => executeRegistration(1)}
                className="flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#39a935] text-white font-bold text-sm hover:bg-[#2e8b2a] transition-all shadow-lg shadow-green-200"
              >
                <div className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center text-white">
                  <Check size={14} strokeWidth={4} />
                </div>
                ვეთანხმები
              </button>
            </div>
          </div>
        </div>
      )}

      <h1 className="text-[#0A0521] text-4xl md:text-5xl font-black mb-10 text-center tracking-tight leading-tight uppercase">
        შემოუერთდი <br /> დომენიკოს
      </h1>

      <form onSubmit={handleRegisterAttempt} className="w-full max-w-[480px] space-y-7">
        
        {/* SMS სექცია */}
        <div className="space-y-3">
          <div className="flex justify-between items-center px-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">სმს კოდი</span>
            <button 
              type="button"
              onClick={handleResendCode}
              disabled={!canResend || loading}
              className={`text-[11px] font-bold flex items-center gap-1 uppercase transition-all ${
                canResend ? 'text-[#f3713d] cursor-pointer' : 'text-gray-400'
              }`}
            >
              {timeLeft > 0 ? `0:${timeLeft < 10 ? `0${timeLeft}` : timeLeft} ახალი კოდის მოთხოვნა` : "კოდის ხელახლა გაგზავნა"} ↺
            </button>
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => {
                  setCodeError('');
                  const val = e.target.value.replace(/\D/g, '');
                  if (val.length <= 1) {
                    const newCode = [...code];
                    newCode[index] = val;
                    setCode(newCode);
                    if (val && index < 3) inputRefs.current[index + 1].focus();
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Backspace' && !code[index] && index > 0) inputRefs.current[index - 1].focus();
                }}
                className={`w-full aspect-square text-center text-3xl font-bold bg-white rounded-2xl shadow-sm outline-none border-2 transition-all
                  ${codeError ? 'border-red-500 bg-red-50 text-red-600' : 'border-transparent focus:border-[#f3713d]/20 text-[#0A0521]'}
                `}
                placeholder="|"
              />
            ))}
          </div>
          {codeError && <p className="text-red-500 text-[10px] font-bold px-2 italic flex items-center gap-1"><AlertCircle size={12} /> {codeError}</p>}
        </div>

        {/* პაროლის სექცია */}
        <div className="space-y-3">
          <div className="flex justify-between items-center px-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">გამოიყენე ძლიერი პაროლი</span>
            <span className="text-[10px] text-gray-300 font-bold uppercase italic">მინიმუმ 8 სიმბოლო</span>
          </div>

          <div className="space-y-2">
            <div className="relative">
              <label className="absolute left-6 top-2 text-[8px] font-bold text-gray-400 uppercase z-10">პაროლი</label>
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => {setPassword(e.target.value); setPassError('');}}
                className={`w-full bg-white pt-7 pb-3 px-6 rounded-2xl shadow-sm outline-none border-2 transition-all text-sm font-bold
                  ${passError ? 'border-red-500 bg-red-50' : 'border-transparent focus:border-[#f3713d]/20'}
                `}
                placeholder="ჩაწერეთ თქვენი პაროლი"
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300">
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="relative">
              <label className="absolute left-6 top-2 text-[8px] font-bold text-gray-400 uppercase z-10">გაიმეორე პაროლი</label>
              <input
                type={showConfirmPass ? "text" : "password"}
                value={passwordConfirm}
                onChange={(e) => {setPasswordConfirm(e.target.value); setPassError('');}}
                className={`w-full bg-white pt-7 pb-3 px-6 rounded-2xl shadow-sm outline-none border-2 transition-all text-sm font-bold
                  ${passError ? 'border-red-500 bg-red-50' : 'border-transparent focus:border-[#f3713d]/20'}
                `}
                placeholder="ჩაწერეთ თქვენი პაროლი"
              />
              <button type="button" onClick={() => setShowConfirmPass(!showConfirmPass)} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300">
                {showConfirmPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          {passError && <p className="text-red-500 text-[10px] font-bold px-2 italic flex items-center gap-1"><AlertCircle size={12} /> {passError}</p>}
        </div>

        {/* წესები და პირობები */}
        <div className="flex items-start gap-4 px-2">
          <div 
            onClick={() => hasOpenedTerms && setTermsAccepted(!termsAccepted)}
            className={`mt-0.5 w-6 h-6 rounded-lg border-2 transition-all flex items-center justify-center shrink-0 
              ${termsAccepted ? 'bg-[#f3713d] border-[#f3713d]' : 'bg-white border-orange-100'}
              ${!hasOpenedTerms ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            {termsAccepted && <svg width="12" height="10" viewBox="0 0 12 10" fill="none"><path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
          </div>
          <p className="text-[11px] font-bold text-[#0A0521] leading-relaxed select-none">
            ვებ-გვერდზე რეგისტრაციით თქვენ ეთანხმებით <span 
              onClick={() => { setShowTermsModal(true); setHasOpenedTerms(true); }}
              className="text-[#f3713d] border-b border-[#f3713d]/30 cursor-pointer hover:opacity-80 transition-opacity"
            >წესებს და პირობებს</span>
          </p>
        </div>

        <div className="flex justify-center pt-4">
          <button
            type="submit"
            disabled={!isFilled || loading}
            className={`pl-10 pr-4 py-4 rounded-full flex items-center gap-5 transition-all duration-500 shadow-xl
              ${isFilled ? 'bg-[#f3713d] hover:bg-[#e66330] scale-105 active:scale-95' : 'bg-[#777777] opacity-80 cursor-not-allowed'}`}
          >
            <span className="font-black text-xl uppercase tracking-wider text-white">
              {loading ? 'მუშავდება...' : 'რეგისტრაცია'}
            </span>
            <div className="bg-white p-2 rounded-full flex justify-center items-center shadow-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke={isFilled ? "#f3713d" : "#777777"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>
        </div>
      </form>

      {/* --- წესების და პირობების მოდალი (თქვენი ტექსტით) --- */}
      {showTermsModal && (
        <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-[#0A0521]/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl flex flex-col relative overflow-hidden animate-in fade-in zoom-in duration-300">
            <button onClick={() => setShowTermsModal(false)} className="absolute right-8 top-8 p-2 hover:bg-gray-100 rounded-full transition-colors z-10">
              <X size={24} className="text-gray-400" />
            </button>
            <div className="p-10 flex flex-col h-full max-h-[85vh]">
              <h2 className="text-3xl font-black text-[#0A0521] uppercase mb-8 pr-12 leading-tight">ვებ-გვერდის წესები და პირობები</h2>
              <div className="overflow-y-auto pr-4 custom-scrollbar text-[15px] text-gray-600 font-medium leading-[1.8] space-y-6">
                <p>დონემიკოსთან ერთად მონაწილეობა შეგიძლია მრავალ შეხვედრაში პროფესიონალებთან, რაც დაგეხმარება გაიგო შენი ინტერესები და როგორ შეიძლება ისინი შენი კარიერის საფუძველი გახდეს. ჩააბარე ჩვენი სწრაფი ტესტი და აღმოაჩინე, რომელი სფეროები შეიძლება იყოს შენთვის ყველაზე საინტერესო. შენი ახალი თავგადასავლები იწყება აქ! ნუ დააყოვნებ, დაიწყე დღესვე და მიაწვდე საკუთარ თავს ახალ გამოწვევებზე.</p>
                <p>ჩვენი პროგრამა გთავაზობს უნიკალურ შესაძლებლობას, რომ შეხვდე სხვადასხვა სფეროს ექსპერტებს, რომლებიც მზად არიან გაგიზიარონ თავიანთი გამოცდილება და ცოდნა. შეხვედრები მოიცავს როგორც ინდივიდუალურ, ისე ჯგუფურ სესიებს, რაც საშუალებას გაძლევს, რომ უფრო ღრმად გაიგო, როგორ მუშაობს კონკრეტული ინდუსტრია და რა უნარები არის საჭირო წარმატებისთვის.</p>
                <p>ჩვენი გუნდი მუდმივად მუშაობს იმისათვის, რომ უზრუნველყოს, რომ შეხვედრები იყოს ინტერაქტიული და საინტერესო. ჩვენ გვჯერა, რომ სწავლის პროცესში აქტიური მონაწილეობა არის ყველაზე ეფექტური გზა ახალი ცოდნის მიღებისა.</p>
                <p>გარდა ამისა, ჩვენი პლატფორმა გთავაზობს სხვადასხვა რესურსებს, რომლებიც დაგეხმარება შენი კარიერის განვითარებაში. აქ ნახავთ ვებსაიტებს, ბლოგებს და ვიდეოებს, რომლებიც მოიცავს სხვადასხვა თემებს, როგორიცაა კარიერული ზრდა, პროფესიული უნარები და ინდუსტრიის ტენდენციები.</p>
                <p>ჩვენი მიზანია, რომ გაწვდოთ ყველა საჭირო ინფორმაცია და ინსტრუმენტები, რათა წარმატებით შეძლოთ თქვენი კარიერის განვითარება. ნუ დააყოვნებთ, დაიწყეთ თქვენი ახალი თავგადასავალი დღესვე!</p>
              </div>
              <div className="pt-8 mt-auto border-t border-gray-100 flex justify-center">
                <button 
                  onClick={() => { setTermsAccepted(true); setShowTermsModal(false); }}
                  className="bg-[#f3713d] text-white font-bold py-4 px-12 rounded-2xl hover:bg-[#e66330] transition-all transform active:scale-95 shadow-lg uppercase text-sm tracking-wider"
                >
                  გავეცანი და ვეთანხმები
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationStep2;