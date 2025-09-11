import { Product } from "@/components/Product/ProductCard/ProductCard";

const BASE_URL = "http://localhost:9000/api/product";

async function fetchJSON<T>(url: string): Promise<T> {
    const res = await fetch(url, {cache: 'no-store'});
    if (!res.ok) {
      const errorMessage = `Failed to fetch: ${res.status} ${res.statusText}`;
      throw new Error(errorMessage);
    }
    return res.json();
}

export async function getAllProducts<T = Product[]>(): Promise<T> {
  return fetchJSON<T>(`${BASE_URL}/all`);
}

export async function getProductById<T = Product>(id: string): Promise<T> {
  return fetchJSON<T>(`${BASE_URL}/${id}`);
}

export async function searchProduct(query: string) {
    if (!query) return [];  
    console.log('Searching for:', query);
    const res = await fetch(`${BASE_URL}/search?name=${query}`, { cache: 'no-store' });
    const data = await res.json();
    return data;
}