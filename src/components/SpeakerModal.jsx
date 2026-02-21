import React, { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';

const SpeakerModal = ({ speakerId, onClose }) => {
    const [speaker, setSpeaker] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://rost.ge/api/speakers/${speakerId}`);
                const result = await response.json();
                setSpeaker(result.data || result);
            } catch (error) {
                console.error("Error fetching speaker details:", error);
            } finally {
                setLoading(false);
            }
        };

        if (speakerId) fetchDetails();
    }, [speakerId]);

    if (!speakerId) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-[#2d1b4d]/40 backdrop-blur-md transition-all duration-300"
            onClick={handleBackdropClick}
        >
            {/* აქ წავშალე h-[90vh] და დავტოვე ბუნებრივი სიმაღლე */}
            <div className="bg-white w-full max-w-6xl rounded-[40px] overflow-hidden relative shadow-2xl flex flex-col md:flex-row max-h-[95vh]">

                {/* დახურვის ღილაკი */}
                <button
                    onClick={onClose}
                    className="absolute right-6 top-6 z-20 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all hover:rotate-90"
                >
                    <X size={24} className="text-[#2d1b4d]" />
                </button>

                {loading ? (
                    <div className="flex-1 flex items-center justify-center min-h-[400px]">
                        <Loader2 className="animate-spin text-[#f3713d]" size={40} />
                    </div>
                ) : speaker && (
                    <>
                        {/* მარცხენა მხარე - სურათი (ის განსაზღვრავს სიმაღლეს) */}
                        <div className="md:w-5/12 relative bg-[#ffe4d1] flex">
                            <img
                                src={speaker.image_url}
                                className="w-full h-full object-cover block"
                                alt={speaker.name}
                            />
                        </div>

                        {/* მარჯვენა მხარე - ინფორმაცია (ის ერგება სურათის სიმაღლეს) */}
                        <div className="md:w-7/12 p-8 md:p-14 overflow-y-auto flex flex-col font-noto bg-white">
                            <div className="my-auto"> {/* ცენტრისთვის, თუ ტექსტი ცოტაა */}
                                <h2 className="text-[#2d1b4d] font-black text-3xl md:text-5xl uppercase [font-variant-caps:all-petite-caps] mb-2 leading-tight italic">
                                    {speaker.name}
                                </h2>
                                <p className="text-[#f3713d] font-black text-lg md:text-xl mb-8 uppercase italic">
                                    {speaker.professions?.map(p => p.name).join(', ') || "სპიკერი"}
                                </p>

                                <div
                                    className="text-[#4a4a4a] leading-relaxed text-base md:text-lg font-medium pr-4 custom-scrollbar"
                                    dangerouslySetInnerHTML={{ __html: speaker.text }}
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #f3713d; border-radius: 10px; }
            `}</style>
        </div>
    );
};

export default SpeakerModal;