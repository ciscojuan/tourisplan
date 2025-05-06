"use client";

import Image from "next/image";
import { useState } from "react";

export default function PlaneImage({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <div className="w-[200px] h-[200px] relative overflow-hidden rounded-lg">
      <Image
        src={imgSrc}
        alt={alt}
        fill
        className="object-cover"
        onError={() =>
          setImgSrc(
            "https://hips.hearstapps.com/hmg-prod/images/macchu-pichu-sunset-royalty-free-image-1663587235.jpg?crop=1xw:1xh;center,top&resize=980:*"
          )
        }
      />
    </div>
  );
}
