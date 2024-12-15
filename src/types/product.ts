interface ProductVariant {
  color?: string;
  ramSize?: string;
  size?: string;
  storage?: string;
  sku?: string;
  barcode?: string;
  variantPrice?: number;
  discountPrice?: number;
  quantity?: number;
  isFeatured?: boolean;
  imageUrl?: string;
}
export type Product = {
  id?: number;
  name: string;
  price: number;
  description: string;
  quantity: number;
  images: any[];
  categoryId: any;
  brandId: any;
  variants: ProductVariant[];
};
