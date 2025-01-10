import { Select } from "@chakra-ui/react";
import { ChangeEvent } from "react";
import { useAppDispatch } from "../../../../stores/stores";
import { setFilterProduct, setMostStock, setNewsProduct, setOldestProduct, setSmallestStock } from "../../../../stores/product/slice-product";

export default function InputFilterProduct() {
  const dispatch = useAppDispatch();

  function onFilterProduct(event: ChangeEvent<HTMLSelectElement>) {
    if (event.target.value == "highest-stock") dispatch(setMostStock());
    else if (event.target.value == "lowest-stock") dispatch(setSmallestStock());
    else if (event.target.value == "newest") dispatch(setNewsProduct());
    else if (event.target.value == "oldest") dispatch(setOldestProduct());
    else {
      dispatch(setFilterProduct(null));
    }
  }

  return (
    <Select placeholder="default" width={"20%"} bg={"brand.dark"} onChange={onFilterProduct}>
      <option value="highest-stock">Highest Price </option>
      <option value="highest-stock">Lowest Price </option>
      <option value="highest-stock">Highest Stock </option>
      <option value="lowest-stock">Lowest Stock </option>
      <option value="newest">Newest Product </option>
      <option value="oldest">Lowest Product </option>
    </Select>
  );
}
