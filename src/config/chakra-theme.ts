import { extendTheme, ThemeOverride } from "@chakra-ui/react";

const BrandConfig: ThemeOverride = {
  colors: {
    brand: {
      whiteColor: "white",
      baseColor: "black",
      background: "white",
      default: "#613D2B",
      input: "#613D2B40",
      bgYoung: "#DBB699",
      navbar: "#F5F5F5",
      fontProduct: "rgb(97,61,43)",
      borderColorInvalid: "red",
      succes: "#56C05A",
      warning: "#FFB000",
      danger: "red",
      darkTheme: "#1A202C",
    },
  },
};

export const ThemeConfig = extendTheme(BrandConfig satisfies ThemeOverride);
