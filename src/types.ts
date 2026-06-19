export interface Product {
  id: string;
  name: string;
  category: string;
  tag?: string; // e.g. "YANGI", "XIT"
  note: string; // e.g. "SHARQONA IFOR"
  description: string;
  price: number;
  priceStr: string; // e.g. "1,250,000 so'm"
  imageUrl: string;
  dataAlt?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ContactFormInput {
  name: string;
  email: string;
  phone: string;
  message: string;
}
