import Image from "next/image";
import { getPlaceholderImage } from "@/lib/placeholder-images";

export default function AboutPage() {
  const aboutImage = getPlaceholderImage('about-us-image');

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-headline text-foreground">Our Story</h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Cherif's Gallery was born from a passion for art and a belief that everyone deserves to live in a space that inspires them. We travel the world to curate a diverse collection of art, from emerging talents to established masters, ensuring that every piece tells a unique story.
            </p>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Our mission is to make art accessible. We're more than just a gallery; we're a hub for creativity, connecting artists with art lovers and helping you find the perfect piece to complement your lifestyle. We believe that art is not just decoration, but a reflection of who you are.
            </p>
          </div>
          <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-xl">
             <Image
                src={aboutImage.imageUrl}
                alt={aboutImage.description}
                fill
                className="object-cover"
                data-ai-hint={aboutImage.imageHint}
              />
          </div>
        </div>
      </div>
    </div>
  );
}
