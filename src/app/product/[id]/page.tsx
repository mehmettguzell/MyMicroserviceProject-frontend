import { notFound } from "next/navigation";
import { getProductById } from "@/services/productService";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductIdPage({ params }: Props) {
  const product = await getProductById((await params).id);

  if (!product) {
    notFound();
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{product.name}</h1>
      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          style={{ width: "300px", borderRadius: "8px" }}
        />
      )}
      <p>Price: ${product.price}</p>
    </div>
  );
}