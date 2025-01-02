import { Box, Button } from "@chakra-ui/react";
import { ButtonChangeItemProps } from "../types/button-change-types";
import { useAppDispatch } from "../../../../stores/stores";
import { PutCartAsyncByCartId } from "../../../../stores/cart/async-cart";

export function ButtonChangeItem({ cartId, countItem, initialCountItem }: ButtonChangeItemProps) {
  const dispatch = useAppDispatch();

  return (
    <Box width="100%" as="form" hidden={countItem == initialCountItem} onClick={() => dispatch(PutCartAsyncByCartId({ cartId, countItem }))}>
      <Button variant={"outline"} bg={"orange"}>
        Submit
      </Button>
    </Box>
  );
}
