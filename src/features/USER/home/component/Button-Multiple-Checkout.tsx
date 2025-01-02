import { Box, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { CheckOutSchema, checkoutSchema } from "../../../../schemas/checkout-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionDTO } from "../../../../DTO/transaction-DTO";
import { PostMidtransPayment } from "./../../../../stores/checkout/async-checkout";
import { cartCheckedDTO } from "../../../../DTO/cart-DTO";
import { postTransactionAsync } from "../../../../stores/transaction/async-transaction";
import { useAppDispatch, useAppSelector } from "../../../../stores/stores";

declare global {
  interface Window {
    snap: any;
  }
}

interface ButtonCheckoutProps {
  Product: cartCheckedDTO[];
}

export default function ButtonMultipleCheckout({ Product }: ButtonCheckoutProps): React.ReactNode {
  const { handleSubmit, setValue } = useForm<CheckOutSchema>({ resolver: zodResolver(checkoutSchema) });
  const auth = useAppSelector((state) => state.auth);
  const user = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();

  if (Product.length !== 0) {
    const totalPrice = Product.reduce((a, b) => a + b.countItem * +b?.product?.price, 0);
    setValue("totalPrice", totalPrice);
    setValue("userDetail.email", `${auth.user?.email}`);
    setValue("userDetail.id", auth.user?.id ?? 0);
    setValue("userDetail.address", `${user?.profile?.content?.profile?.address}`);
    setValue("userDetail.phone", `${user?.profile?.content?.profile?.phone}`);
    setValue("userDetail.name", `${user?.profile?.content?.profile?.name}`);
    setValue(
      "products",
      Product.map((cart) => {
        return {
          id: cart?.product?.id,
          name: cart?.product?.name,
          description: cart?.product?.description,
          price: cart?.product?.price,
          countItem: `${cart?.countItem}`,
          images: "",
        };
      }),
    );
  }

  async function onCheckOut(event: any) {
    try {
      alert("asu");
      const data = await dispatch(PostMidtransPayment(event)).unwrap();

      if (data.succes)
        window.snap.pay(`${data.content.token}`, {
          // onSuccess: (res: any) => {
          //   const { fraud_status, gross_amount, order_id, payment_type, status_code, status_message, transaction_id, transaction_status, transaction_time } = res;
          //   const dataTransaction: TransactionDTO[] = Product.map((data) => {
          //     return {
          //       fraud_status,
          //       gross_amount,
          //       order_id,
          //       payment_type,
          //       status_code,
          //       status_message,
          //       transaction_id,
          //       transaction_status,
          //       transaction_time,
          //       countItem: data.countItem,
          //       productId: data.product.id,
          //       profileId: user.profile.content.profile.id,
          //     };
          //   });
          //   dispatch(postTransactionAsync(dataTransaction));
          // },
          // onPending: (res: any) => {
          //   console.log("Pending", res);
          // },
          // onError: (res: any) => {
          //   console.log("Error", res);
          // },
          // onCancel: (res: any) => {
          //   console.log("Cancel", res);
          // },
          // onExpired: (res: any) => {
          //   console.log("Expired", res);
          // },
          // onFinish: (res: any) => {
          //   console.log("Finish", res);
          // },
          // onDecline: (res: any) => {
          //   console.log("Decline", res);
          // },
          // onCancellable: (res: any) => {
          //   console.log("Cancellable", res);
          // },
          // onUnfinished: (res: any) => {
          //   console.log("Unfinished", res);
          // },
        });
    } catch (error) {}
  }

  return (
    <Box as="form" onReset={handleSubmit((event) => onCheckOut(event))} width={"100%"}>
      <Button bg={"brand.succes"} width={"100%"} type={"reset"}>
        CheckOut
      </Button>
    </Box>
  );
}
