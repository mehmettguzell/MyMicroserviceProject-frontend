"use client";

import { useRouter } from 'next/navigation';
import styles from './ProductCard.module.css';

export type Product = {
  id: number;
  name: string;
  price: number;
  image?: string;
  description?: string;
};

type ProductCardProps = {
  product: Product;
  onClick?: () => void;
  onAddToCart?: () => void;
};

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${product.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    // router.push(`/product/${product.id}`);
  };

  return (
    <div className={styles.productCard} onClick={handleClick}>
      {product.image && <img src={product.image} alt={product.name} className={styles.productImage} />}
      <h3 className={styles.productName}>{product.name}</h3>
      <p className={styles.productDescription}>{product.description}</p>
      <p className={styles.productPrice}>${product.price}</p>
      <button className={styles.addToCartBtn} onClick={handleAddToCart}>
        Order
      </button>
    </div>
  );
}
