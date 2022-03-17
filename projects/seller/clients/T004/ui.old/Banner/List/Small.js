import { Box, Heading } from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function BannerListSmall({ allBanners }) {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const time = setTimeout(() => {
      setCurrent((current) => {
        {
          return current === allBanners.length - 1 ? 0 : ++current;
        }
      });
    }, 5000);
    return () => {
      clearTimeout(time);
    };
  });
  return (
    <Box
      rounded="md"
      overflow="hidden"
      w="full"
      pos="relative"
      top={0}
      padding="25%"
    >
      {allBanners[current]?.image?.publicUrl && (
        <Image
          src={allBanners[current]?.image?.publicUrl || "/assets/img/no-image.png"}
          layout="fill"
          objectFit="cover"
        />
      )}
    </Box>
  );
}
