import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import { reviews } from "@wix/reviews";
import { redirects } from "@wix/redirects";
import { members } from "@wix/members";
import { files } from "@wix/media";
import {
  checkout,
  currentCart,
  backInStockNotifications,
  orders,
  recommendations,
} from "@wix/ecom";
import { env } from "./env";
export function getWixClient() {
  return createClient({
    modules: {
      products,
      collections,
      reviews,
      redirects,
      members,
      files,
      checkout,
      currentCart,
      backInStockNotifications,
      orders,
      recommendations,
    },
    auth: OAuthStrategy({
      clientId: env.NEXT_PUBLIC_WIX_CLIENT_ID,
    }),
  });
}
