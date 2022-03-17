import { Box, Heading } from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function WithBackgroundImage({ allBanners, loading }) {
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
    <Box pos="relative" h="60vh" w="full">
      {!loading && allBanners[current]?.image?.publicUrl && (
        <Image
          src={allBanners[current]?.image?.publicUrl}
          layout="fill"
          objectFit="cover"
        />
      )}
    </Box>
  );
}
