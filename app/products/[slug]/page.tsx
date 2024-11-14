import { getProductBySlug } from "@/wix-api/products";
import { notFound } from "next/navigation";
import ProductDetails from "./ProductDetails";
import { Metadata } from "next";
import { delay } from "@/lib/utils";

interface Props {
  params: {
    slug: string;
  };
}
export async function generateMetadata({
  params: { slug },
}: Props): Promise<Metadata> {
  const product = await getProductBySlug(slug);
  if (!product?._id) notFound();
  const mainImage = product?.media?.mainMedia?.image;

  return {
    title: product.name,
    description: "Get this product now from EliteCart",
    openGraph: {
      images: mainImage?.url
        ? [
            {
              url: mainImage.url,
              width: mainImage.width,
              height: mainImage.height,
              alt: mainImage.altText || "",
            },
          ]
        : undefined,
    },
  };
}
const SingleProduct = async ({ params: { slug } }: Props) => {
  await delay(1000);
  const product = await getProductBySlug(slug);
  if (!product?._id) notFound();
  return (
    <main className="mx-auto max-w-7xl space-y-10 px-5 py-10">
      <ProductDetails product={product} />
    </main>
  );
};

export default SingleProduct;
