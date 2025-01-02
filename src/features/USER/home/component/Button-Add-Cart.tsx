import { Button, Flex, Icon } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FaCartPlus } from "react-icons/fa";
import { useAppDispatch } from "../../../../stores/stores";
import { GetCartAsync, PostCartAsync } from "../../../../stores/cart/async-cart";

export default function ButtonAddCart({ productId }: { productId: string }): React.ReactNode {
  const { handleSubmit } = useForm();
  const dispatch = useAppDispatch();

  async function onAddCart() {
    await dispatch(PostCartAsync({ productId }));
    await dispatch(GetCartAsync());
  }

  return (
    <Flex as={"form"} width={"100%"} onSubmit={handleSubmit(() => onAddCart())}>
      <Button bg={"brand.default"} color={"brand.whiteColor"} width={"100%"} type="submit" _hover={{ bg: "brand.bgYoung" }}>
        add to cart
        <Icon as={FaCartPlus} fontSize={"1.5em"}></Icon>
      </Button>
    </Flex>
  );
}
