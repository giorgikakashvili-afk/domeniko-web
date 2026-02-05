import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ArrowRight, ArrowLeft, GraduationCap } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';

const ProfessionsSlider = () => {
  const [isEnd, setIsEnd] = useState(false);

  const professions = [
    { title: "მედიცინა", level: "უმაღლესი განათლება", video: "3 ვიდეო", mentor: "12 პროფესიონალი", img: "https://cdn2.psychologytoday.com/assets/styles/manual_crop_1_1_1200x1200/public/field_blog_entry_images/2018-02/doctor-lenetstan-shutterstock_100422550.jpg" },
    { title: "საერთაშორისო ურთიერთობები", level: "უმაღლესი განათლება", video: "3 ვიდეო", mentor: "12 პროფესიონალი", img: "https://cdn2.psychologytoday.com/assets/styles/manual_crop_1_1_1200x1200/public/field_blog_entry_images/2018-02/doctor-lenetstan-shutterstock_100422550.jpg" },
    { title: "სამართალი", level: "უმაღლესი განათლება", video: "3 ვიდეო", mentor: "12 პროფესიონალი", img: "https://cdn2.psychologytoday.com/assets/styles/manual_crop_1_1_1200x1200/public/field_blog_entry_images/2018-02/doctor-lenetstan-shutterstock_100422550.jpg" },
    { title: "ინფორმაციული ტექნოლოგიები", level: "პროფესიული", video: "5 ვიდეო", mentor: "8 პროფესიონალი", img: "https://cdn2.psychologytoday.com/assets/styles/manual_crop_1_1_1200x1200/public/field_blog_entry_images/2018-02/doctor-lenetstan-shutterstock_100422550.jpg" },
    { title: "ბიზნესი", level: "უმაღლესი განათლება", video: "4 ვიდეო", mentor: "10 პროფესიონალი", img: "https://cdn2.psychologytoday.com/assets/styles/manual_crop_1_1_1200x1200/public/field_blog_entry_images/2018-02/doctor-lenetstan-shutterstock_100422550.jpg" },
  ];

  return (
    <section className="py-12 md:py-20 px-4 md:px-10 xl:px-20 overflow-hidden font-noto bg-[#fcfcfc]">
      <style>{`
        .fade-mask-prof {
          -webkit-mask-image: linear-gradient(to right, black 85%, transparent 100%);
          mask-image: linear-gradient(to right, black 85%, transparent 100%);
          transition: mask-image 0.4s ease;
        }
        .no-mask {
          -webkit-mask-image: none !important;
          mask-image: none !important;
        }
      `}</style>

      <div className="max-w-8xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* მარცხენა ბლოკი */}
        <div className="lg:w-1/3 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
          <h2 className="text-4xl md:text-6xl font-black text-[#0A0521] uppercase [font-variant-caps:all-petite-caps] mb-0 lg:mb-12 leading-tight font-noto">
            გაიცანი<br className="hidden lg:block" /> შენი <br className="hidden lg:block" /> მომავალი<br className="hidden lg:block" /> პროფესია
          </h2>

          <button className="hidden lg:flex bg-[#f3713d] text-white px-6 py-4 mt-10 rounded-full items-center gap-3 font-bold hover:bg-[#d95f2d] transition-all group shadow-lg font-noto">
            <div className="bg-white/20 p-2 rounded-full">
              <GraduationCap size={20} />
            </div>
            ყველა პროფესია
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* სლაიდერის ბლოკი */}
        <div className="lg:w-2/3 relative group">
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={1.2}
            navigation={{
              nextEl: '.prof-next-btn',
              prevEl: '.prof-prev-btn',
            }}
            onReachEnd={() => setIsEnd(true)}
            onFromEdge={() => setIsEnd(false)}
            onSlideChange={(swiper) => {
              if(!swiper.isEnd) setIsEnd(false);
            }}
            breakpoints={{
              640: { slidesPerView: 2.2 },
              1024: { slidesPerView: 2.2 },
              1536: { slidesPerView: 3.2 }
            }}
            className={`overflow-visible fade-mask-prof ${isEnd ? 'no-mask' : ''}`}
          >
            {professions.map((prof, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white rounded-3xl overflow-hidden shadow-sm h-full m-2 cursor-pointer 
                    border-2 border-transparent transition-all duration-300 
                    hover:border-[#f3713d] hover:shadow-xl">
                  <img src={prof.img} alt={prof.title} className="w-full h-64 md:h-72 object-cover" />
                  <div className="p-6 md:p-7 flex flex-col gap-2">
                    <h3 className="text-lg md:text-xl font-black text-[#0A0521] uppercase [font-variant-caps:all-petite-caps] min-h-14 line-clamp-2 font-noto">
                      {prof.title}
                    </h3>
                    <p className="text-[#f3713d] font-bold text-sm font-noto">{prof.level}</p>
                    <div className="flex gap-4 mt-2 text-[#6b7280] text-xs font-semibold font-noto">
                      <span className="flex items-center gap-1">{prof.video}</span>
                      <span className="flex items-center gap-1">{prof.mentor}</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* ნავიგაციის ღილაკები - კლასები შეცვლილია კონფლიქტის თავიდან ასაცილებლად */}
          <button className="prof-prev-btn hidden md:flex absolute -left-4 md:-left-7 top-1/2 -translate-y-1/2 z-60 w-12 h-12 md:w-14 md:h-14 bg-[#0A0521] text-white rounded-full justify-center items-center shadow-xl transition-all duration-300 hover:bg-[#f3713d] disabled:opacity-0">
            <ArrowLeft size={24} className="md:w-7 md:h-7" />
          </button>

          <button className="prof-next-btn hidden md:flex absolute -right-4 md:-right-7 top-1/2 -translate-y-1/2 z-60 w-12 h-12 md:w-14 md:h-14 bg-[#0A0521] text-white rounded-full justify-center items-center shadow-xl transition-all duration-300 hover:bg-[#f3713d] disabled:opacity-0">
            <ArrowRight size={24} className="md:w-7 md:h-7" />
          </button>
        </div>

        {/* მობილური ღილაკი */}
        <div className="flex justify-center lg:hidden mt-4">
          <button className="bg-[#f3713d] text-white px-10 py-4 rounded-full flex items-center gap-3 font-bold hover:bg-[#d95f2d] transition-all shadow-lg active:scale-95 font-noto">
            <div className="bg-white/20 p-2 rounded-full">
              <GraduationCap size={20} />
            </div>
            ყველა პროფესია
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProfessionsSlider;