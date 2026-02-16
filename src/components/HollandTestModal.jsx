import React from 'react';
import { X, ClipboardCheck, Globe2, Lightbulb, ArrowRight, CheckCircle2 } from 'lucide-react';

const HollandTestModal = ({ isOpen, onClose, onStart }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-6 bg-[#09002f]/70 backdrop-blur-md font-noto"
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-white w-full max-w-3xl rounded-[35px] overflow-hidden relative shadow-2xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-[#fff7ed] p-6 md:p-8 border-b border-orange-100 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#f3713d] rounded-2xl flex items-center justify-center text-white shadow-lg">
              <ClipboardCheck size={24} />
            </div>
            <div>
              <h2 className="text-[#2d1b4d] font-black text-xl md:text-2xl uppercase tracking-tighter italic">
                ჰოლანდის ტესტი
              </h2>
              <p className="text-[#f3713d] text-xs font-bold uppercase tracking-widest mt-1">
                პროფესიული ორიენტაცია
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-orange-50 rounded-full transition-colors text-[#2d1b4d]/50 hover:text-[#f3713d]"
          >
            <X size={28} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-10 overflow-y-auto custom-scrollbar bg-white space-y-10">
          
          {/* Intro */}
          <section className="border-l-4 border-[#f3713d] pl-6 italic">
            <p className="text-[#2d1b4d] font-bold text-lg leading-relaxed">
              პროფესიის სწორად არჩევა ინტერესებისა და უნარების კვლევით იწყება — ეს საერთაშორისო პრაქტიკით დადასტურებული მიდგომაა.
            </p>
          </section>

          {/* რა არის ჰოლანდის ტესტი? */}
          <section>
            <h3 className="text-[#2d1b4d] font-black text-lg mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#f3713d] rounded-full inline-block"></span>
              რა არის ჰოლანდის ტესტი?
            </h3>
            <div className="text-gray-600 font-medium leading-relaxed space-y-4">
              <div className="flex items-start gap-3">
                <Globe2 className="text-blue-500 shrink-0 mt-1" size={20} />
                <p>მსოფლიოში ყველაზე აღიარებული კარიერული ორიენტაციის ინსტრუმენტი. 50+ წლის ისტორია, გამოიყენება 130+ ქვეყანაში.</p>
              </div>
              <p>აშშ-ს შრომის დეპარტამენტი RIASEC მოდელს იყენებს O*NET მონაცემთა ბაზაში. ევროპის წამყვანი კარიერული ცენტრები სწორედ ამ მეთოდოლოგიას ეფუძნება.</p>
            </div>
          </section>

          {/* რას გაიგებ? */}
          <section className="bg-gray-50 p-6 md:p-8 rounded-[30px] border border-gray-100">
            <h3 className="text-[#2d1b4d] font-black text-lg mb-6 flex items-center gap-2">
              <Lightbulb className="text-yellow-500" size={22} />
              რას გაიგებ?
            </h3>
            <p className="text-gray-600 font-bold mb-4 italic">ტესტი განსაზღვრავს შენს პროფესიულ ტიპს 6 კატეგორიიდან:</p>
            
            

            <div className="grid md:grid-cols-2 gap-4 mt-6">
              {[
                { type: "რეალისტი", desc: "პრაქტიკული, ტექნიკური საქმიანობა" },
                { type: "მკვლევარი", desc: "ანალიტიკური, სამეცნიერო მიდგომა" },
                { type: "არტისტი", desc: "შემოქმედებითი, კრეატიული სფერო" },
                { type: "სოციალური", desc: "ადამიანებთან მუშაობა, დახმარება" },
                { type: "მეწარმე", desc: "ლიდერობა, ბიზნესი, გავლენა" },
                { type: "კონვენციური", desc: "სტრუქტურა, ორგანიზება, დეტალები" }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-2 bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                  <CheckCircle2 className="text-[#f3713d] shrink-0 mt-1" size={16} />
                  <div>
                    <span className="font-black text-[#2d1b4d] text-sm block">{item.type}</span>
                    <span className="text-gray-500 text-xs font-medium">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* რატომ არის მნიშვნელოვანი? */}
          <section>
            <h3 className="text-[#2d1b4d] font-black text-lg mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#f3713d] rounded-full inline-block"></span>
              რატომ არის მნიშვნელოვანი?
            </h3>
            <div className="text-gray-600 font-medium leading-relaxed space-y-4">
              <p>ტესტი არის დიაგნოსტიკის ინსტრუმენტი — აფასებს შენს უნარებს და ინტერესებს. სწორედ ეს ფაქტორები განსაზღვრავს, რომელ პროფესიაში იქნები წარმატებული.</p>
            </div>
          </section>

        </div>

        {/* Action Button */}
        <div className="p-6 md:p-8 bg-[#fff7ed] border-t border-orange-100 text-center shrink-0">
          <button 
            onClick={onClose}
            className="group bg-[#2d1b4d] text-white px-10 py-4 rounded-2xl font-black uppercase italic tracking-tighter hover:bg-[#f3713d] transition-all shadow-lg flex items-center gap-3 mx-auto active:scale-95"
          >
            ტესტის დაწყება 
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #f3713d30; border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #f3713d; }
      `}</style>
    </div>
  );
};

export default HollandTestModal;