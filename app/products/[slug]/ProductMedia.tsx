import WixImage from "@/components/WixImage";
import { cn } from "@/lib/utils";
import { products } from "@wix/stores";
import { PlayIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Zoom from "react-medium-image-zoom";

interface ProductMediaProps {
  media: products.MediaItem[] | undefined;
}

const ProductMedia = ({ media }: ProductMediaProps) => {
  const [selectMedia, setSelectMedia] = useState(media?.[0]);
  useEffect(() => {
    setSelectMedia(media?.[0]);
  }, [media]);

  if (!media?.length) return null;

  const selectedImage = selectMedia?.image;
  const selectedVideo = selectMedia?.video?.files?.[0];

  return (
    <div className="h-fit basis-2/5 space-y-5 md:sticky md:top-0">
      <div className="aspect-square bg-secondary">
        {selectedImage?.url ? (
          <Zoom key={selectedImage.url}>
            <WixImage
              mediaIdentifier={selectedImage.url}
              alt={selectedImage.altText}
              width={1000}
              height={1000}
              placeholder="/placeholder.png"
              className="sticky top-0"
            />
          </Zoom>
        ) : selectedVideo ? (
          <div className="flex size-full items-center bg-black">
            <video controls className="size-full">
              <source
                src={selectedVideo.url}
                type={`video/${selectedVideo.format}`}
              />
            </video>
          </div>
        ) : null}
      </div>
      {media.length > 1 && (
        <div className="flex flex-wrap gap-5">
          {media.map((mediaItem) => (
            <MediaPreview
              key={mediaItem._id}
              mediaItem={mediaItem}
              isSelected={mediaItem._id === selectMedia?._id}
              onSelect={() => setSelectMedia(mediaItem)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductMedia;

interface MediaPreviewProps {
  mediaItem: products.MediaItem;
  isSelected: boolean;
  onSelect: () => void;
}

function MediaPreview({ mediaItem, isSelected, onSelect }: MediaPreviewProps) {
  const imageUrl = mediaItem.image?.url;
  const stillFrameMediaId = mediaItem.video?.stillFrameMediaId;
  const thumbnailUrl = mediaItem.thumbnail?.url;
  const resolvedThumbnailUrl =
    stillFrameMediaId && thumbnailUrl
      ? thumbnailUrl.split(stillFrameMediaId)[0] + stillFrameMediaId
      : undefined;

  if (!imageUrl && !resolvedThumbnailUrl) return null;

  return (
    <div
      className={cn(
        "relative cursor-pointer bg-secondary",
        isSelected && "outline outline-1 outline-primary",
      )}
    >
      <WixImage
        mediaIdentifier={imageUrl || resolvedThumbnailUrl}
        alt={mediaItem.image?.altText || mediaItem.video?.files?.[0].altText}
        width={100}
        height={100}
        onMouseEnter={onSelect}
        placeholder="/placeholder.png"
      />
      {resolvedThumbnailUrl && (
        <span className="absolute left-1/2 top-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/40">
          <PlayIcon className="size-5 text-white/60" />
        </span>
      )}
    </div>
  );
}
