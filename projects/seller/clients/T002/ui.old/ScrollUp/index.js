import { IconButton } from "@chakra-ui/button";
import { ChevronUpIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";

export default function ScrollUp({ bottom, right, ...props }) {
  const [visible, setVisible] = useState(false);
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };
  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
  });
  return (
    <IconButton
      {...props}
      isRound
      icon={<ChevronUpIcon />}
      position="fixed"
      zIndex="sticky"
      bottom={bottom}
      right={right}
      onClick={scrollToTop}
    />
  );
}
