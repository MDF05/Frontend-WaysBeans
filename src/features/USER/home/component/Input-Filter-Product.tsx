import { Select } from "@chakra-ui/react";
import { ChangeEvent } from "react";
import { useAppDispatch } from "../../../../stores/stores";
import { setFilterProduct, setMostStock, setNewsProduct, setOldestProduct, setSmallestStock } from "../../../../stores/product/slice-product";

export default function InputFilterProduct() {
  const dispatch = useAppDispatch();

  function onFilterProduct(event: ChangeEvent<HTMLSelectElement>) {
    console.log(event.target.value);
    if (event.target.value == "highest-stock") dispatch(setMostStock());
    else if (event.target.value == "lowest-stock") dispatch(setSmallestStock());
    else if (event.target.value == "newest") dispatch(setNewsProduct());
    else if (event.target.value == "oldest") dispatch(setOldestProduct());
    else {
      dispatch(setFilterProduct(null));
    }
  }

  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJuZXd1c2VyQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiY3JlYXRlZEF0IjoiMjAyNS0wMS0xMFQwNDoxMToyNi45MTVaIiwidXBkYXRlZEF0IjoiMjAyNS0wMS0xMFQwNDoxMToyNi45MTVaIiwicHJvZmlsZSI6eyJpZCI6NiwidXNlcklkIjo2LCJuYW1lIjoibmV3IHVzZXIiLCJhZGRyZXNzIjpudWxsLCJnZW5kZXIiOm51bGwsInBob25lIjpudWxsLCJpbWFnZVVybCI6bnVsbCwiY3JlYXRlZEF0IjoiMjAyNS0wMS0xMFQwNDoxMToyNi45MTVaIiwidXBkYXRlZEF0IjoiMjAyNS0wMS0xMFQwNDoxMToyNi45MTVaIn0sImNhcnQiOltdLCJfY291bnQiOnsiY2FydCI6MH0sImlhdCI6MTczNjQ4MjI5OSwiZXhwIjoxNzM2NTY4Njk5fQ.gieyJShYdV2FP6r0iDnWdPNV6MBZqUVVVfu1jMRByRE

  return (
    <Select placeholder="default" width={"20%"} bg={"brand.dark"} onChange={onFilterProduct}>
      <option value="highest-stock">Highest Price </option>
      <option value="highest-stock">Lowest Price </option>
      <option value="highest-stock">Highest Stock </option>
      <option value="lowest-stock">Lowest Stock </option>
      <option value="newest">Newest Product </option>
      <option value="oldest">Oldest Product </option>
    </Select>
  );
}
