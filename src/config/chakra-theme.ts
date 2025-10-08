import { extendTheme, ThemeOverride } from "@chakra-ui/react";

const BrandConfig: ThemeOverride = {
  colors: {
    brand: {
      // Coffee-inspired warm colors
      primary: "#8B4513", // Saddle Brown
      secondary: "#D2691E", // Chocolate
      accent: "#CD853F", // Peru
      cream: "#F5F5DC", // Beige
      latte: "#F4E4BC", // Light cream
      espresso: "#3C2414", // Dark brown
      mocha: "#6F4E37", // Coffee brown
      cappuccino: "#E6D7C3", // Light coffee
      forest: "#228B22", // Forest green for leaves
      sage: "#9CAF88", // Sage green
      
      // Legacy colors (keeping for compatibility)
      whiteColor: "white",
      baseColor: "black",
      background: "#FEFCF3", // Warm white
      default: "#8B4513",
      input: "#E6D7C340",
      bgYoung: "#F4E4BC",
      navbar: "#FEFCF3",
      fontProduct: "#3C2414",
      borderColorInvalid: "red",
      succes: "#228B22",
      warning: "#D2691E",
      danger: "#DC143C",
      darkTheme: "#2C1810",
    },
  },
  fonts: {
    heading: "'Dancing Script', cursive",
    body: "'Poppins', sans-serif",
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: "full",
        fontWeight: "600",
        transition: "all 0.3s ease",
        _hover: {
          transform: "translateY(-2px)",
          boxShadow: "lg",
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: "2xl",
          boxShadow: "0 4px 20px rgba(139, 69, 19, 0.1)",
          transition: "all 0.3s ease",
          _hover: {
            transform: "translateY(-4px)",
            boxShadow: "0 8px 30px rgba(139, 69, 19, 0.2)",
          },
        },
      },
    },
  },
};

export const ThemeConfig = extendTheme(BrandConfig satisfies ThemeOverride);
