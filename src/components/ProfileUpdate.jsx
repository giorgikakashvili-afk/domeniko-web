import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ChevronDown, Clock } from 'lucide-react'; // დავამატეთ Clock
import bgphoto from '../assets/main_img/followtodomenico.jpg';

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

  const staticClasses = [
    { id: '11', name: '11' },
    { id: '12', name: '12' }
  ];

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const [profileRes, citiesRes] = await Promise.all([
          fetch('https://rost.ge/api/profile', { headers: { 'Authorization': `Bearer ${token}` } }),
          fetch('https://rost.ge/api/cities')
        ]);
        
        const profileData = await profileRes.json();
        const citiesData = await citiesRes.json();

        setCities(Array.isArray(citiesData) ? citiesData : (citiesData.data || []));

        if (profileRes.ok) {
          const fetchedUser = profileData.data || profileData;

          setFormData({
            firstname: fetchedUser.firstname || '',
            lastname: fetchedUser.lastname || '',
            city_id: fetchedUser.city_id || '',
            school: fetchedUser.school || '',
            class: fetchedUser.class || ''
          });

          if (fetchedUser.firstname && fetchedUser.lastname && fetchedUser.class && fetchedUser.school) {
            setStep(4);
          } else if (fetchedUser.firstname && fetchedUser.lastname) {
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
        minutes: Math.floor((difference / 1000 / 60) % 60)
      };
    }
    return { days: 0, hours: 0, minutes: 0 };
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
      if (response.ok) {
        setStep(4);
      } else {
        setError('ვერ მოხერხდა მონაცემების შენახვა');
      }
    } catch (err) {
      setError('სერვერთან კავშირი გაწყდა');
    } finally {
      setLoading(false);
    }
  };

  if (loading && step !== 4) {
    return <div className="min-h-screen flex items-center justify-center font-noto font-black italic">იტვირთება...</div>;
  }

  // --- მე-4 ეტაპი (მისალმება) ---
  if (step === 4) {
    return (
      <div className=" flex flex-col items-center justify-center p-4 font-noto">
        <div className="w-full max-w-[900px] bg-white rounded-[40px] overflow-hidden shadow-2xl relative animate-in fade-in duration-700">
          <div className="w-full h-[300px] md:h-[400px] bg-gray-100 flex items-center justify-center">
             <img 
               src={bgphoto}
               alt="Domeniko" 
               className="w-full h-full object-cover"
             />
          </div>

          <div className="p-8 md:p-12 text-center">
            <h1 className="text-[#0A0521] text-4xl md:text-5xl font-black uppercase mb-6 tracking-tight">
              გამარჯობა, {formData.firstname}
            </h1>

            <div className="space-y-2 mb-10 text-[#0A0521] text-lg font-medium max-w-2xl mx-auto">
              <p>კეთილი იყოს შენი პირველი შეხვედრა დომენიკოსთან, ჩვენ ერთად აღმოვაჩენთ შესაძლებობებს.</p>
              <p className="font-black">დაელოდე პირველ კომუნიკაციას დომენიკოსგან.</p>
              <p className="text-[#f3713d] font-black uppercase text-sm">შენს პროფილში პირველი ეტაპი 1 მარტს გაჩნდება.</p>
            </div>

            <div className="inline-flex items-center gap-3 border-2 border-[#f3713d]/30 px-8 py-4 rounded-full bg-orange-50/50">
              <Clock className="text-[#f3713d]" size={20} />
              <span className="text-[#0A0521] text-xl font-black tabular-nums">
                {timeLeft.days} დღე, {timeLeft.hours} საათი, {timeLeft.minutes} წუთი
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- ფორმის ეტაპები (1 და 3) ---
  return (
    <div className="min-h-screen bg-[#FFF4EC] relative flex flex-col items-center justify-center font-noto px-4 overflow-hidden">
      <div className="z-10 w-full max-w-[480px] text-center">
        <div className="mb-10">
          <h1 className="text-[#0A0521] text-4xl md:text-5xl font-black uppercase italic leading-[0.9] tracking-tighter">უკეთ გავიცნოთ</h1>
          <h1 className="text-[#0A0521] text-4xl md:text-5xl font-black uppercase italic leading-[1.2] tracking-tighter">ერთმანეთი</h1>
        </div>

        <div className="space-y-3">
          {step === 1 && (
            <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4">
              <div className="relative text-left">
                <label className="absolute left-6 top-2 text-[8px] font-bold text-gray-400 uppercase z-10">სახელი</label>
                <input
                  type="text"
                  value={formData.firstname}
                  onChange={(e) => setFormData({...formData, firstname: e.target.value})}
                  className="w-full bg-white pt-7 pb-3 px-6 rounded-2xl shadow-sm border-2 border-transparent focus:border-[#f3713d]/20 outline-none font-bold text-[#0A0521]"
                  placeholder="ჩაწერე სახელი"
                />
              </div>
              <div className="relative text-left">
                <label className="absolute left-6 top-2 text-[8px] font-bold text-gray-400 uppercase z-10">გვარი</label>
                <input
                  type="text"
                  value={formData.lastname}
                  onChange={(e) => setFormData({...formData, lastname: e.target.value})}
                  className="w-full bg-white pt-7 pb-3 px-6 rounded-2xl shadow-sm border-2 border-transparent focus:border-[#f3713d]/20 outline-none font-bold text-[#0A0521]"
                  placeholder="ჩაწერე გვარი"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4">
              <div className="relative text-left">
                <label className="absolute left-6 top-2 text-[8px] font-bold text-gray-400 uppercase z-10">ქალაქი</label>
                <select 
                  value={formData.city_id}
                  onChange={(e) => setFormData({...formData, city_id: e.target.value})}
                  className="w-full bg-white pt-7 pb-3 px-6 rounded-2xl shadow-sm border-2 border-transparent focus:border-[#f3713d]/20 outline-none font-bold text-[#0A0521] appearance-none"
                >
                  <option value="">აირჩიე ქალაქი</option>
                  {cities.map(city => (
                    <option key={city.id} value={city.id}>{city.name}</option>
                  ))}
                </select>
                <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
              </div>

              <div className="relative text-left">
                <label className="absolute left-6 top-2 text-[8px] font-bold text-gray-400 uppercase z-10">სკოლა</label>
                <input
                  type="text"
                  value={formData.school}
                  onChange={(e) => setFormData({...formData, school: e.target.value})}
                  className="w-full bg-white pt-7 pb-3 px-6 rounded-2xl shadow-sm border-2 border-transparent focus:border-[#f3713d]/20 outline-none font-bold text-[#0A0521]"
                  placeholder="მაგ: 175-ე საჯარო სკოლა"
                />
              </div>

              <div className="relative text-left">
                <label className="absolute left-6 top-2 text-[8px] font-bold text-gray-400 uppercase z-10">კლასი</label>
                <select 
                  value={formData.class}
                  onChange={(e) => setFormData({...formData, class: e.target.value})}
                  className="w-full bg-white pt-7 pb-3 px-6 rounded-2xl shadow-sm border-2 border-transparent focus:border-[#f3713d]/20 outline-none font-bold text-[#0A0521] appearance-none"
                >
                  <option value="">აირჩიე კლასი</option>
                  {staticClasses.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
              </div>
            </div>
          )}

          {error && <p className="text-red-500 text-[11px] font-bold mt-2">{error}</p>}

          <div className="pt-8">
            <button 
              onClick={step === 1 ? () => setStep(3) : handleFinalSubmit}
              disabled={!isStepValid() || loading}
              className={`group pl-10 pr-4 py-4 rounded-full flex items-center gap-8 mx-auto transition-all duration-500 shadow-xl
                ${isStepValid() && !loading ? 'bg-[#f3713d] hover:scale-105 shadow-orange-200' : 'bg-gray-300 opacity-70 cursor-not-allowed'}`}
            >
              <span className="font-black text-xl uppercase text-white">
                {loading ? 'იცადეთ...' : (step === 3 ? 'დასრულება' : 'გაგრძელება')}
              </span>
              <div className="bg-white p-2 rounded-full text-[#f3713d]">
                <ArrowUpRight size={24} strokeWidth={4} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;