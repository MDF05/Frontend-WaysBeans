import { Select } from "@chakra-ui/react";
import { ChangeEvent } from "react";
import { useAppDispatch } from "../../../../stores/stores";
import { setFilterProduct, setHighestPrice, setLowestPrice, setMostStock, setNewsProduct, setOldestProduct, setSmallestStock } from "../../../../stores/product/slice-product";

export default function InputFilterProduct() {
  const dispatch = useAppDispatch();

  function onFilterProduct(event: ChangeEvent<HTMLSelectElement>) {
    if (event.target.value == "highest-stock") dispatch(setMostStock());
    else if (event.target.value == "lowest-stock") dispatch(setSmallestStock());
    else if (event.target.value == "newest") dispatch(setNewsProduct());
    else if (event.target.value == "oldest") dispatch(setOldestProduct());
    else if (event.target.value == "highest-price") dispatch(setHighestPrice());
    else if (event.target.value == "lowest-price") dispatch(setLowestPrice());
    else {
      dispatch(setFilterProduct(null));
    }
  }

  return (
    <Select width={{ base: "50%", md: "50%", lg: "20%" }} bg={"brand.dark"} onChange={onFilterProduct}>
      <option value="default" selected>
        default
      </option>
      <option value="highest-price">Highest Price </option>
      <option value="lowest-price">Lowest Price </option>
      <option value="highest-stock">Highest Stock </option>
      <option value="lowest-stock">Lowest Stock </option>
      <option value="newest">Newest Product </option>
      <option value="oldest">Oldest Product </option>
    </Select>
  );
}
