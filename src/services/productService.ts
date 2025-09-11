const BASE_URL = "http://localhost:9000/api/product";

export async function getAllProdcuts() {

    const res = await fetch(BASE_URL + "/all", {cache: 'no-store'});
    if(!res.ok)throw new Error('Failed to fetch products');
    return res.json();

}
