import { Button } from "@chakra-ui/react";
import { useAppDispatch } from "../../../../stores/stores";
import { setNewsProduct } from "../../../../stores/product/slice-product";

export default function ButtonNewstProduct() {
  const dispatch = useAppDispatch();

  function onFilterNewestProduct() {
    dispatch(setNewsProduct());
  }

  return <Button onClick={onFilterNewestProduct}>Newest Product</Button>;
}
