import { ImgHTMLAttributes } from "react";
import { media as wixMedia } from "@wix/sdk";

type WixImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "alt" | "width" | "height"
> & {
  mediaIdentifier: string | undefined;
  placeholder: string;
  alt: string | undefined | null;
  width: number;
  height: number;
} & (
    | {
        scaledToFill?: true;
        width: number;
        height: number;
      }
    | {
        scaledToFill: false;
      }
  );
const WixImage = ({
  mediaIdentifier,
  placeholder = "/placeholder.png",
  alt,
  ...props
}: WixImageProps) => {
  const imageUrl = mediaIdentifier
    ? props.scaledToFill || props.scaledToFill === undefined
      ? wixMedia.getScaledToFillImageUrl(
          mediaIdentifier,
          props.width,
          props.height,
          {},
        )
      : wixMedia.getImageUrl(mediaIdentifier).url
    : placeholder;
  return <img src={imageUrl} alt={alt || ""} {...props} />;
};

export default WixImage;
