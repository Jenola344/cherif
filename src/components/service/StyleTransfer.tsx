'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { artworkStyleTransfer } from '@/ai/flows/artwork-style-transfer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Upload, Wand2, Loader2 } from 'lucide-react';
import { getPlaceholderImage } from '@/lib/placeholder-images';

// A few artworks to use as style examples
const styleArtworks = [
    getPlaceholderImage('service-art-1'),
    getPlaceholderImage('service-art-2'),
    getPlaceholderImage('service-art-3'),
    getPlaceholderImage('service-art-4'),
];

const fileToDataUri = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const imageUrlToDataUri = async (url: string): Promise<string> => {
  // Use a proxy to fetch images from picsum.photos to avoid CORS issues in browser
  const response = await fetch(`https://images.weserv.nl/?url=${encodeURIComponent(url.replace("https://", ""))}`);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export default function StyleTransfer() {
  const [roomImage, setRoomImage] = useState<string | null>(null);
  const [selectedArtworkUrl, setSelectedArtworkUrl] = useState<string>(styleArtworks[0].imageUrl);
  const [styledImage, setStyledImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const roomImageInputRef = useRef<HTMLInputElement>(null);

  const handleRoomImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const dataUri = await fileToDataUri(file);
        setRoomImage(dataUri);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Image Upload Failed',
          description: 'Could not read the selected image file.',
        });
      }
    }
  };

  const handleApplyStyle = async () => {
    if (!roomImage || !selectedArtworkUrl) {
      toast({
        variant: 'destructive',
        title: 'Missing Images',
        description: 'Please upload a room image and select an artwork style.',
      });
      return;
    }

    setIsLoading(true);
    setStyledImage(null);

    try {
      const artworkDataUri = await imageUrlToDataUri(selectedArtworkUrl);

      const response = await artworkStyleTransfer({
        roomImage: roomImage,
        artworkImage: artworkDataUri,
      });

      if (response && response.styledImage) {
        setStyledImage(response.styledImage);
      } else {
        throw new Error('The AI model did not return an image.');
      }
    } catch (error) {
      console.error('Style transfer failed:', error);
      toast({
        variant: 'destructive',
        title: 'Style Transfer Failed',
        description:
          (error as Error).message ||
          'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6 md:p-8 border-2 border-dashed border-border/50 bg-secondary/10">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Step 1 & 2 */}
          <div className="space-y-6">
             {/* Step 1: Upload Room */}
             <div>
                <Label className="text-lg font-semibold flex items-center mb-2"><span className="text-primary mr-2 font-bold">1.</span> Upload Your Room</Label>
                <div 
                    className="relative w-full h-48 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-muted"
                    onClick={() => roomImageInputRef.current?.click()}
                >
                    {roomImage ? (
                        <Image src={roomImage} alt="Your room" fill className="object-contain p-2" />
                    ) : (
                        <div className="text-center text-muted-foreground">
                            <Upload className="h-8 w-8 mx-auto mb-2" />
                            <p>Click to upload image</p>
                        </div>
                    )}
                    <Input
                        ref={roomImageInputRef}
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleRoomImageChange}
                    />
                </div>
            </div>

            {/* Step 2: Select Style */}
            <div>
                <Label className="text-lg font-semibold flex items-center mb-2"><span className="text-primary mr-2 font-bold">2.</span> Select an Art Style</Label>
                <div className="grid grid-cols-4 gap-2">
                {styleArtworks.map((artwork) => (
                    <div 
                        key={artwork.id}
                        className={`relative aspect-square rounded-md overflow-hidden cursor-pointer ring-2 ${selectedArtworkUrl === artwork.imageUrl ? 'ring-primary' : 'ring-transparent'}`}
                        onClick={() => setSelectedArtworkUrl(artwork.imageUrl)}
                    >
                        <Image src={artwork.imageUrl} alt={artwork.description} fill className="object-cover" data-ai-hint={artwork.imageHint}/>
                    </div>
                ))}
                </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-center items-center">
             <Button size="lg" onClick={handleApplyStyle} disabled={isLoading || !roomImage}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Applying Style...
                  </>
                ) : (
                    <>
                    <Wand2 className="mr-2 h-5 w-5" />
                    Visualize Now
                    </>
                )}
            </Button>
          </div>
          
          {/* Step 3: Result */}
          <div>
            <Label className="text-lg font-semibold flex items-center mb-2"><span className="text-primary mr-2 font-bold">3.</span> Your Styled Room</Label>
            <div className="relative w-full h-72 border-2 border-dashed rounded-lg flex items-center justify-center bg-muted/50">
                {isLoading && (
                    <div className="text-center text-muted-foreground">
                        <Loader2 className="h-8 w-8 mx-auto mb-2 animate-spin" />
                        <p>Generating your preview...</p>
                    </div>
                )}
                {!isLoading && styledImage && (
                    <Image src={styledImage} alt="Room with artwork style applied" fill className="object-contain p-2" />
                )}
                {!isLoading && !styledImage && (
                    <div className="text-center text-muted-foreground p-4">
                        <p>Your AI-generated preview will appear here.</p>
                    </div>
                )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
