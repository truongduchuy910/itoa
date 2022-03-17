//
export const config = {
  fonts: {
    heading: "pacifico",
    body: "barlow",
  },
  components: {
    Heading: {
      baseStyle: { letterSpacing: 2, fontWeight: 400 },
      variants: {
        "gradient-brand": {
          bgClip: "text",
          bgGradient: "linear(to-l,brand.600, brand.400, brand.500)",
        },
        "gradient-gold": {
          bgClip: "text",
          bgGradient: "linear(to-l, yellow.500, yellow.400, yellow.600)",
        },
        "gradient-brand-bold": {
          bgClip: "text",
          bgGradient: "linear(to-l,brand.800, brand.600, brand.700)",
          pb: 2,
        },
      },
    },
    Card: {
      defaultProps: {
        variant: "white",
      },
      variants: {
        "gradient-gold": {
          bgGradient: "linear(to-l, yellow.400, yellow.500, yellow.400)",
        },
        "gradient-navy": {
          bgGradient: "linear(to-l, #2C3259,#304A78, #0A0E28)",
        },
        "gradient-brand": {
          bg: "transparent",
          px: 4,
          color: "white",
          bgClip: "padding-box",
          pos: "relative",
          _before: {
            shadow: "xl",
            content: `""`,
            pos: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            zIndex: -1,
            bgGradient: "linear(to-l, brand.600, brand.400, brand.500)",
          },
        },
        "gradient-brand-dark": {
          bg: "transparent",
          px: 4,
          // py: 6,
          color: "white",
          bgClip: "padding-box",
          pos: "relative",
          _before: {
            shadow: "xl",
            content: `""`,
            pos: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            zIndex: -1,
            // rounded: "xl",
            bgGradient: "linear(to-l, brand.700, brand.500, brand.700)",
          },
        },
        light: {
          rounded: "xl",
          shadow: "lg",
          borderWidth: 1,
          px: 4,
          py: 6,
          shadow: "xl",
          bg: "white",
        },
        dark: {
          rounded: "xl",
          shadow: "lg",
          borderWidth: 1,
          px: 4,
          py: 6,
          shadow: "xl",
          bg: "gray.50",
        },
      },
    },
  },
};
