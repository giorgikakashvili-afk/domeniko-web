import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ArrowRight, ArrowLeft, ArrowUpRight, Loader2 } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';

const MeetSection = () => {
    const [mentors, setMentors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    useEffect(() => {
        const fetchSpeakers = async () => {
            try {
                // მოთხოვნა სპიკერების API-ზე
                const response = await fetch('https://rost.ge/api/speakers');
                const result = await response.json();
                setMentors(result.data); // ვინახავთ სპიკერებს
            } catch (error) {
                console.error("Error fetching speakers:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSpeakers();
    }, []);

    if (loading) {
        return (
            <div className="py-20 flex justify-center items-center">
                <Loader2 className="animate-spin text-[#f3713d]" size={40} />
            </div>
        );
    }

    return (
        <section className="py-16 px-4 md:px-10 xl:px-20 font-noto overflow-hidden">
            <style>{`
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

            <div className="flex flex-col md:flex-row justify-between items-center mb-10 max-w-8xl mx-auto gap-4">
                <h2 className="text-3xl md:text-7xl font-noto font-black text-[#2d1b4d] uppercase [font-variant-caps:all-petite-caps] leading-tight text-center md:text-left tracking-tight">
                    ვის შეხვდები <br className="md:hidden" /> დომენიკოსთან ერთად
                </h2>
                <button className="hidden md:flex items-center gap-2 bg-[#f3713d] text-white text-xl px-8 py-4 rounded-full font-black font-noto transition-all hover:scale-105 shadow-lg active:scale-95 uppercase [font-variant-caps:all-petite-caps]">
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
                    onSlideChange={(swiper) => setIsEnd(swiper.isEnd)}
                    onReachEnd={() => setIsEnd(true)}
                    onFromEdge={() => setIsEnd(false)}
                    breakpoints={{
                        640: { slidesPerView: 2.2 },
                        1024: {
                            slidesPerView: 4.2,
                            spaceBetween: 24
                        },
                    }}
                    className={`overflow-visible transition-all duration-500 ${!isEnd ? 'is-fading' : ''}`}
                >
                    {mentors.map((mentor) => (
                        <SwiperSlide key={mentor.id} className="h-auto">
                            <div className="bg-[#ffe4d1] rounded-[20px] p-5 flex flex-col h-full min-h-125 transition-all duration-300 hover:shadow-xl border-2 border-transparent hover:border-[#f3713d]/30 group/card">

                                <div className="rounded-xl overflow-hidden mb-5 shrink-0 shadow-inner bg-white/20 relative aspect-square">
                                    <img
                                        src={mentor.image_url}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                                        alt={mentor.name}
                                    />
                                </div>

                                <div className="flex flex-col flex-1">
                                    <h3 className="font-noto font-black text-xl mb-1 text-[#2d1b4d] uppercase [font-variant-caps:all-petite-caps] leading-tight min-h-[2.8rem] line-clamp-2">
                                        {mentor.name}
                                    </h3>
                                    {/* გამოგვაქვს პროფესიები API-დან */}
                                    <p className="font-noto text-[#f3713d] font-bold text-sm mb-3 leading-tight min-h-10 line-clamp-2 uppercase">
                                        {mentor.professions?.map(p => p.name).join(', ') || "პროფესიონალი მენტორი"}
                                    </p>
                                    <p className="font-noto text-[#4a4a4a] text-[13px] leading-relaxed line-clamp-4">
                                        {mentor.text}
                                    </p>
                                </div>

                                <div className="mt-6 flex items-center justify-start">
                                    <button className="w-12 h-12 bg-[#f3713d] text-white rounded-full flex items-center justify-center transition-all duration-500 hover:bg-[#2d1b4d] hover:rotate-360 shadow-md">
                                        <ArrowUpRight size={22} />
                                    </button>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <button className="meet-prev-btn hidden md:flex absolute -left-7 top-1/2 -translate-y-1/2 z-70 w-14 h-14 bg-[#0A0521] text-white rounded-full justify-center items-center shadow-xl transition-all duration-300 hover:bg-[#f3713d] disabled:opacity-0">
                    <ArrowLeft size={24} className="w-7 h-7" />
                </button>

                <button className="meet-next-btn hidden md:flex absolute -right-7 top-1/2 -translate-y-1/2 z-70 w-14 h-14 bg-[#0A0521] text-white rounded-full justify-center items-center shadow-xl transition-all duration-300 hover:bg-[#f3713d] disabled:opacity-0">
                    <ArrowRight size={24} className="w-7 h-7" />
                </button>
            </div>

            <div className="flex justify-center md:hidden mt-10">
                <button className="w-full font-noto font-black uppercase [font-variant-caps:all-petite-caps] flex items-center justify-center gap-2 bg-[#f3713d] text-white px-6 py-5 rounded-full shadow-lg active:scale-95 transition-transform">
                    ყველას ნახვა
                    <ArrowUpRight size={20} />
                </button>
            </div>
        </section>
    );
};

export default MeetSection;