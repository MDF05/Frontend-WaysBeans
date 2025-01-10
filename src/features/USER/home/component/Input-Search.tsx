import { Grid, Input } from "@chakra-ui/react";
import { FormEvent, useEffect, useState } from "react";
import { useAppDispatch } from "../../../../stores/stores";
import { setFilterProduct } from "../../../../stores/product/slice-product";

export default function InputSearch() {
  const [searchText, setSearchText] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (searchText == "") dispatch(setFilterProduct(null));
  }, [searchText]);

  async function submitSearch(event: FormEvent<HTMLDivElement>) {
    event.preventDefault();

    dispatch(setFilterProduct(searchText));
  }

  return (
    <Grid width={"100%"} as={"form"} onSubmit={submitSearch} justifyItems={"center"}>
      <Input w={{ base: "100%", lg: "85%" }} color={"white"} placeholder="search ...." onChange={(event) => setSearchText(event.target.value)}></Input>
    </Grid>
  );
}
