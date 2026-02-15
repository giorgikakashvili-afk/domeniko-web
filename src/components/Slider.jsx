import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCreative, Parallax } from 'swiper/modules';
import { ArrowRight, ArrowLeft } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-creative';
import 'swiper/css/parallax';

import slbg from '../assets/main_img/slbg.jpg';
import slbgMobile from '../assets/main_img/slbgMobile.png';

const Slider = () => {
  const slides = [
    { step: "ნაბიჯი 1", title: "მოგზაურობა საკუთარ თავში", desc: "ყველა გზა შენით იწყება. აღმოაჩინე ვინ ხარ, რისი კეთება გიყვარს და რაში ხარ ძლიერი." },
    { step: "ნაბიჯი 2", title: "მოგზაურობა პროფესიათა სამყაროში", desc: "შეხვდი მათ, ვინც უკვე გაიარა ეს გზა, მოისმინე რეალური ისტორიები და დასვი შეკითხვები." },
    { step: "ნაბიჯი 3", title: "მოგზაურობა განათლების სამყაროში", desc: "გაიცანი განათლების მიღების შესაძლებლობები, აირჩიე სად და როგორ მიიღო საჭირო ცოდნა." },
    { step: "ნაბიჯი 4", title: "დომენიკო შენს გვერდით", desc: "დომენიკო არ გტოვებს მარტო. ყოველ ნაბიჯზე შენს გვერდით ვართ - ლამპრით, რომელიც გზას გინათებს." },
  ];

  return (
    <section className="py-40 overflow-hidden font-noto flex items-center justify-center">
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
    border-radius: 30px;
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
    font-size: 20px;
    z-index: 40;
    text-shadow: 
      0 4px 15px rgba(0,0,0,0.1),
      0 2px 8px rgba(243, 113, 61, 0.6),
      0 0 30px rgba(0,0,0,0.1);
    letter-spacing: 1px;
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

  @media (max-width: 767px) {
    .slider-wrapper {
      width: 100%;
      height: auto !important;
      max-width: 90%;
    }

    .main-swiper {
      height: auto !important;
    }

    .main-swiper .swiper-slide {
      height: auto !important; /* მობილურზე სიმაღლე შიგთავსზეა დამოკიდებული */
      opacity: 1 !important; /* მობილურზე ხშირად ჯობია opacity პრობლემების თავიდან ასაცილებლად */
    }

    .image-container {
       height: 300px !important; /* სურათის სიმაღლე მობილურზე */
    }
  }

  /* --- დესკტოპის ფიქსირებული ზომები --- */
  @media (min-width: 768px) {
    .slider-wrapper { width: 1122px; height: 567px; }
    .main-swiper { height: 100%; }
    .main-swiper .swiper-slide { height: 100%; }
  }
`}</style>



      <div className="slider-wrapper">
        <Swiper
          modules={[Navigation, EffectCreative, Parallax]}
          effect={'creative'}
          autoHeight={true}
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
              opacity: 0.6,
              shadow: false,

            },
            next: {
              translate: ['20%', 0, -120],
              scale: 0.88,
              opacity: 0.6,
              shadow: false,
            },
          }}
          className="main-swiper"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full md:h-full md:rounded-[60px] md:overflow-hidden shadow-2xl flex flex-col md:block">

                {/* სურათის ნაწილი */}
                <div className="relative h-75 md:h-full w-full shrink-0 overflow-hidden rounded-[40px] md:rounded-none">
                  {/* ეს გამოჩნდება მხოლოდ მობილურზე (Desktop-ზე დაიმალება) */}
                  <img
                    src={slbgMobile}
                    alt="Mobile Background"
                    className="bg-image w-full h-full object-cover md:hidden"
                    data-swiper-parallax="-100"
                  />
                  {/* ეს გამოჩნდება მხოლოდ Desktop-ზე (მობილურზე დაიმალება) */}
                  <img
                    src={slbg}
                    alt="Desktop Background"
                    className="bg-image w-full h-[90%] object-cover hidden md:block"
                    data-swiper-parallax="-100"
                  />
                  <div className="overlay-gradient absolute inset-0 z-1"></div>
                  <div className="side-title uppercase tracking-widest">{slide.title}</div>
                </div>

                {/* კონტენტის ნაწილი */}
                <div className="content-wrapper relative md:absolute inset-0 bg-[#f3713d] md:bg-transparent p-8 md:p-20 flex flex-col justify-center text-white z-10 -mt-10 md:mt-0 rounded-t-[10px] md:rounded-none md:h-full">
                  <div className="flex justify-center md:justify-end w-full">
                    <div className="w-full md:w-1/2 flex flex-col items-start text-left ">

                      {/* ნაბიჯი და ისრები - მობილურზე ერთ ხაზზე */}
                      <div className="flex items-center justify-between md:justify-start w-full gap-4 mb-4">
                        {/* მარცხენა ისარი (მხოლოდ მობილურზე ჩანს) */}
                        <button className="custom-prev md:hidden w-10 h-10 bg-white/20 border border-white/30 rounded-full flex items-center justify-center shrink-0 active:scale-90">
                          <ArrowLeft size={18} />
                        </button>

                        <span className="slide-content-item text-white md:text-[#f3713d] font-bold block text-xl mb-0">
                          {slide.step}
                        </span>

                        {/* მარჯვენა ისარი (მხოლოდ მობილურზე ჩანს) */}
                        <button className="custom-next md:hidden w-10 h-10 bg-white/20 border border-white/30 rounded-full flex items-center justify-center shrink-0 active:scale-90">
                          <ArrowRight size={18} />
                        </button>
                      </div>

                      {/* სათაური */}
                      <h2 className="slide-content-item text-3xl md:text-6xl  text-black md:text-white font-black mb-6 md:mb-8 drop-shadow-lg uppercase [font-variant-caps:all-petite-caps]">
                        {slide.title}
                      </h2>

                      {/* აღწერა */}
                      <p className="slide-content-item text-base md:text-lg text-black md:text-white leading-relaxed mb-10 max-w-lg">
                        {slide.desc}
                      </p>

                      {/* ღილაკი და დესკტოპის ისრები */}
                      <div className="slide-content-item flex flex-col md:flex-row items-center gap-6 w-full md:w-auto">
                        <button className="profile-button bg-white text-[#f3713d] md:bg-[#fff1e6] md:text-[#2d1b4d] xl:w-full md:w-auto py-2 px-5 md:px-8 md:py-4 rounded-full flex items-center justify-center gap-6 font-bold text-base md:text-lg shadow-lg">
                          პროფილში შესვლა
                          <div className="bg-[#f3713d] text-white p-2 rounded-full">
                            <ArrowRight size={20} />
                          </div>
                        </button>

                        {/* ისრები დესკტოპისთვის (მობილურზე დამალულია, რადგან ზემოთ ავიტანეთ) */}
                        <div className="hidden md:flex gap-3 items-center">
                          <button className="custom-prev w-12 h-12 md:w-14 md:h-14 bg-white/20 md:bg-white/10 border border-white/30 rounded-full flex items-center justify-center">
                            <ArrowLeft size={20} />
                          </button>
                          <button className="custom-next w-12 h-12 md:w-14 md:h-14 bg-white/20 md:bg-white/10 border border-white/30 rounded-full flex items-center justify-center">
                            <ArrowRight size={20} />
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