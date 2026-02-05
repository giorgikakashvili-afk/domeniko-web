import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';

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

  if (loading) return <div className="text-center py-20 text-white font-noto">იტვირთება...</div>;

  return (
    <section className="bg-[#09002f] py-16 px-4 md:px-10 font-noto rounded-[40px] mx-4 md:mx-10 my-10 overflow-hidden">
      {/* ზედა ზოლი */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <h2 className="text-white text-4xl md:text-5xl font-black uppercase [font-variant-caps:all-petite-caps] tracking-tight font-noto">
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

          <button className="bg-[#ffe4d1] text-[#0f0a21] px-6 py-3 rounded-full font-bold flex items-center gap-3 hover:bg-white transition-all whitespace-nowrap font-noto">
            სიახლის ნახვა
            <div className="bg-[#f3713d] text-white p-1 rounded-full">
              <ArrowUpRight size={18} />
            </div>
          </button>
        </div>
      </div>

      {/* სლაიდერი */}
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
          768: { slidesPerView: 2.2 },
          1024: { slidesPerView: 3 },
        }}
        className="news-swiper"
      >
        {news.map((item) => (
          <SwiperSlide key={item.id} className="h-auto">
            <div className="bg-[#ffe4d1] rounded-[30px] p-4 flex flex-col md:flex-row gap-5 h-full transition-transform duration-300 hover:-translate-y-2 overflow-hidden">
              
              {/* სურათი - md:h-full და object-cover უზრუნველყოფს სიმაღლის სრულ შევსებას */}
              <div className="w-full md:w-48 h-48 md:h-auto shrink-0 overflow-hidden rounded-[20px]">
                <img 
                  src={item.image_url}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* ტექსტი */}
              <div className="flex flex-col justify-between py-2 flex-1">
                <div>
                  <h3 className="text-[#0f0a21] font-noto font-black text-lg md:text-xl leading-tight mb-3 uppercase [font-variant-caps:all-petite-caps] line-clamp-2 min-h-12">
                    {item.name}
                  </h3>
                  <p className="text-[#0f0a21]/70 font-noto text-sm leading-relaxed line-clamp-3">
                    {item.text}
                  </p>
                </div>

                <button className="mt-4 w-10 h-10 bg-[#f3713d] text-white rounded-full flex items-center justify-center self-start hover:scale-110 transition-transform">
                  <ArrowUpRight size={20} />
                </button>
              </div>
              
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx>{`
        .news-swiper :global(.swiper-slide) {
          height: auto;
          display: flex;
        }
      `}</style>
    </section>
  );
};

export default NewsSlider;