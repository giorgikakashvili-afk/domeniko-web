import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Clock } from 'lucide-react';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) { navigate('/login'); return; }
      try {
        const response = await fetch('https://rost.ge/api/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        setUser(data);
      } catch (err) { console.error(err); } finally { setLoading(false); }
    };
    fetchProfile();
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 60000); // წუთში ერთხელ განახლება საკმარისია
    return () => clearInterval(timer);
  }, [navigate]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#f3f4f6] font-noto italic">იტვირთება...</div>;

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
};

export default Dashboard;