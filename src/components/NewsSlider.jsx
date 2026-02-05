import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ArrowLeft, ArrowRight, ArrowUpRight, Loader2 } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';

const NewsSlider = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://rost.ge/api/news')
      .then((res) => res.json())
      .then((json) => {
        setNews(json.data);
        setLoading(false);
      })
      .catch((err) => console.error("Error:", err));
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center py-20">
      <Loader2 className="animate-spin text-[#f3713d]" size={40} />
    </div>
  );

  return (
    <section className="bg-[#09002f] py-16 px-4 md:px-10 font-noto rounded-[40px] mx-4 md:mx-10 my-10 overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <h2 className="text-white text-3xl md:text-5xl font-black uppercase [font-variant-caps:all-petite-caps] tracking-tight font-noto">
          ბოლო სიახლეები
        </h2>

        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <button className="news-prev w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all border border-white/10">
              <ArrowLeft size={24} />
            </button>
            <button className="news-next w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all border border-white/10">
              <ArrowRight size={24} />
            </button>
          </div>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1.2}
        navigation={{
          nextEl: '.news-next',
          prevEl: '.news-prev',
        }}
        breakpoints={{
          640: { slidesPerView: 1.5 },
          1024: { slidesPerView: 2.2 },
          1400: { slidesPerView: 3 },
        }}
        className="news-swiper overflow-visible!"
      >
        {news.map((item) => (
          <SwiperSlide key={item.id} className="h-auto">
            <div className="bg-[#ffe4d1] rounded-[30px] p-4 flex flex-col md:flex-row gap-5 h-full transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-[#f3713d]/30">
              
              {/* ფოტოს ნაწილი - ფიქსირებული ჩარჩო */}
              <div className="w-full md:w-48 lg:w-52 shrink-0 overflow-hidden rounded-[20px] bg-white/20 relative">
                <div className="aspect-square md:h-full w-full relative">
                  <img 
                    src={item.image_url}
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
              </div>

              {/* ტექსტის ნაწილი */}
              <div className="flex flex-col justify-between py-1 flex-1">
                <div>
                  <h3 className="text-[#0f0a21] font-noto font-black text-lg md:text-xl leading-tight mb-2 uppercase [font-variant-caps:all-petite-caps] line-clamp-2 min-h-12">
                    {item.name}
                  </h3>
                  <p className="text-[#0f0a21]/70 font-noto text-[13px] leading-relaxed line-clamp-3 md:line-clamp-4">
                    {item.text}
                  </p>
                </div>

                <div className="mt-4 flex justify-between items-center">
                   <span className="text-[11px] font-bold text-[#f3713d] uppercase opacity-70">
                     {new Date(item.created_at).toLocaleDateString('ka-GE')}
                   </span>
                   <button className="w-10 h-10 bg-[#f3713d] text-white rounded-full flex items-center justify-center hover:bg-[#0f0a21] transition-colors">
                     <ArrowUpRight size={18} />
                   </button>
                </div>
              </div>
              
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default NewsSlider;