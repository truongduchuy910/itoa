// 
export const config = {
  fonts: {
    heading: "UTM Alexander, Aachen Bold, sans-serif",
    body: "Inter, sans-serif",
    mono: "Inter, sans-serif",
  },
  components: {
    Heading: {
      variants: {
        "gradient-brand": {
          bgClip: "text",
          bgGradient: "linear(to-l,brand.600, brand.400, brand.500)",
          pb: 2,
        },
      },
    },
    Card: {
      defaultProps: {
        variant: "white",
      },
      variants: {
        "gradient-brand": {
          bg: "transparent",
          px: 4,
          py: 6,
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
            rounded: "xl",
            bgGradient: "linear(to-l, brand.600, brand.400)",
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
