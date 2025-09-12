"use client";

export type Inventory = {
  id: number;
  skuCode: string;
  quantity: number;
};

type InventoryCardProps = {
  inventory: Inventory;
};

export default function InventoryCard({ inventory }: InventoryCardProps) {
  return (
    <div>
      <p>SKU Code: {inventory.skuCode}</p>
      <p>Quantity: {inventory.quantity}</p>
    </div>
  );
}