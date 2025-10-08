import React from "react";
import { Box, useBreakpointValue } from "@chakra-ui/react";

// Custom hook for responsive values
export const useResponsiveValue = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const isTablet = useBreakpointValue({ base: false, md: true, lg: false });
  const isDesktop = useBreakpointValue({ base: false, lg: true });

  return {
    isMobile,
    isTablet,
    isDesktop,
    // Responsive spacing
    spacing: {
      xs: useBreakpointValue({ base: 2, md: 4 }),
      sm: useBreakpointValue({ base: 4, md: 6 }),
      md: useBreakpointValue({ base: 6, md: 8 }),
      lg: useBreakpointValue({ base: 8, md: 12 }),
      xl: useBreakpointValue({ base: 12, md: 16 }),
    },
    // Responsive font sizes
    fontSize: {
      xs: useBreakpointValue({ base: "xs", md: "sm" }),
      sm: useBreakpointValue({ base: "sm", md: "md" }),
      md: useBreakpointValue({ base: "md", md: "lg" }),
      lg: useBreakpointValue({ base: "lg", md: "xl" }),
      xl: useBreakpointValue({ base: "xl", md: "2xl" }),
      "2xl": useBreakpointValue({ base: "2xl", md: "3xl" }),
      "3xl": useBreakpointValue({ base: "3xl", md: "4xl" }),
      "4xl": useBreakpointValue({ base: "4xl", md: "5xl" }),
    },
    // Responsive padding
    padding: {
      xs: useBreakpointValue({ base: 2, md: 4 }),
      sm: useBreakpointValue({ base: 4, md: 6 }),
      md: useBreakpointValue({ base: 6, md: 8 }),
      lg: useBreakpointValue({ base: 8, md: 12 }),
      xl: useBreakpointValue({ base: 12, md: 16 }),
    },
  };
};

// Mobile-optimized container
export const ResponsiveContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { padding } = useResponsiveValue();
  
  return (
    <Box
      px={padding.md}
      py={padding.lg}
      maxW="7xl"
      mx="auto"
      width="100%"
    >
      {children}
    </Box>
  );
};

// Touch-friendly button wrapper
export const TouchFriendlyButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  minH?: string;
}> = ({ children, onClick, minH = "44px" }) => {
  return (
    <Box
      onClick={onClick}
      minH={minH}
      minW="44px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      cursor="pointer"
      _active={{ transform: "scale(0.95)" }}
      transition="transform 0.1s ease"
    >
      {children}
    </Box>
  );
};

export default useResponsiveValue;
