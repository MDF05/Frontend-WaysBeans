import { Badge, Box, Image, LinkProps } from "@chakra-ui/react";
import { useAppSelector } from "../../../../stores/stores";
import React from "react";
import cart from "../../../../assets/image/cart.png";

interface IconBadgeCartProps extends LinkProps {
  bg?: string;
}

export default function IconBadgeCart(props: IconBadgeCartProps): React.ReactNode {
  const countCartUser = useAppSelector((state) => state.cart.countCartUser);
  const { bg, ...rest } = props;

  return (
    <Box position={"relative"} {...rest} display={"flex"}>
      <Image src={cart}></Image>

      <Badge rounded={"full"} position={"absolute"} top={"-10px"} left={"20px"} bg={bg ? bg : "brand.default"} color={bg ? "black" : "white"}>
        {countCartUser}
      </Badge>
    </Box>
  );
}
