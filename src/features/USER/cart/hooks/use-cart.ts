import { ChangeEvent } from "react";
import { UseCartTypes } from "../types/use-cart-types";

export default function useCart({ setProducts, products }: UseCartTypes) {
  function onChangeCheckedBox(idCartProduct: number) {
    setProducts((prev) => {
      return prev.map((item) => {
        if (item.product.id === idCartProduct) {
          return { ...item, checked: !item.checked };
        } else {
          return item;
        }
      });
    });
  }

  function onIncreaseItem(indexCartProduct: number) {
    setProducts((prev) =>
      prev.map((item) => {
        let countItem = item.countItem + 1;
        const max = parseInt(products[indexCartProduct].product.quantity);
        if (countItem > max) countItem = max;
        if (item.product.id === products[indexCartProduct].product.id) {
          return { ...item, countItem };
        } else {
          return item;
        }
      }),
    );
  }

  function onDecreaseItem(indexCartProduct: number) {
    setProducts((prev) =>
      prev.map((item) => {
        let countItem = item.countItem - 1;
        if (countItem == 0) countItem = 1;
        if (item.product.id === products[indexCartProduct].product.id) {
          return { ...item, countItem };
        } else {
          return item;
        }
      }),
    );
  }

  function onChangeFieldNumber(event: ChangeEvent<HTMLInputElement>, indexCartProduct: number) {
    let value: string = event.target.value;

    if (event.target.value == "" || parseInt(event.target.value) <= 0) {
      value = "1";
    }

    setProducts((prev) =>
      prev.map((item) => {
        if (item.product.id === products[indexCartProduct].product.id) {
          return { ...item, countItem: parseInt(value) };
        } else {
          return item;
        }
      }),
    );
  }

  return { onChangeCheckedBox, onChangeFieldNumber, onIncreaseItem, onDecreaseItem };
}
