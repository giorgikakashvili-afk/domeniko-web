import React from 'react';
import { Globe, UserCircle, Briefcase, Compass } from 'lucide-react';

const Services = () => {
  const cards = [
    {
      title: "გზამკვლევი შენს გვერდით",
      desc: "კარიერული განვითარების რუკა და პერსონალური უკუკავშირი",
      icon: <Globe className="text-[#f3713d] w-8 h-8 md:w-10 md:h-10" />,
    },
    {
      title: "გაიცანი საკუთარი თავი",
      desc: "ჰოლანდიის ტესტი - გაიგე ვინ ხარ და სად გექნება უპირატესობა",
      icon: <UserCircle className="text-[#f3713d] w-8 h-8 md:w-10 md:h-10" />,
    },
    {
      title: "გაიცანი პროფესიები",
      desc: "ონლაინ ლექციები, პრაქტიკული ვორქშოპები და ბიბლიოთეკა",
      icon: <Briefcase className="text-[#f3713d] w-8 h-8 md:w-10 md:h-10" />,
    },
    {
      title: "იპოვე შენი გზა",
      desc: "ონლაინ ლექციები, პრაქტიკული ვორქშოპები და ბიბლიოთეკა",
      icon: <Compass className="text-[#f3713d] w-8 h-8 md:w-10 md:h-10" />,
    },
  ];

  return (
    <section className="py-16 px-4 md:px-20 max-w-8xl mx-auto font-noto">
      <h2 className="text-3xl md:text-7xl font-black text-[#0A0521] mb-10 md:mb-16 uppercase [font-variant-caps:all-petite-caps] text-center md:text-left">
        რას გთავაზობს დომენიკო?!
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {cards.map((card, index) => (
          <div 
            key={index} 
            className="group relative bg-white/50 backdrop-blur-sm p-4 md:p-8 rounded-3xl md:rounded-[2.5rem] border-2 border-white flex flex-col items-start gap-3 min-h-55 md:min-h-65 
                       transition-all duration-500 ease-out cursor-pointer
                       hover:bg-white hover:-translate-y-3 hover:shadow-2xl hover:shadow-orange-200/50 hover:border-[#f3713d]/30"
          >
            {/* აიქონის ანიმაცია - იზრდება და ოდნავ იხრება */}
            <div className="shrink-0 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-rotate-6">
              {card.icon}
            </div>
            
            {/* სათაური - ფერის შეცვლა */}
            <h3 className="text-lg md:text-2xl font-extrabold text-[#0A0521] leading-tight uppercase [font-variant-caps:all-petite-caps] transition-colors duration-300 group-hover:text-[#f3713d]">
              {card.title}
            </h3>
            
            {/* აღწერა - ტექსტის გამუქება */}
            <p className="text-gray-600 text-[13px] md:text-sm leading-relaxed font-medium transition-colors duration-300 group-hover:text-gray-900">
              {card.desc}
            </p>

            {/* დამატებითი დეკორატიული ელემენტი - პატარა ნარინჯისფერი ხაზი ქვემოთ, რომელიც ჰოვერზე გრძელდება */}
            <div className="absolute bottom-6 left-8 w-0 h-1 bg-[#f3713d] rounded-full transition-all duration-500 group-hover:w-12 opacity-0 group-hover:opacity-100 hidden md:block" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;