"use client";

import { useState, useEffect, useCallback } from "react";
import { getAllProducts, searchProduct, addProduct } from "@/services/productService";
import ProductCard, { Product } from "@/components/Product/ProductCard/ProductCard";

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
  });

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

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newProduct.name || !newProduct.price) {
      alert("Name and price are required");
      return;
    }
try {
    const addedProduct = await addProduct({
      name: newProduct.name,
      description: newProduct.description,
      price: Number(newProduct.price),
    });

    setProducts([addedProduct, ...products]);
    setFilteredProducts([addedProduct, ...filteredProducts]);

    setNewProduct({ name: "", description: "", price: "" });
    setShowAddForm(false);
  } catch (err) {
    console.error("Add product failed:", err);
    alert("Failed to add product.");
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

      {showAddForm && (
        <form
          onSubmit={handleAddProduct}
          style={{
            marginBottom: "1.5rem",
            padding: "1rem",
            border: "1px solid #ccc",
            borderRadius: "8px",
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <input
            type="text"
            placeholder="Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            required
          />
          <button type="submit">Add Product</button>
          <button type="button" onClick={() => setShowAddForm(false)}>
            Cancel
          </button>
        </form>
      )}

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

        <div
          onClick={() => setShowAddForm(true)}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
            border: "2px dashed #ccc",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "2rem",
            color: "#555",
          }}
        >
          +
        </div>
      </div>

      {!loading && filteredProducts.length === 0 && query && <p>No products found.</p>}
    </div>
  );
}
