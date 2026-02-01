import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ArrowRight, ArrowLeft, GraduationCap } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';

const ProfessionsSlider = () => {
  const professions = [
    { title: "მედიცინა", level: "უმაღლესი განათლება", video: "3 ვიდეო", mentor: "12 პროფესიონალი", img: "https://cdn2.psychologytoday.com/assets/styles/manual_crop_1_1_1200x1200/public/field_blog_entry_images/2018-02/doctor-lenetstan-shutterstock_100422550.jpg" },
    { title: "საერთაშორისო ურთიერთობები", level: "უმაღლესი განათლება", video: "3 ვიდეო", mentor: "12 პროფესიონალი", img: "https://cdn2.psychologytoday.com/assets/styles/manual_crop_1_1_1200x1200/public/field_blog_entry_images/2018-02/doctor-lenetstan-shutterstock_100422550.jpg" },
    { title: "სამართალი", level: "უმაღლესი განათლება", video: "3 ვიდეო", mentor: "12 პროფესიონალი", img: "https://cdn2.psychologytoday.com/assets/styles/manual_crop_1_1_1200x1200/public/field_blog_entry_images/2018-02/doctor-lenetstan-shutterstock_100422550.jpg" },
    { title: "ინფორმაციული ტექნოლოგიები", level: "პროფესიული", video: "5 ვიდეო", mentor: "8 პროფესიონალი", img: "https://cdn2.psychologytoday.com/assets/styles/manual_crop_1_1_1200x1200/public/field_blog_entry_images/2018-02/doctor-lenetstan-shutterstock_100422550.jpg" },
    { title: "ბიზნესი", level: "უმაღლესი განათლება", video: "4 ვიდეო", mentor: "10 პროფესიონალი", img: "https://cdn2.psychologytoday.com/assets/styles/manual_crop_1_1_1200x1200/public/field_blog_entry_images/2018-02/doctor-lenetstan-shutterstock_100422550.jpg" },
  ];

  return (
    <section className="py-12 md:py-20 bg-[#fff4ec] px-4 md:px-20 overflow-hidden font-noto">
      <div className="max-w-8xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12">

        {/* სათაურის ბლოკი */}
        <div className="lg:w-1/3 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
          <h2 className="text-4xl md:text-6xl font-black text-[#0A0521] uppercase [font-variant-caps:all-petite-caps] mb-0 lg:mb-12 leading-tight">
            გაიცანი<br className="hidden lg:block" /> შენი <br className="hidden lg:block" /> მომავალი<br className="hidden lg:block" /> პროფესია
          </h2>

          {/* ღილაკი: ჩანს მხოლოდ დესკტოპზე (lg+) */}
          <button className="hidden lg:flex bg-[#f3713d] text-white px-6 py-4 mt-10 rounded-full items-center gap-3 font-bold hover:bg-[#d95f2d] transition-all group shadow-lg">
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
              nextEl: '.next-btn',
              prevEl: '.prev-btn',
            }}
            breakpoints={{
              640: { slidesPerView: 2.2 },
              1024: { slidesPerView: 2.2 },
              1536: { slidesPerView: 3.5 }
            }}
            className="overflow-visible"
          >
            {professions.map((prof, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white rounded-[1.1rem] overflow-hidden shadow-sm h-full m-2 cursor-pointer 
                    border border-transparent transition-all duration-300 
                    hover:border-[#f3713d]">

                  <img src={prof.img} alt={prof.title} className="w-full h-64 md:h-74 object-cover" />

                  <div className="p-6 md:p-8 flex flex-col gap-2">
                    <h3 className="text-lg md:text-xl font-black text-[#0A0521] uppercase [font-variant-caps:all-petite-caps] h-14 line-clamp-2">
                      {prof.title}
                    </h3>
                    <p className="text-[#f3713d] font-bold text-sm">{prof.level}</p>
                    <div className="flex gap-4 mt-2 text-gray-500 text-xs font-medium">
                      <span>{prof.video}</span>
                      <span>{prof.mentor}</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* ნავიგაციის ისრები */}
          <button className="prev-btn absolute -left-4 md:-left-7 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-14 md:h-14 bg-[#0A0521] text-white rounded-full flex justify-center items-center shadow-xl transition-all duration-300 hover:bg-[#f3713d] [&.swiper-button-disabled]:opacity-0">
            <ArrowLeft size={24} className="md:w-7 md:h-7" />
          </button>

          <button className="next-btn absolute -right-4 md:-right-7 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-14 md:h-14 bg-[#0A0521] text-white rounded-full flex justify-center items-center shadow-xl transition-all duration-300 hover:bg-[#f3713d] [&.swiper-button-disabled]:opacity-0">
            <ArrowRight size={24} className="md:w-7 md:h-7" />
          </button>
        </div>

        {/* ღილაკი: ჩანს მხოლოდ მობილურზე (< lg) */}
        <div className="flex justify-center lg:hidden mt-4">
          <button className="bg-[#f3713d] text-white px-10 py-4 rounded-full flex items-center gap-3 font-bold hover:bg-[#d95f2d] transition-all shadow-lg active:scale-95">
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