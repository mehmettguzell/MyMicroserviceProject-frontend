import { getProductById } from "@/services/productService";

type Props = {
    params: { id: string }
}

export default async function ProductIdPage({ params }: Props) {

    const product = await getProductById(String(params.id));
    return (
        <div style={{ padding: '2rem' }}>
        <h1>{product.name}</h1>
        <img src={product.image} alt={product.name} style={{ width: '300px', borderRadius: '8px' }} />
        <p>Price: ${product.price}</p>
        <p>{product.description}</p>
        </div>
  );
}