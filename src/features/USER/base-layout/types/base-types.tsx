import { LinkProps } from "@chakra-ui/react";

export interface NavLinkProps extends LinkProps {
  children: React.ReactNode;
  to: string;
}
