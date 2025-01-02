import { useEffect, useState } from "react";
import { ProductResponseDTO } from "../../../../DTO/product-DTO";
import { productSchema, ProductSchema } from "../../../../schemas/product-schema";
import { PostProductAsync } from "../../../../stores/product/async-product";
import { useAppDispatch, useAppSelector } from "../../../../stores/stores";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function useModalPostProduct() {
  const { register, reset, handleSubmit, watch } = useForm<ProductSchema>({ resolver: zodResolver(productSchema) });
  const state = useAppSelector((state) => state.auth);

  const images = watch("images");

  const [image, setImage] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (images !== undefined) {
      setImage(URL.createObjectURL(images[0]));
    }
  }, [images]);

  async function onSubmitProduct(event: ProductSchema) {
    try {
      const formData = new FormData();
      formData.append("name", event.name);
      formData.append("price", event.price);
      formData.append("quantity", event.quantity);
      formData.append("description", event.description);
      formData.append("profileId", `${state?.user?.id}`);

      if (event.images.length !== 0) {
        for (const i of event.images) {
          formData.append("image", i);
        }
      }

      const res: ProductResponseDTO = await dispatch(PostProductAsync(formData)).unwrap();
      setImage("");
      reset();
      return res;
    } catch (err) {
      return err;
    }
  }

  return { reset, onSubmitProduct, image, register, handleSubmit };
}
