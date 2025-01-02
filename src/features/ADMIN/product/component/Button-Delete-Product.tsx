import { Button, FormControl } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../../../stores/stores";
import { DeleteProduct } from "../../../../stores/product/async-product";

export default function ButtonDeleteProduct({ productId }: { productId: string }): React.ReactNode {
  const { handleSubmit } = useForm();
  const dispatch = useAppDispatch();

  async function onSubmitDelete() {
    const isConfirm = confirm("Are you sure you want to delete this product?");
    productId && isConfirm && (await dispatch(DeleteProduct({ productId })));
  }

  return (
    <FormControl as={"form"} onSubmit={handleSubmit(() => onSubmitDelete())}>
      <Button bg={"brand.danger"} type="submit">
        Delete
      </Button>
    </FormControl>
  );
}
