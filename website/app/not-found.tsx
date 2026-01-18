import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#1A1A1A]">
            {/* Background Artistic Element */}
            <div
                className="absolute inset-0 z-0 opacity-30 bg-cover bg-center grayscale"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000')" // High-end fashion shot
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-[#1A1A1A] z-10" />

            <div className="relative z-20 text-center px-4 max-w-3xl border-l border-r border-white/10 py-20 backdrop-blur-sm">
                <span className="text-secondary font-display italic text-2xl mb-4 block tracking-[0.2em] uppercase">
                    Error 404
                </span>

                <h1 className="text-6xl md:text-9xl font-display font-bold text-white mb-6 tracking-tighter leading-none">
                    Out of <br /> <span className="text-secondary italic">Frame</span>
                </h1>

                <p className="text-muted text-lg md:text-xl mb-12 max-w-md mx-auto font-light leading-relaxed italic">
                    "True style is never lost, but this page seems to have wandered off the runway."
                </p>

                <div className="flex flex-col items-center gap-6">
                    <Link
                        href="/"
                        className="group flex items-center gap-3 text-white font-display text-lg tracking-widest hover:text-secondary transition-colors"
                    >
                        <div className="w-12 h-[1px] bg-white group-hover:bg-secondary group-hover:w-16 transition-all" />
                        RETURN TO GALLERY
                    </Link>

                    <div className="mt-12">
                        <div className="grid grid-cols-3 gap-4 opacity-20">
                            <div className="w-20 h-[1px] bg-white" />
                            <div className="w-4 h-4 border border-white rounded-full flex items-center justify-center">
                                <div className="w-1 h-1 bg-white rounded-full" />
                            </div>
                            <div className="w-20 h-[1px] bg-white" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Aesthetic Border Elements */}
            <div className="absolute top-10 left-10 text-[10px] text-white/20 tracking-[0.5em] vertical-text hidden md:block" style={{ writingMode: 'vertical-rl' }}>
                CHERIF • ART • FASHION • LUXURY
            </div>
            <div className="absolute bottom-10 right-10 text-[10px] text-white/20 tracking-[0.5em] vertical-text hidden md:block" style={{ writingMode: 'vertical-rl' }}>
                ESTABLISHED • MMXXIV
            </div>
        </div>
    );
}
