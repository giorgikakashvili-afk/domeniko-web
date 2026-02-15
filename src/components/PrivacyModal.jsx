import React from 'react';
import { X, ShieldCheck } from 'lucide-react';

const PrivacyModal = ({ isOpen, onClose }) => {
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
        className="bg-white w-full max-w-4xl rounded-[35px] overflow-hidden relative shadow-2xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-[#f0f9ff] p-6 md:p-8 border-b border-blue-100 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#2d1b4d] rounded-2xl flex items-center justify-center text-white shadow-lg">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h2 className="text-[#2d1b4d] font-black text-xl md:text-2xl uppercase tracking-tighter italic">
                კონფიდენციალურობის პოლიტიკა
              </h2>
              <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mt-1">
                ძალაშია: 2026 წლის 16 თებერვლიდან
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-blue-50 rounded-full transition-colors text-[#2d1b4d]/50 hover:text-blue-600"
          >
            <X size={28} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-10 overflow-y-auto custom-scrollbar bg-white space-y-8">
          
          {/* 1. ზოგადი დებულებები */}
          <section>
            <h3 className="text-[#2d1b4d] font-black text-lg mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-500 rounded-full inline-block"></span>
              1. ზოგადი დებულებები
            </h3>
            <div className="text-gray-600 font-medium leading-relaxed space-y-2">
              <p>წინამდებარე კონფიდენციალურობის პოლიტიკა განსაზღვრავს, თუ როგორ აგროვებს, ინახავს, ამუშავებს და იცავს პერსონალურ მონაცემებს ა(ა)იპ «დომენიკო ჯგუფი» domenico.ge პლატფორმის მეშვეობით.</p>
              <p>პოლიტიკა შედგენილია საქართველოს «პერსონალურ მონაცემთა დაცვის შესახებ» კანონის (2024) შესაბამისად.</p>
            </div>
          </section>

          {/* 2. რა მონაცემებს ვაგროვებთ */}
          <section>
            <h3 className="text-[#2d1b4d] font-black text-lg mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-500 rounded-full inline-block"></span>
              2. რა მონაცემებს ვაგროვებთ
            </h3>
            <div className="text-gray-600 font-medium leading-relaxed space-y-4">
              <div className="space-y-1">
                <p className="font-bold text-[#2d1b4d]">რეგისტრაციის მონაცემები:</p>
                <p>• სახელი, გვარი</p>
                <p>• ელექტრონული ფოსტა</p>
                <p>• ტელეფონის ნომერი</p>
                <p>• დაბადების თარიღი / ასაკი</p>
                <p>• სასწავლებლის დასახელება და კლასი/კურსი</p>
                <p>• ქალაქი / რეგიონი</p>
              </div>
              <div className="space-y-1">
                <p className="font-bold text-[#2d1b4d]">პლატფორმის გამოყენების მონაცემები:</p>
                <p>• ჰოლანდის ტესტის შედეგები (RIASEC ტიპი)</p>
                <p>• არჩეული ინტერესები და პრეფერენციები</p>
                <p>• დასწრებული ლექციებისა და ვორქშოპების ისტორია</p>
                <p>• პროგრესის მონაცემები</p>
              </div>
              <div className="space-y-1">
                <p className="font-bold text-[#2d1b4d]">ტექნიკური მონაცემები:</p>
                <p>• IP მისამართი</p>
                <p>• ბრაუზერის ტიპი და მოწყობილობის ინფორმაცია</p>
                <p>• Cookie ფაილები</p>
              </div>
            </div>
          </section>

          {/* 3. მონაცემთა დამუშავების მიზანი */}
          <section>
            <h3 className="text-[#2d1b4d] font-black text-lg mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-500 rounded-full inline-block"></span>
              3. მონაცემთა დამუშავების მიზანი
            </h3>
            <div className="text-gray-600 font-medium leading-relaxed space-y-2">
              <p>თქვენი პერსონალური მონაცემები მუშავდება შემდეგი მიზნებისთვის:</p>
              <p>• ანგარიშის შექმნა და ავტორიზაცია;</p>
              <p>• ტესტირების ჩატარება და შედეგების გენერირება;</p>
              <p>• პერსონალური რეკომენდაციების შემუშავება;</p>
              <p>• ლექციებსა და ვორქშოპებზე რეგისტრაცია;</p>
              <p>• პლატფორმის გაუმჯობესება და სტატისტიკური ანალიზი (ანონიმიზებული სახით);</p>
              <p>• კომუნიკაცია მომხმარებელთან (შეტყობინებები, განახლებები).</p>
            </div>
          </section>

          {/* 4. არასრულწლოვანთა მონაცემები */}
          <section>
            <h3 className="text-[#2d1b4d] font-black text-lg mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-500 rounded-full inline-block"></span>
              4. არასრულწლოვანთა მონაცემები
            </h3>
            <div className="text-gray-600 font-medium leading-relaxed space-y-2">
              <p>დომენიკოს პლატფორმა განკუთვნილია 14–22 წლის ახალგაზრდებისთვის. საქართველოს კანონმდებლობის შესაბამისად:</p>
              <p>• 16 წელს მიღწეული მომხმარებელი თავად აძლევს თანხმობას მონაცემთა დამუშავებაზე;</p>
              <p>• 16 წლამდე ასაკის მომხმარებლის მონაცემების დამუშავება ხდება მშობლის ან კანონიერი წარმომადგენლის თანხმობით.</p>
              <p>არასრულწლოვნის მონაცემთა დამუშავებისას დომენიკო ითვალისწინებს არასრულწლოვნის საუკეთესო ინტერესებს.</p>
            </div>
          </section>

          {/* 5. მონაცემთა გაზიარება */}
          <section>
            <h3 className="text-[#2d1b4d] font-black text-lg mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-500 rounded-full inline-block"></span>
              5. მონაცემთა გაზიარება
            </h3>
            <div className="text-gray-600 font-medium leading-relaxed space-y-2">
              <p>დომენიკო არ ყიდის და არ გადასცემს პერსონალურ მონაცემებს მესამე პირებს კომერციული მიზნებისთვის.</p>
              <p>მონაცემების გაზიარება შესაძლებელია მხოლოდ:</p>
              <p>• საგანმანათლებლო პარტნიორ დაწესებულებებთან — მომხმარებლის თანხმობით;</p>
              <p>• კანონით გათვალისწინებულ შემთხვევებში — სახელმწიფო ორგანოებთან.</p>
            </div>
          </section>

          {/* 6. მონაცემთა უსაფრთხოება */}
          <section>
            <h3 className="text-[#2d1b4d] font-black text-lg mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-500 rounded-full inline-block"></span>
              6. მონაცემთა უსაფრთხოება
            </h3>
            <div className="text-gray-600 font-medium leading-relaxed space-y-2">
              <p>დომენიკო იყენებს შესაბამის ტექნიკურ და ორგანიზაციულ ზომებს პერსონალური მონაცემების დასაცავად:</p>
              <p>• SSL/TLS დაშიფვრა მონაცემთა გადაცემისას;</p>
              <p>• წვდომის კონტროლი — მონაცემებზე წვდომა აქვთ მხოლოდ უფლებამოსილ პირებს;</p>
              <p>• რეგულარული უსაფრთხოების აუდიტი.</p>
            </div>
          </section>

          {/* 7. მონაცემთა შენახვის ვადა */}
          <section>
            <h3 className="text-[#2d1b4d] font-black text-lg mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-500 rounded-full inline-block"></span>
              7. მონაცემთა შენახვის ვადა
            </h3>
            <div className="text-gray-600 font-medium leading-relaxed space-y-2">
              <p>პერსონალური მონაცემები ინახება იმ პერიოდის განმავლობაში, რაც აუცილებელია დამუშავების მიზნის მისაღწევად.</p>
              <p>ანგარიშის წაშლის შემთხვევაში, პერსონალური მონაცემები წაიშლება 30 კალენდარული დღის განმავლობაში, გარდა კანონით გათვალისწინებული შემთხვევებისა.</p>
            </div>
          </section>

          {/* 8. მომხმარებლის უფლებები */}
          <section>
            <h3 className="text-[#2d1b4d] font-black text-lg mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-500 rounded-full inline-block"></span>
              8. მომხმარებლის უფლებები
            </h3>
            <div className="text-gray-600 font-medium leading-relaxed space-y-2">
              <p>საქართველოს კანონმდებლობის შესაბამისად, თქვენ გაქვთ უფლება:</p>
              <p>• მოითხოვოთ ინფორმაცია თქვენი მონაცემების დამუშავების შესახებ;</p>
              <p>• მოითხოვოთ მონაცემების გასწორება, თუ ისინი არაზუსტია;</p>
              <p>• მოითხოვოთ მონაცემების წაშლა (დავიწყების უფლება);</p>
              <p>• გააპროტესტოთ მონაცემთა დამუშავება;</p>
              <p>• გააუქმოთ თანხმობა ნებისმიერ დროს.</p>
              <p>უფლებების რეალიზებისთვის მოგვწერეთ: info@domenico.ge</p>
            </div>
          </section>

          {/* 9. Cookie ფაილები */}
          <section>
            <h3 className="text-[#2d1b4d] font-black text-lg mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-500 rounded-full inline-block"></span>
              9. Cookie ფაილები
            </h3>
            <div className="text-gray-600 font-medium leading-relaxed space-y-2">
              <p>პლატფორმა იყენებს Cookie ფაილებს ფუნქციონირებისა და მომხმარებლის გამოცდილების გაუმჯობესებისთვის.</p>
              <p>მომხმარებელს შეუძლია მართოს Cookie-ს პარამეტრები ბრაუზერის მეშვეობით.</p>
            </div>
          </section>

          {/* 10. ცვლილებები პოლიტიკაში */}
          <section>
            <h3 className="text-[#2d1b4d] font-black text-lg mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-500 rounded-full inline-block"></span>
              10. ცვლილებები პოლიტიკაში
            </h3>
            <div className="text-gray-600 font-medium leading-relaxed space-y-2">
              <p>დომენიკო იტოვებს უფლებას განაახლოს კონფიდენციალურობის პოლიტიკა. ცვლილებების შესახებ მომხმარებლები ინფორმირებული იქნებიან პლატფორმის მეშვეობით.</p>
            </div>
          </section>

          {/* 11. კონტაქტი */}
          <section>
            <h3 className="text-[#2d1b4d] font-black text-lg mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-500 rounded-full inline-block"></span>
              11. კონტაქტი
            </h3>
            <div className="text-gray-600 font-medium leading-relaxed space-y-1">
              <p>ორგანიზაცია: ა(ა)იპ «დომენიკო ჯგუფი»</p>
              <p>ელ. ფოსტა: info@domenico.ge</p>
              <p>ვებგვერდი: domenico.ge</p>
              <p>პერსონალურ მონაცემთა დაცვის საკითხებზე ასევე შეგიძლიათ მიმართოთ საქართველოს პერსონალურ მონაცემთა დაცვის სამსახურს: pdps.ge</p>
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

export default PrivacyModal;