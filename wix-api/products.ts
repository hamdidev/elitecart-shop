import { getWixClient } from "@/lib/wix-client.base";
import { cache } from "react";
type ProductSort = "last_updated" | "price_asc" | "price_desc";
interface QueryProductsFilters {
  collectionIds?: string[] | string;
  sort?: ProductSort;
}

export async function queryProducts({
  collectionIds,
  sort = "last_updated",
}: QueryProductsFilters) {
  const wixClient = getWixClient();
  let query = wixClient.products.queryProducts();
  const collectionIdsArray = collectionIds
    ? Array.isArray(collectionIds)
      ? collectionIds
      : [collectionIds]
    : [];

  if (collectionIdsArray.length > 0) {
    query = query.hasSome("collectionIds", collectionIdsArray);
  }
  switch (sort) {
    case "price_desc":
      query = query.descending("price");
      break;
    case "price_asc":
      query = query.ascending("price");
      break;
    case "last_updated":
      query = query.ascending("lastUpdated");
      break;
  }
  return query.find();
}
export const getProductBySlug = cache(async (slug: string) => {
  const wixClient = getWixClient();
  const { items } = await wixClient.products
    .queryProducts()
    .eq("slug", slug)
    .limit(1)
    .find();
  const product = items[0];
  if (!product || !product.visible) {
    return null;
  }
  return product;
});
