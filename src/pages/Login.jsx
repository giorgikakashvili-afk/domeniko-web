import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowUpRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; 

const Login = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth(); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const cleanPhone = phone.replace(/\D/g, '');
    const formattedPhone = cleanPhone.startsWith('995') ? cleanPhone : `995${cleanPhone}`;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch('https://rost.ge/api/login', {
        method: 'POST',
        signal: controller.signal,
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          phone: formattedPhone, 
          password: password 
        })
      });

      clearTimeout(timeoutId);
      const result = await response.json();

      if (response.ok) {
        await login(result.token); 
        
        const profileRes = await fetch('https://rost.ge/api/profile', {
          headers: { 
            'Authorization': `Bearer ${result.token}`,
            'Accept': 'application/json'
          }
        });

        if (profileRes.ok) {
          const profileData = await profileRes.json();
          
          // --- გაფართოებული ლოგიკა ---
          // ვამოწმებთ ყველა აუცილებელ ველს (სახელი, გვარი, სკოლა, კლასი)
          const isProfileComplete = 
            profileData.firstname && 
            profileData.lastname && 
            profileData.school && 
            profileData.class;

          if (isProfileComplete) {
            // თუ ყველაფერი შევსებულია, გადადის მთავარზე
            navigate('/dashboard');
          } else {
            // თუ რომელიმე (მათ შორის მე-3 ეტაპი) აკლია, გადადის ფორმაზე
            navigate('/profileupdate');
          }
        } else {
          navigate('/profileupdate');
        }
      } else {
        setError(result.message || 'ნომერი ან პაროლი არასწორია');
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        setError('სერვერმა დააგვიანა პასუხი. სცადე თავიდან.');
      } else {
        setError('კავშირი ვერ დამყარდა.');
      }
    } finally {
      setLoading(false);
    }
  };

  // JSX ნაწილი რჩება უცვლელი (სტილი დაცულია)
  return (
    <div className="min-h-screen bg-[#FFF8F1] flex flex-col items-center justify-center p-4 font-noto">
      <div className="w-full max-w-115 z-10">
        <div className="text-center mb-10">
          <h1 className="text-[#0A0521] text-4xl md:text-5xl font-black mb-4 uppercase italic tracking-tighter">
            პროფილში შესვლა
          </h1>
          <p className="text-[#0A0521]/60 font-bold text-sm uppercase tracking-wide">
            ჩაწერე შენი ტელეფონის ნომერი და პაროლი
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <span className="absolute top-3 left-6 text-[10px] font-black text-[#0A0521]/40 uppercase">ტელეფონი</span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-white pt-8 pb-4 px-8 rounded-3xl shadow-sm border-2 border-transparent focus:border-[#f3713d]/20 outline-none font-bold text-lg transition-all"
              placeholder="5 XX XX XX XX"
              required
            />
          </div>

          <div className="relative">
            <span className="absolute top-3 left-6 text-[10px] font-black text-[#0A0521]/40 uppercase">პაროლი</span>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full bg-white pt-8 pb-4 px-8 rounded-3xl shadow-sm border-2 outline-none font-bold text-lg transition-all ${error ? 'border-red-400' : 'border-transparent focus:border-[#f3713d]/20'}`}
              placeholder="**********"
              required
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-6 top-[60%] -translate-y-1/2 text-gray-400 hover:text-[#f3713d]"
            >
              {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
            </button>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-500 justify-center py-2 animate-bounce">
              <AlertCircle size={14} />
              <p className="text-[11px] font-black italic">{error}</p>
            </div>
          )}

          <div className="flex justify-center pt-6">
            <button
              type="submit"
              disabled={loading}
              className={`group pl-10 pr-4 py-4 rounded-full flex items-center gap-6 transition-all duration-500 shadow-2xl
                ${loading ? 'bg-gray-400 cursor-wait' : 'bg-[#f3713d] hover:scale-105 active:scale-95'}
              `}
            >
              <span className="font-black text-xl uppercase tracking-wider text-white">
                {loading ? 'მოწმდება...' : 'შესვლა'}
              </span>
              <div className="bg-white p-2 rounded-full flex justify-center items-center shadow-sm">
                <ArrowUpRight size={24} strokeWidth={4} className="text-[#f3713d]" />
              </div>
            </button>
          </div>
        </form>

        <div className="mt-16 text-center">
          <p className="text-[#0A0521]/40 font-black text-[10px] uppercase mb-3">არ გაქვს ანგარიში?</p>
          <button 
            onClick={() => navigate('/register')}
            className="text-[#f3713d] font-black text-sm uppercase border-b-2 border-[#f3713d] pb-1 hover:tracking-widest transition-all"
          >
            გაიარე რეგისტრაცია
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;