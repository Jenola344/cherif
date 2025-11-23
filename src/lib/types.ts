export type Artwork = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  categoryId: string;
  imageUrl: string;
  imageHint: string;
  prices: {
    [size: string]: number;
  };
  availableSizes: string[];
};

export type Category = {
  id: string;
  slug: string;
  title: string;
  description: string;
};

export type CartItem = {
  id: string; // This will be a unique ID for the cart item, e.g., artworkId-size-frame
  artworkId: string;
  title: string;
  imageUrl: string;
  imageHint: string;
  size: string;
  frame: 'Framed' | 'Unframed';
  price: number;
  quantity: number;
};
