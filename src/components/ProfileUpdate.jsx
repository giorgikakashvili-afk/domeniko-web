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
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 1. მონაცემების და სიების ჩატვირთვა ბაზიდან
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const [profileRes, citiesRes, classesRes] = await Promise.all([
          fetch('https://rost.ge/api/profile', { headers: { 'Authorization': `Bearer ${token}` } }),
          fetch('https://rost.ge/api/cities'),
          fetch('https://rost.ge/api/classes')
        ]);
        
        const profileData = await profileRes.json();
        const citiesData = await citiesRes.json();
        const classesData = await classesRes.json();

        setCities(citiesData);
        setClasses(classesData);

        if (profileRes.ok) {
          setFormData({
            firstname: profileData.firstname || '',
            lastname: profileData.lastname || '',
            city_id: profileData.city_id || '',
            school: profileData.school || '',
            class: profileData.class || ''
          });

          // ავტომატური გადასვლა ეტაპებს შორის არსებული მონაცემების მიხედვით
          if (profileData.firstname && profileData.lastname && profileData.class && profileData.school) {
            setStep(4);
          } else if (profileData.firstname && profileData.lastname) {
            setStep(3); 
          }
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError('მონაცემების წამოღება ვერ მოხერხდა');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 2. ტაიმერის ლოგიკა
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

  // 3. ვალიდაციის შემოწმება
  const isStepValid = () => {
    if (step === 1) return formData.firstname.trim() !== '' && formData.lastname.trim() !== '';
    if (step === 3) return formData.city_id !== '' && formData.school.trim() !== '' && formData.class !== '';
    return true;
  };

  // 4. მონაცემების შენახვა [cite: 48]
  const handleFinalSubmit = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('https://rost.ge/api/profile/update', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // [cite: 9]
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData) // [cite: 50]
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

  // მე-4 ეტაპი: მილოცვა და ტაიმერი
  if (step === 4) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-[#FFF4EC] font-noto">
        <div className="max-w-2xl bg-white p-12 rounded-[50px] shadow-2xl relative animate-in fade-in duration-700">
          <h1 className="text-[#0A0521] text-4xl font-black mb-8 uppercase italic leading-tight">
            გამარჯობა, <span className="text-[#f3713d]">{formData.firstname}</span>!
          </h1>
          <div className="space-y-4 text-[#0A0521] text-lg font-bold mb-10">
            <p>კეთილი იყოს შენი პირველი შეხვედრა დომენიკოსთან.</p>
            <p className="text-[#f3713d] font-black italic">პირველი ეტაპი 1 მარტს გაჩნდება</p>
          </div>
          <div className="flex gap-4 md:gap-6 justify-center items-center bg-gray-50 py-8 px-4 rounded-[30px]">
            {[{l:'დღე',v:timeLeft.days}, {l:'საათი',v:timeLeft.hours}, {l:'წუთი',v:timeLeft.minutes}, {l:'წამი',v:timeLeft.seconds}].map((t, i) => (
              <React.Fragment key={t.l}>
                <div className="flex flex-col min-w-[60px]">
                  <span className="text-4xl md:text-5xl font-black text-[#0A0521] tabular-nums">{String(t.v).padStart(2, '0')}</span>
                  <span className="text-[9px] font-black uppercase text-gray-400 mt-1">{t.l}</span>
                </div>
                {i < 3 && <span className="text-2xl font-black text-[#f3713d] mb-4">:</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF4EC] relative flex flex-col items-center justify-center font-noto overflow-hidden px-4">
      {/* დეკორატიული სილუეტები */}
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
              {/* ქალაქი - დინამიური სია ბაზიდან */}
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

              {/* სკოლა - ტექსტური ველი */}
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

              {/* კლასი - დინამიური სია ბაზიდან */}
              <div className="relative text-left">
                <span className="absolute left-6 top-3 text-[10px] font-black text-gray-400 uppercase z-10">კლასი</span>
                <select 
                  value={formData.class}
                  onChange={(e) => setFormData({...formData, class: e.target.value})}
                  className="w-full bg-white rounded-xl pt-8 pb-3 px-6 shadow-sm border border-gray-100 outline-none font-bold text-[#0A0521] appearance-none cursor-pointer"
                >
                  <option value="">აირჩიე კლასი</option>
                  {classes.map(c => (
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