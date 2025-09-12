import { getInventoryItemBySkuCode } from "@/services/InventoryService";
import InventoryCard, { Inventory } from "@/components/Inventory/InventoryCard/InventoryCard";
import { useEffect, useState } from "react";

export default function InventoryInput({ skuCode }: { skuCode: string }) {
    const [inventory, setInventory] = useState<Inventory | null>(null);

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const data = await getInventoryItemBySkuCode(skuCode);
                setInventory(data);
            } catch (err) {
                console.error("Failed to fetch inventory item:", err);
            }
        };
        fetchInventory();
    }, [skuCode]);

}