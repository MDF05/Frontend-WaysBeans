import { Button } from "@chakra-ui/react";
import { useAppDispatch } from "../../../../stores/stores";
import { setSmallestStock } from "../../../../stores/product/slice-product";

export default function ButtonSmallestStock() {
  const dispatch = useAppDispatch();

  function onFilterNewestProduct() {
    dispatch(setSmallestStock());
  }

  return <Button onClick={onFilterNewestProduct}>Lowest stock</Button>;
}
