'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Upload, Maximize2, Move, Layers, Info } from 'lucide-react';

export default function VisualizerPage() {
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);

    return (
        <div className="bg-background min-h-screen">
            <section className="bg-primary py-20 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/10 skew-x-12 transform translate-x-1/2"></div>
                <div className="container px-4 relative z-10">
                    <div className="max-w-3xl">
                        <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 italic">Paint Your Room</h1>
                        <p className="text-xl text-secondary/80 font-light max-w-xl leading-relaxed">
                            Upload a photo of your space and see how our artworks transform your walls instantly.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-24">
                <div className="container px-4">
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 items-start">
                        {/* Editor Area */}
                        <div className="xl:col-span-2 space-y-8">
                            <div className="relative aspect-video bg-muted rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl flex items-center justify-center group">
                                {uploadedImage ? (
                                    <Image src={uploadedImage} alt="Your Room" fill className="object-cover" />
                                ) : (
                                    <div className="text-center p-12">
                                        <div className="h-24 w-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
                                            <Upload className="h-10 w-10 text-primary" />
                                        </div>
                                        <h3 className="text-2xl font-display font-bold mb-4">Start visualizing</h3>
                                        <p className="text-muted-foreground mb-8">Click the button below to upload a photo of your wall.</p>
                                        <label className="bg-primary text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm cursor-pointer hover:bg-primary/90 transition-all shadow-lg">
                                            <span>Upload Wall Photo</span>
                                            <input type="file" className="hidden" onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) setUploadedImage(URL.createObjectURL(file));
                                            }} />
                                        </label>
                                    </div>
                                )}

                                {uploadedImage && (
                                    <div className="absolute bottom-8 right-8 flex space-x-4">
                                        <button className="h-12 w-12 bg-white/90 backdrop-blur text-primary rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all">
                                            <Maximize2 className="h-5 w-5" />
                                        </button>
                                        <button className="h-12 w-12 bg-white/90 backdrop-blur text-primary rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all">
                                            <Move className="h-5 w-5" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="bg-amber-50 rounded-2xl p-6 flex items-start space-x-4 border border-amber-100">
                                <Info className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
                                <div className="text-sm text-amber-900 leading-relaxed">
                                    <p className="font-bold mb-1">PRO TIP:</p>
                                    <p>For the best results, take the photo from a straight-on perspective in bright, indirect natural light.</p>
                                </div>
                            </div>
                        </div>

                        {/* Controls/Steps */}
                        <div className="space-y-8">
                            <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-xl border border-border/50">
                                <h3 className="text-xl font-display font-bold mb-8 flex items-center">
                                    <Layers className="h-5 w-5 mr-3 text-secondary" /> Steps to Visualize
                                </h3>
                                <div className="space-y-10">
                                    {[
                                        { step: '01', title: 'Capture', text: 'Take a high-res photo of the wall you wish to decorate.' },
                                        { step: '02', title: 'Upload', text: 'Use the editor to upload your image to our secure tool.' },
                                        { step: '03', title: 'Select Art', text: 'Browse our collection and "drag" pieces onto your wall.' },
                                        { step: '04', title: 'Refine', text: 'Adjust the size and framing to match your real-world dimensions.' }
                                    ].map((s, i) => (
                                        <div key={i} className="flex items-start space-x-6">
                                            <span className="text-4xl font-display font-bold text-primary/10 leading-none">{s.step}</span>
                                            <div>
                                                <h4 className="font-bold text-sm uppercase tracking-widest text-primary mb-1">{s.title}</h4>
                                                <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full mt-12 border-2 border-primary text-primary py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-primary hover:text-white transition-all">
                                    Save Visualization
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
