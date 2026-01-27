'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Upload, Maximize2, Move, Layers, Info, X, Minus, Plus, ShoppingCart } from 'lucide-react';
import axios from 'axios';
import { Button } from '@/components/ui/button';

interface Artwork {
    id: string;
    title: string;
    imageUrl: string;
}

export default function VisualizerPage() {
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [artworks, setArtworks] = useState<Artwork[]>([]);
    const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
    const [position, setPosition] = useState({ x: 40, y: 30 }); // Percentage
    const [scale, setScale] = useState(0.4);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const wallRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        axios.get('/api/artworks').then(res => {
            setArtworks(res.data);
            // Default to first artwork if none selected
            if (res.data.length > 0 && !selectedArtwork) {
                setSelectedArtwork(res.data[0]);
            }
        });
    }, []);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!selectedArtwork) return;
        setIsDragging(true);
        setDragStart({ x: e.clientX, y: e.clientY });
        e.preventDefault();
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !wallRef.current) return;

        const rect = wallRef.current.getBoundingClientRect();
        const dx = (e.clientX - dragStart.x) / rect.width * 100;
        const dy = (e.clientY - dragStart.y) / rect.height * 100;

        setPosition(prev => ({
            x: Math.min(Math.max(prev.x + dx, 0), 100),
            y: Math.min(Math.max(prev.y + dy, 0), 100)
        }));
        setDragStart({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => setIsDragging(false);

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mouseup', handleMouseUp);
            return () => window.removeEventListener('mouseup', handleMouseUp);
        }
    }, [isDragging]);

    return (
        <div className="bg-[#FDFCFB] min-h-screen">
            <section className="bg-primary pt-32 pb-20 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/10 skew-x-12 transform translate-x-1/2"></div>
                <div className="container px-4 relative z-10">
                    <div className="max-w-3xl">
                        <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 italic">Wall Visualizer</h1>
                        <p className="text-xl text-secondary/80 font-light max-w-xl leading-relaxed">
                            Upload a photo of your space and curate your personal gallery. Drag and resize to find the perfect fit.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-24">
                <div className="container px-4">
                    <div className="grid grid-cols-1 xl:grid-cols-4 gap-12 items-start">
                        {/* Editor Area */}
                        <div className="xl:col-span-3 space-y-8">
                            <div
                                ref={wallRef}
                                onMouseMove={handleMouseMove}
                                className="relative aspect-video bg-muted rounded-[3rem] overflow-hidden border-[12px] border-white shadow-2xl flex items-center justify-center group select-none"
                            >
                                {uploadedImage ? (
                                    <Image src={uploadedImage} alt="Your Room" fill className="object-cover pointer-events-none" />
                                ) : (
                                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1513519245088-0e12902e35ca?q=80&w=2000')] bg-cover bg-center brightness-90">
                                        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] flex items-center justify-center">
                                            <div className="text-center text-white bg-black/40 p-8 rounded-3xl backdrop-blur-md border border-white/20">
                                                <h3 className="text-2xl font-display font-bold mb-4">Sample Living Room</h3>
                                                <p className="mb-6 opacity-80">Upload your own wall photo for a personalized experience.</p>
                                                <label className="bg-white text-primary px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs cursor-pointer hover:bg-white/90 transition-all shadow-lg inline-block">
                                                    <span>Upload Your Wall</span>
                                                    <input type="file" className="hidden" onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) setUploadedImage(URL.createObjectURL(file));
                                                    }} />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Artwork placement */}
                                {selectedArtwork && (
                                    <div
                                        className={`absolute shadow-2xl transition-transform ${isDragging ? 'scale-105 cursor-grabbing' : 'cursor-grab'}`}
                                        style={{
                                            left: `${position.x}%`,
                                            top: `${position.y}%`,
                                            width: `${scale * 100}%`,
                                            maxWidth: '80%',
                                            transform: 'translate(-50%, -50%)',
                                            zIndex: 20
                                        }}
                                        onMouseDown={handleMouseDown}
                                    >
                                        <div className="relative border-[1.5rem] border-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] bg-white">
                                            <div className="relative aspect-auto">
                                                <img
                                                    src={selectedArtwork.imageUrl}
                                                    alt={selectedArtwork.title}
                                                    className="w-full h-auto block"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Controls Overlay */}
                                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center space-x-6 bg-black/40 backdrop-blur-xl p-4 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="flex items-center space-x-2 px-4 border-r border-white/20">
                                        <button
                                            onClick={() => setScale(prev => Math.max(0.1, prev - 0.05))}
                                            className="p-2 hover:bg-white/10 rounded-full text-white"
                                        >
                                            <Minus className="h-4 w-4" />
                                        </button>
                                        <span className="text-xs font-bold text-white w-12 text-center">Scale {Math.round(scale * 100)}%</span>
                                        <button
                                            onClick={() => setScale(prev => Math.min(1.5, prev + 0.05))}
                                            className="p-2 hover:bg-white/10 rounded-full text-white"
                                        >
                                            <Plus className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <button
                                        className="text-white text-xs font-bold uppercase tracking-widest px-4 hover:text-secondary transition-colors"
                                        onClick={() => { setPosition({ x: 50, y: 50 }); setScale(0.4); }}
                                    >
                                        Reset
                                    </button>
                                </div>
                            </div>

                            <div className="bg-amber-50 rounded-3xl p-8 flex items-start space-x-6 border border-amber-100 shadow-sm">
                                <div className="p-3 bg-amber-500/10 rounded-2xl">
                                    <Info className="h-6 w-6 text-amber-600" />
                                </div>
                                <div className="text-amber-900 leading-relaxed">
                                    <p className="font-bold text-lg mb-1">Curation Tip</p>
                                    <p className="font-light">The center of the artwork should ideally be about 57 to 60 inches from the floor (eye level). Use the drag tool to position it accordingly relative to your furniture.</p>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar: Artwork Selection */}
                        <div className="space-y-8 sticky top-32">
                            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-border/50">
                                <h3 className="text-2xl font-display font-bold mb-8 flex items-center text-primary">
                                    <Layers className="h-6 w-6 mr-3 text-secondary" /> Select Artwork
                                </h3>

                                <div className="grid grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                                    {artworks.map((art) => (
                                        <button
                                            key={art.id}
                                            onClick={() => setSelectedArtwork(art)}
                                            className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all ${selectedArtwork?.id === art.id
                                                ? 'border-primary ring-4 ring-primary/20 scale-95'
                                                : 'border-transparent hover:border-primary/50'
                                                }`}
                                        >
                                            <Image
                                                src={art.imageUrl}
                                                alt={art.title}
                                                fill
                                                className="object-cover"
                                            />
                                            {selectedArtwork?.id === art.id && (
                                                <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                                                    <div className="bg-white p-1 rounded-full">
                                                        <Plus className="h-4 w-4 text-primary" />
                                                    </div>
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>

                                {selectedArtwork && (
                                    <div className="mt-12 space-y-4 animate-in fade-in slide-in-from-bottom-4">
                                        <h4 className="font-display text-xl font-bold text-primary">{selectedArtwork.title}</h4>
                                        <Link
                                            href={`/gallery`}
                                            className="w-full bg-primary text-white py-6 rounded-2xl flex items-center justify-center font-bold uppercase tracking-widest text-sm hover:bg-primary/90 transition-all shadow-lg"
                                        >
                                            View Details
                                            <ChevronRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {uploadedImage && (
                                <Button
                                    variant="outline"
                                    className="w-full py-6 rounded-2xl border-2 border-primary text-primary hover:bg-primary hover:text-white"
                                    onClick={() => setUploadedImage(null)}
                                >
                                    Remove Wall Photo
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

function ChevronRight(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m9 18 6-6-6-6" />
        </svg>
    )
}
