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
  const res = await fetch(`${BASE_URL}/${id}`, { cache: 'no-store' });

  if (res.status === 404) {
    throw new Error("NOT_FOUND"); 
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch product: ${res.status} ${res.statusText}`);
  }

  return res.json();
}


export async function searchProduct(query: string) {
    if (!query) return [];  
    console.log('Searching for:', query);
    const res = await fetch(`${BASE_URL}/search?name=${query}`, { cache: 'no-store' });
    const data = await res.json();
    return data;
}

export async function addProduct(product: Omit<Product, 'id'>) {
  const res = await fetch(`${BASE_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  if (!res.ok) {
    const errorMessage = `Failed to add product: ${res.status} ${res.statusText}`;
    throw new Error(errorMessage);
  }
  return res.json();
}

export async function updateProduct(id: string, product: Partial<Product>) {
  const res = await fetch(`${BASE_URL}/update/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  if (!res.ok) {
    const errorMessage = `Failed to update product: ${res.status} ${res.statusText}`;
    throw new Error(errorMessage);
  }
  return res.json();
}

export async function deleteProduct(id: string) {
  const res = await fetch(`${BASE_URL}?id=${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    const errorMessage = `Failed to delete product: ${res.status} ${res.statusText}`;
    throw new Error(errorMessage);
  }
}
