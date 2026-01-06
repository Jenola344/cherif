import { getPlaceholderImage } from "@/lib/placeholder-images";
import StyleTransfer from "@/components/service/StyleTransfer";
import Image from "next/image";

export default function OurServicePage() {
  const serviceImage = getPlaceholderImage('our-service-image');

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-24">
       <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-16">
        <div className="relative h-80 md:h-96 w-full rounded-lg overflow-hidden shadow-xl order-last md:order-first">
             <Image
                src={serviceImage.imageUrl}
                alt={serviceImage.description}
                fill
                className="object-cover"
                data-ai-hint={serviceImage.imageHint}
              />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-headline text-foreground">Visualize Art in Your Space</h1>
            <p className="mt-4 md:mt-6 text-md md:text-lg text-muted-foreground leading-relaxed">
              Ever wonder how a piece of art will look in your room? Our revolutionary AI-powered tool allows you to find out instantly. Simply upload a picture of your space and select an artwork from our collection to see a stylized preview.
            </p>
            <p className="mt-4 text-md md:text-lg text-muted-foreground leading-relaxed">
              This is the future of interior design. Make confident decisions and find the perfect art that truly belongs in your home.
            </p>
          </div>
        </div>
      <StyleTransfer />
    </div>
  );
}
