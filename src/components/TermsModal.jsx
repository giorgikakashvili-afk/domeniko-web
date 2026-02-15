import React from 'react';
import { X, FileText } from 'lucide-react';

const TermsModal = ({ isOpen, onClose }) => {
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
        <div className="bg-[#fff4ec] p-6 md:p-8 border-b border-orange-100 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#f3713d] rounded-2xl flex items-center justify-center text-white shadow-lg">
              <FileText size={24} />
            </div>
            <div>
              <h2 className="text-[#2d1b4d] font-black text-xl md:text-2xl uppercase tracking-tighter italic">
                წესები და პირობები
              </h2>
              <p className="text-[#f3713d] text-xs font-bold uppercase tracking-widest mt-1">
                ძალაშია: 2026 წლის 16 თებერვლიდან
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
        <div className="p-6 md:p-10 overflow-y-auto custom-scrollbar bg-white space-y-8">
          
          {/* 1. ზოგადი დებულებები */}
          <section>
            <h3 className="text-[#2d1b4d] font-black text-lg mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#f3713d] rounded-full inline-block"></span>
              1. ზოგადი დებულებები
            </h3>
            <div className="text-gray-600 font-medium leading-relaxed space-y-2">
              <p>წინამდებარე წესები და პირობები არეგულირებს domenico.ge ვებგვერდით (შემდგომში — «პლატფორმა») სარგებლობის პირობებს.</p>
              <p>პლატფორმას მართავს არასამეწარმეო (არაკომერციული) იურიდიული პირი «დომენიკო ჯგუფი» (შემდგომში — «დომენიკო»), რეგისტრირებული საქართველოს კანონმდებლობის შესაბამისად.</p>
              <p>პლატფორმაზე რეგისტრაციით ან მისი სერვისებით სარგებლობით, თქვენ ეთანხმებით წინამდებარე წესებსა და პირობებს.</p>
            </div>
          </section>

          {/* 2. პლატფორმის მიზანი და სერვისები */}
          <section>
            <h3 className="text-[#2d1b4d] font-black text-lg mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#f3713d] rounded-full inline-block"></span>
              2. პლატფორმის მიზანი და სერვისები
            </h3>
            <div className="text-gray-600 font-medium leading-relaxed space-y-2">
              <p>დომენიკო არის კარიერული ორიენტაციის პლატფორმა ახალგაზრდებისთვის. პლატფორმა გთავაზობთ:</p>
              <p>• ჰოლანდის (RIASEC) ტესტირებას — პროფესიული ინტერესებისა და უნარების დიაგნოსტიკას;</p>
              <p>• Live ლექციებს — ონლაინ შეხვედრებს პროფესიონალებთან;</p>
              <p>• ვორქშოპებს — პრაქტიკულ გამოცდილებას სხვადასხვა პროფესიაში;</p>
              <p>• პერსონალურ კონსულტაციას — რეკომენდაციებს კარიერული გეგმის შედგენისთვის;</p>
              <p>• საგანმანათლებლო ინფორმაციას — უმაღლესი და პროფესიული განათლების გზების შესახებ.</p>
            </div>
          </section>

          {/* 3. რეგისტრაცია და ანგარიში */}
          <section>
            <h3 className="text-[#2d1b4d] font-black text-lg mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#f3713d] rounded-full inline-block"></span>
              3. რეგისტრაცია და ანგარიში
            </h3>
            <div className="text-gray-600 font-medium leading-relaxed space-y-2">
              <p>პლატფორმაზე სრული სარგებლობისთვის საჭიროა რეგისტრაცია. რეგისტრაციისას მომხმარებელი ვალდებულია მიუთითოს ზუსტი და სრული ინფორმაცია.</p>
              <p>16 წლამდე ასაკის მომხმარებლის რეგისტრაცია დასაშვებია მშობლის ან კანონიერი წარმომადგენლის თანხმობით, საქართველოს «პერსონალურ მონაცემთა დაცვის შესახებ» კანონის შესაბამისად.</p>
              <p>მომხმარებელი პასუხისმგებელია თავისი ანგარიშის უსაფრთხოებაზე და ვალდებულია არ გაუზიაროს წვდომის მონაცემები მესამე პირებს.</p>
            </div>
          </section>

          {/* 4. მომხმარებლის უფლებები და ვალდებულებები */}
          <section>
            <h3 className="text-[#2d1b4d] font-black text-lg mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#f3713d] rounded-full inline-block"></span>
              4. მომხმარებლის უფლებები და ვალდებულებები
            </h3>
            <div className="text-gray-600 font-medium leading-relaxed space-y-4">
              <div className="space-y-2">
                <p className="font-bold text-[#2d1b4d]">მომხმარებელს უფლება აქვს:</p>
                <p>• ისარგებლოს პლატფორმის სერვისებით წინამდებარე პირობების ფარგლებში;</p>
                <p>• მიიღოს ტესტირების შედეგები და პერსონალური რეკომენდაციები;</p>
                <p>• ნებისმიერ დროს წაშალოს ანგარიში და მოითხოვოს პერსონალური მონაცემების წაშლა.</p>
              </div>
              <div className="space-y-2">
                <p className="font-bold text-[#2d1b4d]">მომხმარებელი ვალდებულია:</p>
                <p>• არ გამოიყენოს პლატფორმა არაკანონიერი ან არაეთიკური მიზნებისთვის;</p>
                <p>• პატივი სცეს სხვა მომხმარებლებს Live ლექციებსა და ვორქშოპებზე;</p>
                <p>• არ გაავრცელოს პლატფორმიდან მიღებული კონტენტი კომერციული მიზნებისთვის.</p>
              </div>
            </div>
          </section>

          {/* 5. ინტელექტუალური საკუთრება */}
          <section>
            <h3 className="text-[#2d1b4d] font-black text-lg mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#f3713d] rounded-full inline-block"></span>
              5. ინტელექტუალური საკუთრება
            </h3>
            <div className="text-gray-600 font-medium leading-relaxed space-y-2">
              <p>პლატფორმაზე განთავსებული ყველა მასალა — ტესტები, ტექსტები, ვიზუალური კონტენტი, ლოგო და დიზაინი — წარმოადგენს დომენიკოს ინტელექტუალურ საკუთრებას.</p>
              <p>მასალების კოპირება, გავრცელება ან კომერციული გამოყენება წინასწარი წერილობითი თანხმობის გარეშე აკრძალულია.</p>
            </div>
          </section>

          {/* 6. პასუხისმგებლობის შეზღუდვა */}
          <section>
            <h3 className="text-[#2d1b4d] font-black text-lg mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#f3713d] rounded-full inline-block"></span>
              6. პასუხისმგებლობის შეზღუდვა
            </h3>
            <div className="text-gray-600 font-medium leading-relaxed space-y-2">
              <p>დომენიკოს სერვისები წარმოადგენს კარიერულ ორიენტაციას და არა პროფესიულ ფსიქოლოგიურ კონსულტაციას.</p>
              <p>ტესტირების შედეგები და რეკომენდაციები სარეკომენდაციო ხასიათისაა და არ წარმოადგენს გარანტიას კონკრეტული პროფესიული შედეგის მიღწევისთვის.</p>
              <p>დომენიკო არ არის პასუხისმგებელი მომხმარებლის მიერ რეკომენდაციების საფუძველზე მიღებულ გადაწყვეტილებებზე.</p>
            </div>
          </section>

          {/* 7. სერვისის შეჩერება და შეწყვეტა */}
          <section>
            <h3 className="text-[#2d1b4d] font-black text-lg mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#f3713d] rounded-full inline-block"></span>
              7. სერვისის შეჩერება და შეწყვეტა
            </h3>
            <div className="text-gray-600 font-medium leading-relaxed space-y-2">
              <p>დომენიკო იტოვებს უფლებას შეაჩეროს ან შეწყვიტოს მომხმარებლის ანგარიში წინამდებარე წესების დარღვევის შემთხვევაში.</p>
              <p>დომენიკო იტოვებს უფლებას შეცვალოს, დაამატოს ან შეაჩეროს სერვისები წინასწარი შეტყობინებით.</p>
            </div>
          </section>

          {/* 8. ცვლილებები წესებსა და პირობებში */}
          <section>
            <h3 className="text-[#2d1b4d] font-black text-lg mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#f3713d] rounded-full inline-block"></span>
              8. ცვლილებები წესებსა და პირობებში
            </h3>
            <div className="text-gray-600 font-medium leading-relaxed space-y-2">
              <p>დომენიკო იტოვებს უფლებას შეიტანოს ცვლილებები წინამდებარე წესებსა და პირობებში.</p>
              <p>ცვლილებების შესახებ მომხმარებლები ინფორმირებული იქნებიან პლატფორმის მეშვეობით.</p>
              <p>პლატფორმით სარგებლობის გაგრძელება ცვლილებების შემდეგ ნიშნავს მათ მიღებას.</p>
            </div>
          </section>

          {/* 9. მოქმედი კანონმდებლობა */}
          <section>
            <h3 className="text-[#2d1b4d] font-black text-lg mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#f3713d] rounded-full inline-block"></span>
              9. მოქმედი კანონმდებლობა
            </h3>
            <div className="text-gray-600 font-medium leading-relaxed space-y-2">
              <p>წინამდებარე წესები და პირობები რეგულირდება საქართველოს კანონმდებლობით.</p>
              <p>ნებისმიერი დავა წყდება მოლაპარაკების გზით, ხოლო შეთანხმების მიუღწევლობის შემთხვევაში — საქართველოს სასამართლოში.</p>
            </div>
          </section>

          {/* 10. კონტაქტი */}
          <section>
            <h3 className="text-[#2d1b4d] font-black text-lg mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#f3713d] rounded-full inline-block"></span>
              10. კონტაქტი
            </h3>
            <div className="text-gray-600 font-medium leading-relaxed space-y-1">
              <p>ორგანიზაცია: ა(ა)იპ «დომენიკო ჯგუფი»</p>
              <p>ელ. ფოსტა: info@domenico.ge</p>
              <p>ვებგვერდი: domenico.ge</p>
            </div>
          </section>

        </div>

        {/* Footer Button */}
       
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

export default TermsModal;