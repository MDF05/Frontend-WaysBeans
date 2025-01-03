import { ChangeEvent, useState } from "react";
import { cartCheckedDTO } from "../../../../DTO/cart-DTO";
import { useAppSelector } from "../../../../stores/stores";

export default function useListCart() {
  const state = useAppSelector((state) => state.cart);
  const product = state.carts.map((cart) => {
    return { ...cart, checked: false };
  });

  const [products, setProducts] = useState<cartCheckedDTO[]>(product);

  const isAllChecked = products.map((product) => product.checked).every(Boolean) && products.length > 0;
  const isIndeterminate = products.map((product) => product.checked).some(Boolean) && !isAllChecked;

  function onChangeAllCheckedBox(e: ChangeEvent<HTMLInputElement>) {
    setProducts((prev) => {
      return prev.map((product) => {
        return { ...product, checked: e.target.checked };
      });
    });
  }

  return { isAllChecked, isIndeterminate, setProducts, onChangeAllCheckedBox, state, products, initialProduct: product };
}
