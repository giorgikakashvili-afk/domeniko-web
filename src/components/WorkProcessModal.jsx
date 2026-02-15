import React from 'react';
import { X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // დაამატეთ ეს იმპორტი

const WorkProcessModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate(); // ჰუკის ინიციალიზაცია

  if (!isOpen) return null;

  const handleJoinClick = () => {
    onClose(); // ჯერ ვხურავთ მოდალს
    navigate('/login'); // შემდეგ გადავდივართ ლოგინის გვერდზე
  };

  const steps = [
    {
      id: 1,
      title: "ვინ ხარ?",
      text: "ჰოლანდის ტესტი გეხმარება აღმოაჩინო შენი უნარები და გაიგო რომელ პროფესიაში გამოიყენო",
      color: "bg-[#2d1b4d]"
    },
    {
      id: 2,
      title: "რა გაინტერესებს?",
      text: "Live შეხვედრები და ვორქშოპები მათთან, ვინც უკვე გაიარა ეს გზა — გეხმარება კარგად გაიცნო პროფესიები",
      color: "bg-[#2d1b4d]"
    },
    {
      id: 3,
      title: "დომენიკო გირჩევს",
      text: "პერსონალური კონსულტაცია ყოველ ეტაპზე — გეხმარება სწორი არჩევანის გაკეთებაში",
      color: "bg-[#f3713d]"
    },
    {
      id: 4,
      title: "აირჩიე გზა",
      text: "უმაღლესი თუ პროფესიული — ორივეს თანაბრად წარმოგიდგენთ. შესაძლებლობაა გააკეთო ინფორმირებული არჩევანი!",
      color: "bg-[#f3713d]"
    }
  ];

  return (
    <div 
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm font-noto"
      onClick={onClose} // ბექდროპზე დაჭერითაც რომ დაიხუროს
    >
      <div 
        className="bg-white w-full max-w-[500px] rounded-[30px] overflow-hidden relative shadow-2xl animate-in fade-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()} // მოდალზე დაჭერისას რომ არ დაიხუროს
      >
        
        {/* Header Section */}
        <div className="bg-gradient-to-b from-[#1a134d] to-[#2d1b4d] p-10 text-center relative">
          <button onClick={onClose} className="absolute right-6 top-6 text-white/50 hover:text-white transition-colors">
            <X size={24} />
          </button>
          <span className="text-white/60 text-sm font-bold uppercase tracking-widest mb-2 block">დომენიკო</span>
          <h2 className="text-white text-2xl md:text-3xl font-black leading-tight">
            თანამგზავრი მომავალი <br /> "მე"-ს ძიებაში
          </h2>
        </div>

        {/* Content Section */}
        <div className="p-8 md:p-10">
          <p className="text-gray-500 text-center mb-10 font-medium">
            პროფესიის არჩევა რთულია. დომენიკო გეხმარება ამ გზაზე ნავიგაციაში.
          </p>

          <div className="space-y-8 relative">
            <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-gray-100 -z-0" />

            {steps.map((step) => (
              <div key={step.id} className="flex gap-6 relative z-10">
                <div className={`shrink-0 w-10 h-10 ${step.color} text-white rounded-full flex items-center justify-center font-black text-lg shadow-lg`}>
                  {step.id}
                </div>
                <div>
                  <h3 className={`font-black text-lg mb-1 ${step.id > 2 ? 'text-[#f3713d]' : 'text-[#2d1b4d]'}`}>
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-medium">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <div className="mt-12 text-center">
            <button 
              onClick={handleJoinClick} // ფუნქციის გამოძახება
              className="w-full bg-[#f3713d] hover:bg-[#d95d2d] text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3 transition-all shadow-lg hover:scale-[1.02] active:scale-95 text-lg cursor-pointer"
            >
              შემოუერთდი დომენიკოს
              <ArrowRight size={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkProcessModal;