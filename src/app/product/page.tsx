import { getAllProducts } from "@/services/productService";
import ProductCard from '@/components/ProductCard/ProductCard';

export default async function ProductPage() {
  const products = await getAllProducts();

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Products</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '1.5rem'
      }}>
        {products.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
