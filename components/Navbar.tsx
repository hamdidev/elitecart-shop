import { getWixClient } from "@/lib/wix-client.base";
import { getCart } from "@/wix-api/cart";
import Image from "next/image";
import Link from "next/link";

const Navbar = async () => {
  const cart = await getCart();
  const totalQuantity =
    cart?.lineItems.reduce((acc, item) => acc + (item.quantity || 0), 0) || 0;
  return (
    <div className="">
      <header className="bg-background shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 p-2">
          <Link href="/" className="flex w-fit items-center gap-4">
            <Image src="/logo.png" alt="logo" width={150} height={60} />
          </Link>
          {totalQuantity} items in your cart
        </div>
      </header>
    </div>
  );
};

export default Navbar;
