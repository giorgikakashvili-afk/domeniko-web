import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';

const ProfileUpdate = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    city_id: '',
    school: '',
    class: ''
  });
  
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // კლასების ფიქსირებული ჩამონათვალი
  const staticClasses = [
    { id: '11', name: '11' },
    { id: '12', name: '12' }
  ];

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        // მხოლოდ პროფილის და ქალაქების წამოღება
        const [profileRes, citiesRes] = await Promise.all([
          fetch('https://rost.ge/api/profile', { headers: { 'Authorization': `Bearer ${token}` } }),
          fetch('https://rost.ge/api/cities')
        ]);
        
        const profileData = await profileRes.json();
        const citiesData = await citiesRes.json();

        // ქალაქების დასმა (ამოწმებს .data სტრუქტურასაც ყოველი შემთხვევისთვის)
        setCities(Array.isArray(citiesData) ? citiesData : (citiesData.data || []));

        if (profileRes.ok) {
          // თუ API-ს პასუხი ობიექტშია (მაგ. {data: {...}}), ვიღებთ შიგნიდან
          const user = profileData.data || profileData;

          setFormData({
            firstname: user.firstname || '',
            lastname: user.lastname || '',
            city_id: user.city_id || '',
            school: user.school || '',
            class: user.class || ''
          });

          // ავტომატური გადასვლა ეტაპებზე
          if (user.firstname && user.lastname && user.class && user.school) {
            setStep(4);
          } else if (user.firstname && user.lastname) {
            setStep(3); 
          }
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    if (step === 4) {
      const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
      return () => clearInterval(timer);
    }
  }, [step]);

  const isStepValid = () => {
    if (step === 1) return formData.firstname.trim() !== '' && formData.lastname.trim() !== '';
    if (step === 3) return formData.city_id !== '' && formData.school.trim() !== '' && formData.class !== '';
    return true;
  };

  const handleFinalSubmit = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('https://rost.ge/api/profile/update', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) setStep(4);
      else setError('ვერ მოხერხდა მონაცემების შენახვა');
    } catch (err) {
      setError('სერვერთან კავშირი გაწყდა');
    } finally {
      setLoading(false);
    }
  };

  if (loading && step !== 4) {
    return <div className="min-h-screen flex items-center justify-center bg-[#FFF4EC] font-noto font-black italic">იტვირთება...</div>;
  }

  if (step === 4) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 font-noto">
      {/* მთავარი კონტეინერი (ბარათი) */}
      <div className="w-full max-w-[900px] bg-white rounded-[40px] overflow-hidden shadow-2xl relative">
        
        {/* ზედა სურათის სექცია */}
        <div className="w-full h-[300px] md:h-[450px] relative">
          <img 
            src="/path-to-your-illustration.jpg" // აქ ჩასვი შენი ფოტოს მისამართი
            alt="Domeniko Illustration" 
            className="w-full h-full object-cover"
          />
          
        </div>

        {/* ტექსტური სექცია */}
        <div className="p-8 md:p-16 text-center">
          <h1 className="text-[#0A0521] text-4xl md:text-5xl font-black uppercase mb-8 tracking-tight">
            გამარჯობა, {user?.firstname || ''}
          </h1>

          <div className="space-y-2 mb-10 text-[#0A0521] text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
            <p>კეთილი იყოს შენი პირველი შეხვედრა დომენიკოსთან, ჩვენ ერთად აღმოვაჩენთ შესაძლებლობებს.</p>
            <p className="font-black">დაელოდე პირველ კომუნიკაციას დომენიკოსგან.</p>
            <p className="text-[#f3713d] font-black">შენს პროფილში პირველი ეტაპი 1 მარტს გაჩნდება</p>
          </div>

          {/* ტაიმერის ღილაკი (Capsule) */}
          <div className="inline-flex items-center gap-3 border-2 border-[#f3713d]/30 px-8 py-4 rounded-full bg-orange-50/30 shadow-sm">
            <div className="w-10 h-10 bg-[#f3713d]/10 rounded-full flex items-center justify-center">
              <Clock className="text-[#f3713d]" size={20} />
            </div>
            <span className="text-[#0A0521] text-xl font-black tabular-nums">
              {timeLeft.days} დღე, {timeLeft.hours} საათი, {timeLeft.minutes} წუთი
            </span>
          </div>
        </div>
      </div>
    </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF4EC] relative flex flex-col items-center justify-center font-noto overflow-hidden px-4">
      <div className="hidden lg:block absolute left-0 bottom-0 w-[25%] h-[60%] opacity-10 pointer-events-none bg-no-repeat bg-contain bg-left-bottom" style={{ backgroundImage: 'url("/left-hero.png")' }}></div>
      <div className="hidden lg:block absolute right-5 bottom-10 w-[20%] h-[50%] opacity-10 pointer-events-none bg-no-repeat bg-contain bg-right-bottom" style={{ backgroundImage: 'url("/right-hero.png")' }}></div>

      <div className="z-10 w-full max-w-[480px] text-center">
        <div className="mb-10">
          <h1 className="text-[#0A0521] text-4xl md:text-5xl font-black uppercase italic leading-[0.9] tracking-tighter">უკეთ გავიცნოთ</h1>
          <h1 className="text-[#0A0521] text-4xl md:text-5xl font-black uppercase italic leading-[1.2] tracking-tighter">ერთმანეთი</h1>
          <p className="text-[#0A0521]/40 font-black text-[10px] uppercase mt-4 tracking-widest">შეავსე პირადი ინფორმაცია</p>
        </div>

        <div className="space-y-3">
          {step === 1 && (
            <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
              <div className="relative text-left">
                <span className="absolute left-6 top-3 text-[10px] font-black text-gray-400 uppercase">სახელი</span>
                <input
                  type="text"
                  value={formData.firstname}
                  onChange={(e) => setFormData({...formData, firstname: e.target.value})}
                  className="w-full bg-white rounded-2xl pt-8 pb-3 px-6 shadow-sm border border-transparent focus:border-[#f3713d]/20 outline-none font-bold text-[#0A0521]"
                  placeholder="ჩაწერე სახელი"
                />
              </div>
              <div className="relative text-left">
                <span className="absolute left-6 top-3 text-[10px] font-black text-gray-400 uppercase">გვარი</span>
                <input
                  type="text"
                  value={formData.lastname}
                  onChange={(e) => setFormData({...formData, lastname: e.target.value})}
                  className="w-full bg-white rounded-2xl pt-8 pb-3 px-6 shadow-sm border border-transparent focus:border-[#f3713d]/20 outline-none font-bold text-[#0A0521]"
                  placeholder="ჩაწერე გვარი"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
              <div className="relative text-left">
                <span className="absolute left-6 top-3 text-[10px] font-black text-gray-400 uppercase z-10">ქალაქი</span>
                <select 
                  value={formData.city_id}
                  onChange={(e) => setFormData({...formData, city_id: e.target.value})}
                  className="w-full bg-white rounded-xl pt-8 pb-3 px-6 shadow-sm border border-gray-100 outline-none font-bold text-[#0A0521] appearance-none cursor-pointer"
                >
                  <option value="">აირჩიე ქალაქი</option>
                  {cities.map(city => (
                    <option key={city.id} value={city.id}>{city.name}</option>
                  ))}
                </select>
                <ChevronDown size={18} className="absolute right-6 top-7 text-gray-400 pointer-events-none" />
              </div>

              <div className="relative text-left">
                <span className="absolute left-6 top-3 text-[10px] font-black text-gray-400 uppercase">სკოლა</span>
                <input
                  type="text"
                  value={formData.school}
                  onChange={(e) => setFormData({...formData, school: e.target.value})}
                  className="w-full bg-white rounded-xl pt-8 pb-3 px-6 shadow-sm border border-[#f3713d]/10 outline-none font-bold text-[#0A0521]"
                  placeholder="მაგ: 175-ე საჯარო სკოლა"
                />
              </div>

              <div className="relative text-left">
                <span className="absolute left-6 top-3 text-[10px] font-black text-gray-400 uppercase z-10">კლასი</span>
                <select 
                  value={formData.class}
                  onChange={(e) => setFormData({...formData, class: e.target.value})}
                  className="w-full bg-white rounded-xl pt-8 pb-3 px-6 shadow-sm border border-gray-100 outline-none font-bold text-[#0A0521] appearance-none cursor-pointer"
                >
                  <option value="">აირჩიე კლასი</option>
                  {staticClasses.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                <ChevronDown size={18} className="absolute right-6 top-7 text-gray-400 pointer-events-none" />
              </div>
              <button onClick={() => setStep(1)} className="text-[10px] font-black text-gray-400 underline uppercase tracking-widest block mx-auto mt-2">უკან დაბრუნება</button>
            </div>
          )}

          {error && <p className="text-red-500 text-[11px] font-black italic">{error}</p>}

          <div className="pt-6">
            <button 
              onClick={step === 1 ? () => setStep(3) : handleFinalSubmit}
              disabled={!isStepValid() || loading}
              className={`group pl-10 pr-4 py-4 rounded-full flex items-center gap-8 mx-auto transition-all duration-300 shadow-2xl
                ${isStepValid() && !loading 
                  ? 'bg-[#f3713d] hover:scale-105 active:scale-95 shadow-orange-200' 
                  : 'bg-gray-300 shadow-none cursor-not-allowed opacity-80'}`}
            >
              <span className="font-black text-xl uppercase tracking-tighter text-white">
                {loading ? 'იცადეთ...' : (step === 3 ? 'დასრულება' : 'გაგრძელება')}
              </span>
              <div className={`p-2 rounded-full transition-colors ${isStepValid() ? 'bg-white text-[#f3713d]' : 'bg-white/50 text-gray-400'}`}>
                <ArrowUpRight size={26} strokeWidth={4} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;