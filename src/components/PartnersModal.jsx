import React from 'react';
import { X, Handshake, ExternalLink, GraduationCap } from 'lucide-react';

const PartnersModal = ({ isOpen, onClose }) => {
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
        <div className="bg-[#fdf3f0] p-6 md:p-8 border-b border-green-100 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#2d1b4d] rounded-2xl flex items-center justify-center text-white shadow-lg">
              <Handshake size={24} />
            </div>
            <div>
              <h2 className="text-[#2d1b4d] font-black text-xl md:text-2xl uppercase tracking-tighter italic">
                პარტნიორები
              </h2>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-green-50 rounded-full transition-colors text-[#2d1b4d]/50 hover:text-green-600"
          >
            <X size={28} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-10 overflow-y-auto custom-scrollbar bg-white space-y-8">
          
          {/* Logo and Main Title */}
          <div className="flex flex-col items-center text-center space-y-4 pb-4 border-b border-gray-100">
            <img 
              src="https://portal.medutur.com/_next/image?url=https%3A%2F%2Fmedu-images-public.s3.eu-central-1.amazonaws.com%2Funiversities%2F181%2Flogos%2F181.png&w=256&q=75" // აქ ჩასვით თქვენი ლოგოს ფაილი
              alt="CIU Logo" 
              className="h-24 md:h-32 object-contain"
            />
            <div>
              <h3 className="text-[#2d1b4d] font-black text-xl md:text-2xl uppercase italic">
                კავკასიის საერთაშორისო უნივერსიტეტი
              </h3>
              <p className="text-[#f3713d] font-bold uppercase tracking-[0.2em] text-sm mt-1">
                აკადემიური პარტნიორი
              </p>
            </div>
          </div>

          {/* Description */}
          <section>
            <h3 className="text-[#2d1b4d] font-black text-lg mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-green-500 rounded-full inline-block"></span>
              თანამშრომლობის შესახებ
            </h3>
            <div className="text-gray-600 font-medium leading-relaxed space-y-4">
              <p>დომენიკოს პლატფორმა შექმნილია კავკასიის საერთაშორისო უნივერსიტეტის მხარდაჭერით. CIU არა მხოლოდ ფინანსურ ინვესტიციას დებს პროექტში, არამედ აქტიურად მონაწილეობს საგანმანათლებლო პროცესში.</p>
            </div>
          </section>

          {/* Benefits */}
          <section className="bg-gray-50 p-6 md:p-8 rounded-[30px] border border-gray-100">
            <h3 className="text-[#2d1b4d] font-black text-lg mb-4 flex items-center gap-2">
              <GraduationCap className="text-green-600" size={20} />
              რას ნიშნავს ეს შენთვის?
            </h3>
            <ul className="text-gray-600 font-medium space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold">•</span>
                <span>აკადემიური გუნდი ჩართულია Live ლექციებსა და შეხვედრებში</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold">•</span>
                <span>უნივერსიტეტის სივრცეები ღიაა ვორქშოპებისთვის</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold">•</span>
                <span>CIU-ს მისიაა მხარი დაუჭიროს ქართული საგანმანათლებლო სისტემის განვითარებას</span>
              </li>
            </ul>
          </section>

          {/* Gratitude / Quote */}
          <section className="italic border-l-4 border-[#f3713d] pl-6 py-2">
            <p className="text-gray-600 font-medium leading-relaxed">
              „დომენიკო ჯგუფი მადლობას უხდის კავკასიის საერთაშორისო უნივერსიტეტის კანცლერს, ბატონ ვახტანგ წივწივაძეს და მთლიანად გუნდს — რწმენისთვის, მხარდაჭერისა და საქართველოს ახალგაზრდობაში ინვესტიციისთვის.“
            </p>
            <p className="text-[#2d1b4d] font-black mt-3 not-italic uppercase text-sm">
              — დომენიკო ჯგუფი
            </p>
          </section>

          {/* External Link */}
          <div className="pt-4 flex justify-center">
            <a 
              href="https://ciu.edu.ge" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#2d1b4d] font-black uppercase text-sm hover:text-[#f3713d] transition-colors border-b-2 border-[#f3713d]"
            >
              ciu.edu.ge <ExternalLink size={16} />
            </a>
          </div>

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

export default PartnersModal;