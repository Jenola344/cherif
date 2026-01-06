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
  id: string;
  artworkId: string;
  title: string;
  imageUrl: string;
  imageHint: string;
  size: string;
  frame: 'Framed' | 'Unframed';
  price: number;
  quantity: number;
};

export type Order = {
  id: string;
  customerName: string;
  customerEmail: string;
  totalAmount: number;
  status: 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED';
  items: OrderItem[];
  createdAt: Date;
}

export type OrderItem = {
  artworkId: string;
  size: string;
  price: number;
  quantity: number;
}

export type InteriorDesign = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export type Booking = {
  id: string;
  customerName: string;
  email: string;
  serviceType: string;
  message: string;
  dateRequested: Date;
  status: 'PENDING' | 'CONFIRMED';
}
