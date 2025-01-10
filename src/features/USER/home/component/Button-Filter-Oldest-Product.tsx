import { Button } from "@chakra-ui/react";
import { useAppDispatch } from "../../../../stores/stores";
import { setOldestProduct } from "../../../../stores/product/slice-product";

export default function ButtonOldestProduct() {
  const dispatch = useAppDispatch();

  function onFilterNewestProduct() {
    dispatch(setOldestProduct());
  }

  return <Button onClick={onFilterNewestProduct}>Oldest Product</Button>;
}
