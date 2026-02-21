import React, { useEffect } from 'react';
import { ArrowRight, Target, Star, Compass, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WorkProcessPage = () => {
  const navigate = useNavigate();

  // გვერდზე გადასვლისას ყოველთვის თავში ავიდეს
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const steps = [
    {
      id: 1,
      title: "ვინ ხარ?",
      text: "ჰოლანდის ტესტი გეხმარება აღმოაჩინო შენი უნარები და გაიგო რომელ პროფესიაში გამოიყენო ისინი ყველაზე ეფექტურად.",
      color: "bg-[#2d1b4d]",
      icon: <Target className="w-6 h-6" />
    },
    {
      id: 2,
      title: "რა გაინტერესებს?",
      text: "Live შეხვედრები და ვორქშოპები მათთან, ვინც უკვე გაიარა ეს გზა - გეხმარება რეალურად დაინახო შენი მომავალი პროფესია.",
      color: "bg-[#2d1b4d]",
      icon: <Star className="w-6 h-6" />
    },
    {
      id: 3,
      title: "დომენიკო გირჩევს",
      text: "პერსონალური კონსულტაცია ყოველ ეტაპზე - ჩვენი გუნდი გეხმარება სწორი და გააზრებული არჩევანის გაკეთებაში.",
      color: "bg-[#f3713d]",
      icon: <Compass className="w-6 h-6" />
    },
    {
      id: 4,
      title: "აირჩიე გზა",
      text: "უმაღლესი თუ პროფესიული - ორივეს თანაბრად წარმოგიდგენთ. ჩვენი მიზანია გაგიმარტივოთ ინფორმირებული არჩევანის გაკეთება!",
      color: "bg-[#f3713d]",
      icon: <CheckCircle2 className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-[#fff4ec] font-noto pb-20">
      
      {/* 1. Hero სექცია - მუქი ლურჯი "ქუდი" */}
      <div className="bg-[#09002f] py-24 px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-[#f3713d] rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#2d1b4d] rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-white text-4xl md:text-6xl font-black leading-tight mb-6 uppercase italic">
            გაიცანი პროფესიები <br /> იპოვე შენი
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            პროფესიის არჩევა რთულია. დომენიკო გეხმარება ამ გზაზე ნავიგაციაში და გაძლევს ინსტრუმენტებს წარმატებისთვის.
          </p>
        </div>
      </div>

      {/* 2. ნაბიჯები - 2 სვეტად (Grid) */}
      <div className="max-w-6xl mx-auto px-4 -mt-12 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step) => (
            <div 
              key={step.id} 
              className="bg-white p-10 rounded-[45px] shadow-xl shadow-black/5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-white group"
            >
              <div className={`w-16 h-16 ${step.color} text-white rounded-[20px] flex items-center justify-center mb-8 shadow-lg group-hover:rotate-6 transition-transform`}>
                {step.icon}
              </div>
              <div className="flex items-center gap-4 mb-6">
                <span className={`text-5xl font-black opacity-10 ${step.id > 2 ? 'text-[#f3713d]' : 'text-[#2d1b4d]'}`}>
                  0{step.id}
                </span>
                <h3 className={`text-2xl font-black uppercase tracking-tight ${step.id > 2 ? 'text-[#f3713d]' : 'text-[#2d1b4d]'}`}>
                  {step.title}
                </h3>
              </div>
              <p className="text-gray-500 text-lg leading-relaxed font-medium">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. CTA ბლოკი რეგისტრაციისთვის */}
      <div className="max-w-4xl mx-auto px-4 mt-24 text-center">
        <div className="bg-white p-12 md:p-20 rounded-[60px] shadow-2xl relative overflow-hidden border border-white">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#f3713d]/5 rounded-bl-full"></div>
          
          <h2 className="text-3xl md:text-5xl font-black text-[#2d1b4d] mb-8 uppercase tracking-tighter italic">
            მზად ხარ დაიწყო?
          </h2>
          <p className="text-gray-500 mb-12 text-xl font-medium max-w-lg mx-auto leading-relaxed">
            შემოუერთდი დომენიკოს საზოგადოებას და დაიწყე შენი პროფესიული თავგადასავალი დღესვე.
          </p>
          
          <button 
            onClick={() => navigate('/login')}
            className="w-full md:w-auto px-16 bg-[#f3713d] hover:bg-[#d95d2d] text-white py-6 rounded-3xl font-black flex items-center justify-center gap-4 transition-all shadow-xl shadow-[#f3713d]/20 hover:scale-105 active:scale-95 text-xl cursor-pointer mx-auto uppercase tracking-wide"
          >
            შემოუერთდი ახლავე
            <ArrowRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkProcessPage;