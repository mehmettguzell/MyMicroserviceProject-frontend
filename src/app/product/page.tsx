"use client";

import { useState, useEffect, useCallback } from "react";
import { getAllProducts, searchProduct } from "@/services/productService";
import ProductCard, { Product } from "@/components/Product/ProductCard/ProductCard";

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getAllProducts();
      setProducts(data);
      setFilteredProducts(data);
    } catch (err) {
      console.error("Fetch products error:", err);
      setError("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!query.trim()) {
      setFilteredProducts(products);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const results = await searchProduct(query);
      setFilteredProducts(results);
    } catch (err) {
      console.error("Search error:", err);
      setError("Search failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <form onSubmit={handleSearch} style={{ marginBottom: "1.5rem" }}>
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: "0.5rem", width: "300px" }}
        />
        <button type="submit" style={{ marginLeft: "1rem" }}>
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {!loading && filteredProducts.length === 0 && query && <p>No products found.</p>}
    </div>
  );
}
