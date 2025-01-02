import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import ChakraLinkExtendReactRouterLinkProps from "./types/Chakra-LInk-Extend-React-Router-Link-type";

export default function ChakraLinkExtendReactRouterLink(
  props: ChakraLinkExtendReactRouterLinkProps,
): React.ReactNode {
  const { children, ...restProps } = props;

  return (
    <ChakraLink
      as={ReactRouterLink}
      textDecoration={"none"}
      _hover={{ textDecoration: "none" }}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      {...restProps}
    >
      {children}
    </ChakraLink>
  );
}
