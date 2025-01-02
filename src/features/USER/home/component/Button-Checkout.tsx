import { Box, Button } from "@chakra-ui/react";
import { ProductDTO } from "../../../../DTO/product-DTO";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { CheckOutSchema, checkoutSchema } from "./../../../../schemas/checkout-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "../../../../stores/stores";
import { PostMidtransPayment } from "../../../../stores/checkout/async-checkout";
import { getProfileByIdUserLogin } from "../../../../stores/profile/async-profile";
import { toast } from "react-toastify";
import { postTransactionAsync } from "../../../../stores/transaction/async-transaction";
import { TransactionDTO } from "../../../../DTO/transaction-DTO";

declare global {
  interface Window {
    snap: any;
  }
}

export default function ButtonCheckout(): React.ReactNode {
  const { state } = useLocation();
  const { product }: { product: ProductDTO } = state ?? ({} as ProductDTO);
  const { handleSubmit, setValue } = useForm<CheckOutSchema>({ resolver: zodResolver(checkoutSchema) });
  const auth = useAppSelector((state) => state.auth);
  const stateProfile = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  setValue("totalPrice", +product?.price);
  setValue("userDetail.email", `${auth.user?.email}`);
  setValue("userDetail.id", auth?.user?.id ?? 0);
  setValue("userDetail.address", `${stateProfile?.profile?.content?.profile?.address}`);
  setValue("userDetail.phone", `${stateProfile?.profile?.content?.profile?.phone}`);
  setValue("userDetail.name", `${stateProfile?.profile?.content?.profile?.name}`);
  setValue("products", [{ id: product?.id, name: product?.name, description: product?.description, price: product?.price, countItem: "1", images: "" }]);

  async function onCheckOut(event: any) {
    event.stopPropagation();
    try {
      await dispatch(getProfileByIdUserLogin());
      if (!stateProfile?.profile?.content?.profile?.address) {
        toast.warning("please fill address before checkout");
        return navigate("/profile/me");
      }
      const data = await dispatch(PostMidtransPayment(event)).unwrap();
      if (data.succes)
        window.snap.pay(`${data.content.token}`, {
          onSuccess: (res: any) => {
            console.log("Success", res);

            const transactionDTO: TransactionDTO = {
              address: stateProfile?.profile?.content?.profile?.address ?? "",
              productId: product?.id,
              transactionId: res.order_id,
              paymentType: res.payment_type,
            };

            dispatch(postTransactionAsync(transactionDTO));
          },
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
    } catch (error) {
      return error;
    }
  }

  return (
    <Box as="form" onSubmit={handleSubmit((event) => onCheckOut(event))} width={"100%"}>
      <Button bg={"brand.default"} width={"100%"} type={"submit"} _hover={{ bg: "brand.bgYoung" }} color={"white"}>
        Check Out
      </Button>
    </Box>
  );
}
