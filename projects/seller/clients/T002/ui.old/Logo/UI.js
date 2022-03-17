import Image from "next/image";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";

export default function LogoUI() {
  return (
    <NextLink href="/" passHref>
      <Link>
        <Image
          width={50}
          height={50}
          src={"/logo.svg"}
          loading="eager"
          priority
        />
      </Link>
    </NextLink>
  );
}
