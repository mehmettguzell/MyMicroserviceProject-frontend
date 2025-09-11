const BASE_URL = "http://localhost:9000/api/product";

export async function getAllProducts() {

    const res = await fetch(BASE_URL + "/all", {cache: 'no-store'});
    if(!res.ok)throw new Error('Failed to fetch products');
    return res.json();

}

export async function getProductById(id: string) {
  const res = await fetch(`${BASE_URL}/${id}`, { cache: 'no-store' });
  const data = await res.json();
  return data;
}


export async function searchProducts(query: string) {
    if (!query) return [];  
    console.log('Searching for:', query);
    const res = await fetch(`${BASE_URL}/search?name=${query}`, { cache: 'no-store' });
    const data = await res.json();
    return data;
}