import { products } from "@wix/stores";
import Link from "next/link";
import WixImage from "./WixImage";
import Badge from "./ui/badge";
import { formattedCurrency } from "@/lib/utils";
import DiscountBadge from "./DiscountBadge";

interface ProductPorps {
  product: products.Product;
}
const Product = ({ product }: ProductPorps) => {
  const mainImage = product.media?.mainMedia?.image;

  return (
    <div className="">
      <Link className="h-full bg-card" href={`/products/${product.slug}`}>
        <div className="relative overflow-hidden">
          <WixImage
            mediaIdentifier={mainImage?.url}
            alt={mainImage?.altText}
            className="transition-transform duration-300 hover:scale-105"
            width={700}
            height={700}
            placeholder="/placeholder.png"
          />
          <div className="absolute bottom-3 right-3 flex flex-wrap items-center gap-2">
            {product.ribbon && <Badge>{product.ribbon}</Badge>}
            {product.discount && <DiscountBadge data={product.discount} />}
            <Badge className="bg-secondary font-semibold text-secondary-foreground">
              {getFormattedPrice(product)}
            </Badge>
          </div>
        </div>
      </Link>
      <div className="space-y-3 p-3">
        <h3 className="text-lg font-bold">{product.name}</h3>
        <div
          className="line-clamp-5"
          dangerouslySetInnerHTML={{ __html: product.description || "" }}
        />
      </div>
    </div>
  );
};

export default Product;

function getFormattedPrice(product: products.Product) {
  const minPrice = product.priceRange?.minValue;
  const maxPrice = product.priceRange?.maxValue;
  if (minPrice && maxPrice && minPrice !== maxPrice) {
    return `from ${formattedCurrency(minPrice, product.priceData?.currency)}`;
  } else {
    return (
      product.priceData?.formatted?.discountedPrice ||
      product.priceData?.formatted?.price ||
      "N/A"
    );
  }
}
