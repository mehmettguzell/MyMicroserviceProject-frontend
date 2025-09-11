import {getAllProdcuts} from "@/services/productService";
import ProductList from "@/components/productList";


export default async function ProductPage() {

    const products = await getAllProdcuts();

    return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product: any) => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
