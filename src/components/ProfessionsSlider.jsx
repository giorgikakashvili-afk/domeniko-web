import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ArrowRight, ArrowLeft, GraduationCap, Loader2 } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';

const ProfessionsSlider = () => {
  const [professions, setProfessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    // მონაცემების წამოღება Profession API-დან [cite: 12, 17]
    const fetchProfessions = async () => {
      try {
        const response = await fetch('https://rost.ge/api/professions');
        const result = await response.json();
        // ვიღებთ მონაცემებს "data" მასივიდან [cite: 22, 23]
        setProfessions(result.data);
      } catch (error) {
        console.error("Error fetching professions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfessions();
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <Loader2 className="animate-spin text-[#f3713d]" size={40} />
      </div>
    );
  }

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
        <div className="lg:w-1/3 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
          <h2 className="text-4xl md:text-6xl font-black text-[#0A0521] uppercase [font-variant-caps:all-petite-caps] mb-0 lg:mb-12 leading-tight">
            გაიცანი<br className="hidden lg:block" /> შენი <br className="hidden lg:block" /> მომავალი<br className="hidden lg:block" /> პროფესია
          </h2>

          <button className="hidden lg:flex bg-[#f3713d] text-white px-6 py-4 mt-10 rounded-full items-center gap-3 font-bold hover:bg-[#d95f2d] transition-all group shadow-lg">
            <div className="bg-white/20 p-2 rounded-full text-white">
              <GraduationCap size={20} />
            </div>
            ყველა პროფესია
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

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
              if (!swiper.isEnd) setIsEnd(false);
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 2.2 },
              1536: { slidesPerView: 3 }
            }}
            className={`overflow-visible fade-mask-prof ${isEnd ? 'no-mask' : ''}`}
          >
            {professions.map((prof) => (
              <SwiperSlide key={prof.id}>
                <div className="bg-white rounded-3xl overflow-hidden shadow-sm h-full m-2 cursor-pointer border-2 border-transparent transition-all duration-300 hover:border-[#f3713d] hover:shadow-xl group/card">

                  {/* ფოტოს კონტეინერი - ფიქსირებული პროპორციით (მაგ. 4:3) */}
                  <div className="relative w-full aspect-3/3 overflow-hidden bg-gray-100">
                    <img
                      src={prof.image_url}
                      alt={prof.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                    />
                  </div>

                  <div className="p-6 md:p-7 flex flex-col gap-2">
                    <h3 className="text-lg md:text-xl font-black text-[#0A0521] uppercase [font-variant-caps:all-petite-caps] min-h-14 line-clamp-2">
                      {prof.name}
                    </h3>
                    <p className="text-[#f3713d] font-bold text-sm uppercase">
                      {prof.type || "უმაღლესი განათლება"}
                    </p>
                    <div className="flex gap-4 mt-2 text-[#6b7280] text-xs font-semibold">
                      <span className="flex items-center gap-1">პროფესიული კურსი</span>
                      <span className="flex items-center gap-1">მენტორი</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button className="prof-prev-btn hidden md:flex absolute -left-4 md:-left-7 top-1/2 -translate-y-1/2 z-60 w-12 h-12 md:w-14 md:h-14 bg-[#0A0521] text-white rounded-full justify-center items-center shadow-xl transition-all duration-300 hover:bg-[#f3713d] disabled:opacity-0">
            <ArrowLeft size={24} className="md:w-7 md:h-7" />
          </button>

          <button className="prof-next-btn hidden md:flex absolute -right-4 md:-right-7 top-1/2 -translate-y-1/2 z-60 w-12 h-12 md:w-14 md:h-14 bg-[#0A0521] text-white rounded-full justify-center items-center shadow-xl transition-all duration-300 hover:bg-[#f3713d] disabled:opacity-0">
            <ArrowRight size={24} className="md:w-7 md:h-7" />
          </button>
        </div>

        <div className="flex justify-center lg:hidden mt-4">
          <button className="bg-[#f3713d] text-white px-10 py-4 rounded-full flex items-center gap-3 font-bold shadow-lg active:scale-95">
            <div className="bg-white/20 p-2 rounded-full text-white">
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