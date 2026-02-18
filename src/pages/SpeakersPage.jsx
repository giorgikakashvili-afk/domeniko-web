import React, { useState, useEffect } from 'react';
import { Search, ArrowUpRight, Loader2, SearchX } from 'lucide-react';
import SpeakerModal from '../components/SpeakerModal'; // შემოვიტანოთ მოდალი

const SpeakersPage = () => {
    const [speakers, setSpeakers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');
    const [selectedSpeakerId, setSelectedSpeakerId] = useState(null); // სტეიტი მოდალისთვის

    useEffect(() => {
        const fetchSpeakers = async () => {
            try {
                const response = await fetch('https://rost.ge/api/speakers');
                const result = await response.json();
                setSpeakers(result.data || result);
            } catch (error) {
                console.error("Error fetching speakers:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSpeakers();
    }, []);

    const filteredSpeakers = speakers.filter(speaker => {
        const matchesSearch = speaker.name.toLowerCase().includes(searchQuery.toLowerCase());
        if (activeFilter === 'all') return matchesSearch;

        const professions = speaker.professions || [];
        const hasHigher = professions.some(p => p.name.toLowerCase().includes('უმაღლეს'));
        const hasVocational = professions.some(p => p.name.toLowerCase().includes('პროფესიულ'));

        if (activeFilter === 'higher') return matchesSearch && hasHigher;
        if (activeFilter === 'vocational') return matchesSearch && hasVocational;
        return matchesSearch;
    });

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#fff4ec]">
                <Loader2 className="w-12 h-12 text-[#f3713d] animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fff4ec] py-10 px-4 md:px-10 lg:px-20 font-noto">

            {/* აქ ჩაჯდება მოდალი */}
            <SpeakerModal
                speakerId={selectedSpeakerId}
                onClose={() => setSelectedSpeakerId(null)}
            />

            <div className="max-w-8xl mx-auto mb-12">
                <h1 className="text-4xl md:text-7xl font-black text-[#2d1b4d] uppercase [font-variant-caps:all-petite-caps] mb-8 italic tracking-tighter">
                    ყველა სპიკერი
                </h1>

                <div className="flex flex-wrap items-center gap-3 mb-8">
                    <button
                        onClick={() => setActiveFilter('all')}
                        className={`px-8 py-2 rounded-full font-black text-sm uppercase italic transition-all ${activeFilter === 'all' ? 'bg-[#f3713d] text-white' : 'bg-white text-[#2d1b4d] border border-gray-100 shadow-sm'}`}
                    >
                        ყველა
                    </button>
                    <button
                        onClick={() => setActiveFilter('higher')}
                        className={`px-6 py-2 rounded-full font-black text-sm uppercase italic transition-all shadow-sm ${activeFilter === 'higher' ? 'bg-[#f3713d] text-white' : 'bg-white text-[#2d1b4d] border border-gray-100'}`}
                    >
                        უმაღლესი განათლება
                    </button>
                    <button
                        onClick={() => setActiveFilter('vocational')}
                        className={`px-6 py-2 rounded-full font-black text-sm uppercase italic transition-all shadow-sm ${activeFilter === 'vocational' ? 'bg-[#f3713d] text-white' : 'bg-white text-[#2d1b4d] border border-gray-100'}`}
                    >
                        პროფესიული განათლება
                    </button>
                </div>

                <div className="relative max-w-8xl">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#f3713d]">
                        <Search size={22} />
                    </div>
                    <input
                        type="text"
                        placeholder="მოძებნე შენი მენტორი..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white py-5 pl-14 pr-8 rounded-[25px] shadow-sm outline-none border-2 border-transparent focus:border-[#f3713d]/20 transition-all font-bold text-[#2d1b4d]"
                    />
                </div>
            </div>

            {filteredSpeakers.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-8xl mx-auto">
                    {filteredSpeakers.map((speaker) => (
                        <div
                            key={speaker.id}
                            onClick={() => setSelectedSpeakerId(speaker.id)} // დაჭერაზე ვაღებთ მოდალს
                            className="bg-[#ffe4d1] rounded-[20px] p-5 flex flex-col h-full cursor-pointer transition-all duration-300 hover:shadow-2xl border-2 border-transparent hover:border-[#f3713d]/30 group/card"
                        >
                            <div className="rounded-xl overflow-hidden mb-5 shrink-0 shadow-inner bg-white/20 relative aspect-square">
                                <img
                                    src={speaker.image_url}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                                    alt={speaker.name}
                                />
                            </div>

                            <div className="flex flex-col flex-1">
                                <h3 className="font-noto font-black text-xl mb-1 text-[#2d1b4d] uppercase [font-variant-caps:all-petite-caps] leading-tight min-h-[2.8rem] line-clamp-2 italic">
                                    {speaker.name}
                                </h3>
                                <p className="font-noto text-[#f3713d] font-bold text-sm mb-3 leading-tight min-h-10 line-clamp-2 uppercase italic">
                                    {speaker.professions?.map(p => p.name).join(', ') || "პროფესიონალი მენტორი"}
                                </p>
                                <div
                                    className="text-[#4a4a4a] leading-relaxed text-base md:text-lg font-medium pr-4 custom-scrollbar"
                                    dangerouslySetInnerHTML={{ __html: speaker.text }}
                                />
                            </div>

                            <div className="mt-6 flex items-center justify-start">
                                <div className="w-12 h-12 bg-[#f3713d] text-white rounded-full flex items-center justify-center transition-all duration-500 group-hover/card:bg-[#2d1b4d] group-hover/card:rotate-45 shadow-md">
                                    <ArrowUpRight size={22} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 opacity-30">
                    <SearchX size={64} />
                    <p className="text-2xl font-black mt-4 uppercase italic">სპიკერი ვერ მოიძებნა</p>
                </div>
            )}
        </div>
    );
};

export default SpeakersPage;