import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ArrowRight, ArrowLeft, ArrowUpRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SpeakerModal from '../components/SpeakerModal';

import 'swiper/css';
import 'swiper/css/navigation';

const MeetSection = ({ professionId }) => { // დაემატა professionId props-ად
    const [mentors, setMentors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const [selectedSpeakerId, setSelectedSpeakerId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSpeakers = async () => {
            try {
                const response = await fetch('https://rost.ge/api/speakers');
                const result = await response.json();
                let allSpeakers = result.data || [];

                // ფილტრაციის ლოგიკა: თუ professionId არსებობს, ვტოვებთ მხოლოდ იმ სპიკერებს, 
                // რომლებსაც ეს პროფესია აქვთ მინიჭებული
                if (professionId) {
                    allSpeakers = allSpeakers.filter(speaker =>
                        speaker.professions?.some(p => String(p.id) === String(professionId))
                    );
                }

                setMentors(allSpeakers);
            } catch (error) {
                console.error("Error fetching speakers:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSpeakers();
    }, [professionId]); // ეფექტი თავიდან გაეშვება, თუ professionId შეიცვლება

    if (loading) {
        return (
            <div className="py-20 flex justify-center items-center">
                <Loader2 className="animate-spin text-[#f3713d]" size={40} />
            </div>
        );
    }

    // თუ კონკრეტულ პროფესიაზე არცერთი სპიკერი არ არის, სექცია არ გამოჩნდეს
    if (mentors.length === 0 && professionId) return null;

    return (
        <section className="py-16 px-4 md:px-10 xl:px-20 font-noto overflow-hidden">
            <SpeakerModal
                speakerId={selectedSpeakerId}
                onClose={() => setSelectedSpeakerId(null)}
            />

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
                    {professionId ? "ამ პროფესიის სპიკერები" : "ვის შეხვდები დომენიკოსთან ერთად"}
                </h2>
                {!professionId && (
                    <button
                        onClick={() => navigate('/speakers')}
                        className="hidden md:flex items-center gap-2 bg-[#f3713d] text-white text-xl px-8 py-4 rounded-full font-black font-noto transition-all hover:scale-105 shadow-lg active:scale-95 uppercase [font-variant-caps:all-petite-caps]"
                    >
                        ყველას ნახვა
                        <ArrowUpRight size={20} />
                    </button>
                )}
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
                            <div
                                onClick={() => setSelectedSpeakerId(mentor.id)}
                                className="cursor-pointer bg-[#ffe4d1] rounded-[20px] p-5 flex flex-col h-full min-h-125 transition-all duration-300 hover:shadow-xl border-2 border-transparent hover:border-[#f3713d]/30 group/card"
                            >

                                <div className="rounded-xl overflow-hidden mb-5 shrink-0 shadow-inner bg-white/20 relative aspect-square">
                                    <img
                                        src={mentor.image_url}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                                        alt={mentor.name}
                                    />
                                </div>

                                <div className="flex flex-col flex-1 font-noto">
                                    <h3 className="font-black text-xl mb-1 text-[#2d1b4d] uppercase [font-variant-caps:all-petite-caps] leading-tight min-h-[2.8rem] line-clamp-2 italic">
                                        {mentor.name}
                                    </h3>
                                    <p className="text-[#f3713d] font-bold text-sm mb-3 leading-tight min-h-10 line-clamp-2 uppercase italic">
                                        {mentor.professions?.map(p => p.name).join(', ') || "პროფესიონალი მენტორი"}
                                    </p>
                                    <div
                                        className="text-[#4a4a4a] leading-relaxed text-base md:text-lg font-medium pr-4 custom-scrollbar"
                                        dangerouslySetInnerHTML={{ __html: mentor.text }}
                                    />
                                </div>

                                <div className="mt-6 flex items-center justify-start">
                                    <div className="w-12 h-12 bg-[#f3713d] text-white rounded-full flex items-center justify-center transition-all duration-500 group-hover/card:bg-[#2d1b4d] group-hover/card:rotate-45 shadow-md">
                                        <ArrowUpRight size={22} />
                                    </div>
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

            {!professionId && (
                <div className="flex justify-center md:hidden mt-10">
                    <button
                        onClick={() => navigate('/speakers')}
                        className="w-full font-noto font-black uppercase [font-variant-caps:all-petite-caps] flex items-center justify-center gap-2 bg-[#f3713d] text-white px-6 py-5 rounded-full shadow-lg active:scale-95 transition-transform"
                    >
                        ყველას ნახვა
                        <ArrowUpRight size={20} />
                    </button>
                </div>
            )}
        </section>
    );
};

export default MeetSection;