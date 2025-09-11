import notFound from "@/app/not-found";

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
