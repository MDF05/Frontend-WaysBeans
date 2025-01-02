import { useColorModeValue } from "@chakra-ui/react";
import { NavLinkProps } from "./../types/base-types";
import ChakraLinkExtendReactRouterLink from "../../../../components/Chakra-LInk-Extend-React-Router-Link";

export default (props: NavLinkProps) => {
  const { children, to, ...otherProps } = props;

  return (
    <ChakraLinkExtendReactRouterLink
      to={to}
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
        color: "brand.active",
      }}
      href={"#"}
      {...otherProps}
    >
      {children}
    </ChakraLinkExtendReactRouterLink>
  );
};
