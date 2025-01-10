import { Button } from "@chakra-ui/react";
import { useAppDispatch } from "../../../../stores/stores";
import { setMostStock } from "../../../../stores/product/slice-product";

export default function ButtonMostStock() {
  const dispatch = useAppDispatch();

  function onFilterNewestProduct() {
    dispatch(setMostStock());
  }

  return <Button onClick={onFilterNewestProduct}>Most stock</Button>;
}
