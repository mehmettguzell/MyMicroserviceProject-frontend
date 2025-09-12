"use client";

import { notFound, useParams, useRouter } from "next/navigation"; 
import { getProductById, updateProduct, deleteProduct } from "@/services/productService";
import { useState, useEffect } from "react";

export default function ProductIdPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
  if (!id) return;

  const fetchProduct = async () => {
    try {
      const data = await getProductById(Array.isArray(id) ? id[0] : id);
      setProduct(data);
    } catch (err: any) {
      if (err.message === "NOT_FOUND") {
        notFound();
        return;
      }
      setError("Failed to fetch product.");
    }finally{
      setLoading(false);
    }
  };

  fetchProduct();
}, [id]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProduct(product.id, {
        name: product.name,
        description: product.description,
        skuCode: product.skuCode,
        price: Number(product.price),
      });
      alert("Product updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update product.");
    }
  };

  const handleDelete = async () => {
    if (!product) return;
    const confirmed = confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    try {
      await deleteProduct(product.id);
      alert("Product deleted successfully!");
      router.push("/product");
    } catch (err) {
      console.error(err);
      alert("Failed to delete product.");
    }
  };

if (loading) return <p>Loading...</p>;
if (error) return <p>{error}</p>;
if (!product) return null;

  return (
  <div style={{ padding: "2rem" }}>
    <h1>Edit Product</h1>
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "400px" }}>
      <label>
        Name:
        <input type="text" name="name" value={product.name} onChange={handleChange} style={{ width: "100%", padding: "0.5rem" }} required />
      </label>
      <label>
        Description:
        <textarea name="description" value={product.description} onChange={handleChange} style={{ width: "100%", padding: "0.5rem", minHeight: "80px" }} />
      </label>
      <label>
        Price:
        <input type="number" name="price" value={product.price} onChange={handleChange} style={{ width: "100%", padding: "0.5rem" }} required />
      </label>
      {/* <label>
        Quantity:
        <input type="number" name="quantity" value={inventory.quantity} onChange={handleChange} style={{ width: "100%", padding: "0.5rem" }} required />
      </label> */}

      <label>
        skuCode:
        <input type="text" name="skuCode" value={product.skuCode} onChange={handleChange} style={{ width: "100%", padding: "0.5rem" }} required />
      </label>

      <button type="submit" style={{ padding: "0.75rem", backgroundColor: "#0070f3", color: "white", border: "none", borderRadius: "5px" }}>
        Submit
      </button>
      <button type="button" style={{ padding: "0.75rem", backgroundColor: "#df3c3c", color: "white", border: "none", borderRadius: "5px" }} onClick={handleDelete}>
        Delete
      </button>
    </form>
  </div>
);
}