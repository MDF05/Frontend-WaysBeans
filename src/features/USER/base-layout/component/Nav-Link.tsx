import { Box, useColorModeValue } from "@chakra-ui/react";
import { NavLinkProps } from "./../types/base-types";


export default (props: NavLinkProps) => {
  const { children, to, ...otherProps } = props;

  return (
    <Box
      as={"a"}
      href={to}
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
        color: "brand.active",
      }}
      {...otherProps}
      _dark={{color : "brand.cream"}}
      
    >
      {children}
    </Box>
  );
};
