import React from 'react';
import { X, Heart, Target, Users, Sparkles, Quote } from 'lucide-react';

const AboutModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-6 bg-[#2d1b4d]/60 backdrop-blur-md font-noto"
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-white w-full max-w-3xl rounded-[35px] overflow-hidden relative shadow-2xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-[#f5f3ff] p-6 md:p-8 border-b border-purple-100 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#2d1b4d] rounded-2xl flex items-center justify-center text-white shadow-lg">
              <Sparkles size={24} />
            </div>
            <div>
              <h2 className="text-[#2d1b4d] font-black text-xl md:text-2xl uppercase tracking-tighter italic">
                ჩვენ შესახებ
              </h2>
              <p className="text-purple-600 text-xs font-bold uppercase tracking-widest mt-1">
                16.02.2026
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-purple-50 rounded-full transition-colors text-[#2d1b4d]/50 hover:text-purple-600"
          >
            <X size={28} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-10 overflow-y-auto custom-scrollbar bg-white space-y-10">
          
          {/* რატომ ვარსებობთ */}
          <section>
            <h3 className="text-[#2d1b4d] font-black text-lg mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-purple-500 rounded-full inline-block"></span>
              რატომ ვარსებობთ
            </h3>
            <div className="text-gray-600 font-medium leading-relaxed">
              <p>საქართველოში ათასობით ახალგაზრდა პროფესიას ინფორმაციის გარეშე ირჩევს. ჩვენ ეს გზა თავად გავიარეთ — ვიცით რამდენად რთულია და საკუთარ პასუხისმგებლობად მივიჩნევთ, რომ დავეხმაროთ.</p>
            </div>
          </section>

          {/* ვინ ვართ */}
          <section>
            <h3 className="text-[#2d1b4d] font-black text-lg mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-purple-500 rounded-full inline-block"></span>
              ვინ ვართ
            </h3>
            <div className="text-gray-600 font-medium leading-relaxed">
              <p>დომენიკო ჯგუფი აერთიანებს განათლების, ბიზნესის და სხვადასხვა სფეროს გამოცდილ პროფესიონალებს. ჩვენი მიზანი მარტივია — დავეხმაროთ ახალგაზრდებს საკუთარი პოტენციალის საუკეთესოდ გამოყენებაში.</p>
            </div>
          </section>

          {/* რას ვქმნით */}
          <section>
            <h3 className="text-[#2d1b4d] font-black text-lg mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-purple-500 rounded-full inline-block"></span>
              რას ვქმნით
            </h3>
            <div className="text-gray-600 font-medium leading-relaxed">
              <p>მოძრაობას, რომელშიც შემდგარი ადამიანები გამოცდილებას უზიარებენ ახალგაზრდებს — ტესტირებით, ლექციებითა და მასტერკლასებით, შეხვედრებითა და პერსონალური კონსულტაციით.</p>
            </div>
          </section>

          {/* ჩვენ გვჯერა */}
          <section>
            <h3 className="text-[#2d1b4d] font-black text-lg mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-purple-500 rounded-full inline-block"></span>
              ჩვენ გვჯერა
            </h3>
            <div className="text-gray-600 font-medium leading-relaxed">
              <p>ავაშენებთ კულტურას, სადაც შემდგარი ადამიანები ახალგაზრდებს ეხმარებიან გამოცდილების გაზიარებით — და ეს ნორმა იქნება, არა გამონაკლისი.</p>
            </div>
          </section>

          {/* სამოსელი პირველი მოტივი */}
          <section className="bg-gray-50 p-6 rounded-[25px] border border-dashed border-gray-200 mt-4 relative overflow-hidden">
            <Quote className="absolute -right-2 -bottom-2 text-gray-200 w-24 h-24 rotate-12" />
            <div className="flex items-center gap-3 text-[#2d1b4d] font-bold italic relative z-10">
              <Heart size={20} className="text-red-500 fill-red-500" />
              <p>შექმნილია სიყვარულით, გურამ დოჩანაშვილის «სამოსელი პირველის» მოტივზე.</p>
            </div>
          </section>

        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #2d1b4d20; border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #2d1b4d50; }
      `}</style>
    </div>
  );
};

export default AboutModal;