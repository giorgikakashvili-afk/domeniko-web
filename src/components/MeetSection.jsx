import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ArrowRight, ArrowLeft, ArrowUpRight } from 'lucide-react';

import profesional from '../assets/main_img/profesional.jpg';

import 'swiper/css';
import 'swiper/css/navigation';

const MeetSection = () => {
    // სტეიტი იმისთვის, რომ ვიცოდეთ ბოლოშია თუ არა სლაიდერი
    const [isEnd, setIsEnd] = useState(false);

    const mentors = [
        { name: "პავლია ლომიაშვილი", title: "სამართლის მეცნიერებათა დოქტორი", desc: "პავლია ლომიაშვილის რეგალია, სად მუშაობს ან რამე მსგავსი.", img: profesional },
        { name: "ნინო ბერიშვილი", title: "სამართლის მაგისტრი", desc: "ნინო ბერიშვილის კვლევითი პროექტები და თანამშრომლობები", img: profesional },
        { name: "თამარ მაღლაკელიძე", title: "იურისპრუდენციის დოქტორი და სამგზის ჯიგარი", desc: "თამარ მაღლაკელიძის ინოვაციური გამოგონებები და აღიარებები", img: profesional },
        { name: "ლაშა ყიფიანი", title: "სამართლის მეცნიერების კანდიდატი", desc: "ლაშა ყიფიანის გარემოს დაცვის ინიციატივები და აქტივობები", img: profesional },
        { name: "გიორგი მახარაძე", title: "ბიზნესის ადმინისტრირება", desc: "წარმატებული სტარტაპების კონსულტანტი და მენტორი", img: profesional },
        { name: "ანა კაპანაძე", title: "ფსიქოლოგიის დოქტორი", desc: "განათლების ფსიქოლოგიისა და განვითარების ექსპერტი", img: profesional },
        { name: "დავით ერისთავი", title: "ეკონომიკის პროფესორი", desc: "საერთაშორისო ეკონომიკური ურთიერთობების სპეციალისტი", img: profesional },
    ];

    return (
        <section className="py-16 px-4 md:px-10 xl:px-20 font-noto overflow-hidden">
            <style>{`
                /* მხოლოდ მაშინ ადევს მასკა, როცა isEnd არის false */
                .is-fading {
                    -webkit-mask-image: linear-gradient(to right, black 85%, transparent 100%);
                    mask-image: linear-gradient(to right, black 85%, transparent 100%);
                }
                @media (max-width: 1024px) {
                    .is-fading {
                        -webkit-mask-image: linear-gradient(to right, black 75%, transparent 100%);
                        mask-image: linear-gradient(to right, black 75%, transparent 100%);
                    }
                }
            `}</style>

            <div className="flex flex-col md:flex-row justify-between items-center md:items-center mb-10 max-w-8xl mx-auto gap-4">
                <h2 className="text-3xl md:text-4xl font-black text-[#2d1b4d] uppercase leading-tight text-center md:text-left">
                    ვის შეხვდები <br className="md:hidden" /> დომენიკოსთან ერთად
                </h2>
                <button className="hidden md:flex items-center gap-2 bg-[#f3713d] text-white px-6 py-3 rounded-full font-bold transition-transform hover:scale-105 shadow-lg">
                    ყველას ნახვა
                    <ArrowUpRight size={20} />
                </button>
            </div>

            <div className="relative group max-w-8xl mx-auto">
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={20}
                    slidesPerView={1.2}
                    navigation={{
                        nextEl: '.meet-next-btn',
                        prevEl: '.meet-prev-btn',
                    }}
                    onSlideChange={(swiper) => setIsEnd(swiper.isEnd)} // როცა სლაიდი იცვლება
                    onReachEnd={() => setIsEnd(true)} // როცა ბოლოს მიაღწევს
                    onFromEdge={() => setIsEnd(false)} // როცა ნაპირიდან წამოვა (უკან დაბრუნებისას)
                    breakpoints={{
                        640: { slidesPerView: 2.2 },
                        1024: {
                            slidesPerView: 4.5,
                            spaceBetween: 24
                        }, 
                    }}
                    /* დინამიური კლასი: თუ ბოლოშია, ფეიდი ითიშება */
                    className={`overflow-visible transition-all duration-500 ${!isEnd ? 'is-fading' : ''}`}
                >
                    {mentors.map((mentor, index) => (
                        <SwiperSlide key={index} className="h-full">
                            <div className="bg-[#ffe4d1] rounded-[10px] p-5 flex flex-col h-130 transition-all duration-300 hover:shadow-xl border border-transparent hover:border-[#f3713d]/20 group/card">
                                
                                <div className="rounded-lg overflow-hidden mb-5 h-60 shrink-0">
                                    <img src={mentor.img} className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105" alt={mentor.name} />
                                </div>

                                <div className="flex flex-col">
                                    <h3 className="font-black text-xl mb-1 text-[#2d1b4d] uppercase leading-tight h-14 line-clamp-2">
                                        {mentor.name}
                                    </h3>
                                    <p className="text-[#f3713d] font-bold text-sm mb-3 leading-tight h-10 line-clamp-2">
                                        {mentor.title}
                                    </p>
                                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                                        {mentor.desc}
                                    </p>
                                </div>

                                <div className="mt-auto flex items-center justify-start">
                                    <button className="w-10 h-10 bg-[#f3713d] text-white rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#2d1b4d] hover:rotate-45">
                                        <ArrowUpRight size={18} />
                                    </button>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <button className="meet-prev-btn hidden md:flex absolute -left-7 top-1/2 -translate-y-1/2 z-50 w-14 h-14 bg-[#0A0521] text-white rounded-full justify-center items-center shadow-xl transition-all duration-300 hover:bg-[#f3713d] [&.swiper-button-disabled]:opacity-0">
                    <ArrowLeft size={24} className="w-7 h-7" />
                </button>

                <button className="meet-next-btn hidden md:flex absolute -right-7 top-1/2 -translate-y-1/2 z-50 w-14 h-14 bg-[#0A0521] text-white rounded-full justify-center items-center shadow-xl transition-all duration-300 hover:bg-[#f3713d] [&.swiper-button-disabled]:opacity-0">
                    <ArrowRight size={24} className="w-7 h-7" />
                </button>
            </div>

            <div className="flex justify-center md:hidden mt-8">
                <button className="w-full flex items-center justify-center gap-2 bg-[#f3713d] text-white px-6 py-4 rounded-full font-bold shadow-lg active:scale-95 transition-transform">
                    ყველას ნახვა
                    <ArrowUpRight size={20} />
                </button>
            </div>
        </section>
    );
};

export default MeetSection;