import React from "react";
import { LinkProps } from "@chakra-ui/react";

export default interface ChakraLinkExtendReactRouterLinkProps extends LinkProps {
  children: React.ReactNode;
  to: string;
  state?: any;
}
