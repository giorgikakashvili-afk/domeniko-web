import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCreative, Parallax } from 'swiper/modules';
import { ArrowRight, ArrowLeft } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-creative';
import 'swiper/css/parallax';

import slbg from '../assets/main_img/slbg.jpg';

const Slider = () => {
  const slides = [
    { step: "ნაბიჯი 1", title: "გაიცანი საკუთარი თავი", desc: "აღმოაჩინე შენი ძლიერი მხარეები და ინტერესები სპეციალური ტესტების მეშვეობით." },
    { step: "ნაბიჯი 2", title: "დაიწყე ტესტირება", desc: "ჰოლანდიის ტესტის რეგისტრაციის პროცესზე ინფორმაცია: რეგისტრაციისთვის, გთხოვთ შეავსოთ ფორმა ჩვენს ვებსაიტზე." },
    { step: "ნაბიჯი 3", title: "გაიცანი მომავალი პროფესია", desc: "მიიღე დეტალური ინფორმაცია შენზე მორგებული პროფესიების შესახებ." },
  ];

  return (
    <section className="py-30 bg-[#fdf2e9] overflow-hidden font-noto flex items-center justify-center">
      <style>{`
  .slider-wrapper {
    width: 1122px;
    max-width: 95%;
    height: 567px;
    margin: 0 auto;
    position: relative;
  }

  .main-swiper {
    width: 100%;
    height: 100%;
    overflow: visible !important;
  }

  .main-swiper .swiper-wrapper {
    width: 100% !important;
  }

  .main-swiper .swiper-slide {
    flex-shrink: 0 !important;
    width: 100% !important;
    min-width: 100% !important;
    max-width: 100% !important;
    height: 100%;
    border-radius: 60px;
    overflow: hidden;
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0;
    box-sizing: border-box;
    transform-origin: center center;
    filter: blur(0px);
  }

  .main-swiper .swiper-slide-active { 
    opacity: 1; 
    z-index: 30;
    filter: blur(0px);
    transform: scale(1);
  }
  
  .main-swiper .swiper-slide-next { 
    opacity: 1; 
    z-index: 20;
    filter: blur(0px);
  }
  
  .main-swiper .swiper-slide-prev { 
    opacity: 1; 
    z-index: 20;
    filter: blur(0px);
  }

  .main-swiper .side-title { 
    display: none;
    writing-mode: vertical-rl;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: white;
    font-weight: 900;
    font-size: 22px;
    z-index: 40;
    text-shadow: 
      0 4px 15px rgba(0,0,0,0.8),
      0 2px 8px rgba(243, 113, 61, 0.6),
      0 0 30px rgba(0,0,0,0.5);
    letter-spacing: 4px;
    transition: all 0.5s ease;
    text-transform: uppercase;
    white-space: nowrap;
    max-height: 80%;
  }

  .main-swiper .swiper-slide-next .side-title {
    display: block;
    right: 40px;
    animation: slideInRight 0.6s ease forwards;
  }

  .main-swiper .swiper-slide-prev .side-title {
    display: block;
    left: 40px;
    animation: slideInLeft 0.6s ease forwards;
  }

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateY(-50%) translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateY(-50%) translateX(0);
    }
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateY(-50%) translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(-50%) translateX(0);
    }
  }

  .main-swiper .content-wrapper {
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .main-swiper .swiper-slide:not(.swiper-slide-active) .content-wrapper {
    opacity: 0;
    visibility: hidden;
    transform: scale(0.95);
  }

  .main-swiper .swiper-slide-active .content-wrapper {
    opacity: 1;
    visibility: visible;
    transform: scale(1);
  }

  .bg-image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .main-swiper .swiper-slide-active .bg-image {
    transform: scale(1.05);
  }

  .slide-content-item {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .main-swiper .swiper-slide-active .slide-content-item {
    opacity: 1;
    transform: translateY(0);
  }

  .main-swiper .swiper-slide-active .slide-content-item:nth-child(1) {
    transition-delay: 0.1s;
  }

  .main-swiper .swiper-slide-active .slide-content-item:nth-child(2) {
    transition-delay: 0.2s;
  }

  .main-swiper .swiper-slide-active .slide-content-item:nth-child(3) {
    transition-delay: 0.3s;
  }

  .custom-prev, .custom-next {
    backdrop-filter: blur(10px);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .custom-prev:hover, .custom-next:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 20px rgba(0,0,0,0.2);
  }

  .custom-prev:active, .custom-next:active {
    transform: scale(0.95);
  }

  .profile-button {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 10px 30px rgba(243, 113, 61, 0.3);
  }

  .profile-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 40px rgba(243, 113, 61, 0.4);
  }

  .profile-button:hover .arrow-icon {
    transform: translateX(4px);
  }

  .arrow-icon {
    transition: transform 0.3s ease;
  }

  .overlay-gradient {
    background: linear-gradient(135deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 100%);
    transition: opacity 0.6s ease;
  }

  .main-swiper .swiper-slide-active .overlay-gradient {
    opacity: 1;
  }
`}</style>

      <div className="slider-wrapper">
        <Swiper
          modules={[Navigation, EffectCreative, Parallax]}
          effect={'creative'}
          centeredSlides={false}
          slidesPerView={1}
          resistanceRatio={0}
          speed={1000}
          parallax={true}
          navigation={{
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
          }}
          creativeEffect={{
            prev: {
              translate: ['-20%', 0, -120],
              scale: 0.88,
              opacity: 0.5,
            },
            next: {
              translate: ['20%', 0, -120],
              scale: 0.88,
              opacity: 0.5,
            },
          }}
          className="main-swiper"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full border-2 border-[#F3713D] rounded-[60px] overflow-hidden shadow-2xl">
                <img
                  src={slbg}
                  alt="Background"
                  className="bg-image"
                  data-swiper-parallax="-100"
                />
                <div className="overlay-gradient absolute inset-0 z-1"></div>

                <div className="side-title uppercase tracking-widest">{slide.title}</div>

                <div className="content-wrapper absolute inset-0 p-12 md:p-20 flex flex-col justify-center text-white z-10">
                  {/* კონტენტის გადატანა მარჯვენა ნახევარში */}
                  <div className="flex justify-end">
                    <div className="w-full md:w-1/2 flex flex-col items-start text-left">

                      {/* ნაბიჯი */}
                      <span className="slide-content-item text-[#f3713d] font-bold mb-4 block text-xl">
                        {slide.step}
                      </span>

                      {/* სათაური */}
                      <h2 className="slide-content-item text-4xl md:text-6xl font-black mb-8 drop-shadow-lg uppercase [font-variant-caps:all-petite-caps]">
                        {slide.title}
                      </h2>

                      {/* აღწერა */}
                      <p className="slide-content-item text-lg text-gray-100 leading-relaxed font-normal drop-shadow-md max-w-lg mb-10">
                        {slide.desc}
                      </p>

                      {/* ღილაკი და მის გვერდით (მარჯვნივ) ისრები */}
                      <div className="slide-content-item flex items-center gap-6">
                        {/* მთავარი ღილაკი */}
                        <button className="profile-button bg-[#fff1e6] text-[#2d1b4d] px-8 py-4 rounded-full flex items-center gap-6 font-bold text-lg hover:bg-white shrink-0">
                          პროფილში შესვლა
                          <div className="arrow-icon bg-[#f3713d] text-white p-2 rounded-full">
                            <ArrowRight size={20} />
                          </div>
                        </button>

                        {/* ნავიგაციის ისრები - განლაგებული ღილაკის მარჯვნივ */}
                        <div className="flex gap-3 items-center">
                          <button className="custom-prev w-14 h-14 bg-white/10 hover:bg-white/25 border border-white/30 rounded-full flex items-center justify-center transition-all group/btn">
                            <ArrowLeft size={22} className="group-hover/btn:text-[#f3713d] transition-colors" />
                          </button>
                          <button className="custom-next w-14 h-14 bg-white/10 hover:bg-white/25 border border-white/30 rounded-full flex items-center justify-center transition-all group/btn">
                            <ArrowRight size={22} className="group-hover/btn:text-[#f3713d] transition-colors" />
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Slider;