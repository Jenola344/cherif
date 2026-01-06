import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getCategories() {
  try {
    return await prisma.category.findMany();
  } catch (e) {
    console.error("Fetch error", e);
    return [];
  }
}

export default async function Home() {
  const categories = await getCategories();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-[#2C1E18]">
        <div
          className="absolute inset-0 z-0 opacity-40 bg-cover bg-center transition-transform duration-[10s] hover:scale-105"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2000')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#2C1E18]/80 z-10" />

        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <span className="text-secondary font-display italic text-xl mb-6 block tracking-wider animate-in fade-in slide-in-from-bottom-4 duration-700">
            Welcome to Cherif
          </span>
          <h1 className="text-5xl md:text-8xl font-display font-bold text-white mb-8 tracking-tighter leading-none animate-in fade-in slide-in-from-bottom-8 duration-1000">
            Where Art Meets <br /> Modern Luxury
          </h1>
          <p className="text-muted text-lg md:text-xl mb-12 max-w-2xl mx-auto opacity-90 font-light animate-in fade-in slide-in-from-bottom-12 duration-1000">
            Discover a curated collection of contemporary masterpieces and bespoke interior designs tailored for the discerning eye.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-16 duration-1000">
            <Link
              href="/gallery"
              className="bg-primary hover:bg-primary/90 text-white px-10 py-5 rounded-full font-bold text-sm uppercase tracking-widest transition-all hover:scale-105 active:scale-95 flex items-center group"
            >
              Explore Collection
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/services"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-10 py-5 rounded-full font-bold text-sm uppercase tracking-widest transition-all hover:scale-105 active:scale-95"
            >
              Interior Services
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 bg-background">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 space-y-4 md:space-y-0">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">The Collections</h2>
              <p className="text-muted-foreground italic font-light">Explore our diverse styles, from minimalist strokes to vibrant cultural heritage.</p>
            </div>
            <Link href="/gallery" className="text-primary font-bold text-sm uppercase tracking-widest flex items-center hover:opacity-70 transition-opacity">
              View All Collections <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/gallery?category=${cat.id}`}
                className="group relative h-[450px] overflow-hidden rounded-2xl bg-muted"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('https://picsum.photos/seed/${cat.slug}/800/1000')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-70 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-0 left-0 p-8 z-20 w-full transform transition-transform duration-500 group-hover:-translate-y-2">
                  <h3 className="text-2xl font-display font-bold text-white mb-2">{cat.title}</h3>
                  <p className="text-white/70 text-sm font-light mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-2">
                    {cat.description}
                  </p>
                  <div className="h-0.5 w-12 bg-secondary transition-all duration-500 group-hover:w-full" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Visualizer CTA */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/10 -skew-x-12 transform translate-x-1/2" />
        <div className="container px-4 relative z-10">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">See it in your room</h2>
            <p className="text-lg md:text-xl font-light mb-10 opacity-90 leading-relaxed">
              Unsure which piece fits your space? Our AI-powered Room Visualizer lets you upload a photo of your wall and virtually place any artwork to see the magic.
            </p>
            <Link
              href="/visualizer"
              className="inline-block bg-secondary hover:bg-secondary/90 text-primary px-10 py-5 rounded-full font-bold text-sm uppercase tracking-widest transition-all hover:scale-105"
            >
              Try Room Visualizer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
