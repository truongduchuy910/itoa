import { Stack, Flex, VStack, Box, Fade } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Image from "next/image";
export default function BannerListUI({
  allBanners,
  _allBannersMeta,
  clickMore,
}) {
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
    <section>
      <Box width="full" height="100vh" bg="brand.50" pos="relative">
        <Fade in={true}>
          <Image
            layout="fill"
            objectFit="contain"
            src={
              allBanners?.[current]?.image?.publicUrl || "/assets/img/no-image.png"
            }
          />
        </Fade>
      </Box>
    </section>
  );
}
