import { Inventory } from "@/components/Inventory/InventoryCard/InventoryCard";

const BASE_URL = "http://localhost:9000/api/inventory";
    
export async function getInventoryItems(): Promise<Inventory[]> {
  const response = await fetch(`${BASE_URL}`);
  if (!response.ok) {
    throw new Error("Failed to fetch inventory items");
  }
  return response.json();
}

export async function getInventoryItemBySkuCode(skuCode: string): Promise<Inventory> {
  const response = await fetch(`${BASE_URL}/${skuCode}`);
  if (!response.ok) {
    throw new Error("Failed to fetch inventory item");
  }
  return response.json();
}