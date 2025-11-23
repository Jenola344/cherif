import data from './placeholder-images.json';

type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

const placeholderImages: ImagePlaceholder[] = data.placeholderImages;

export const placeholderImageMap = new Map<string, ImagePlaceholder>(
  placeholderImages.map((img) => [img.id, img])
);

export function getPlaceholderImage(id: string): ImagePlaceholder {
  const image = placeholderImageMap.get(id);
  if (!image) {
    // Return a default or throw an error
    return {
        id: 'default',
        description: 'Default placeholder image',
        imageUrl: 'https://picsum.photos/seed/default/600/400',
        imageHint: 'placeholder'
    }
  }
  return image;
}
