import { Box, Grid } from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAppDispatch } from "../../../../stores/stores";
import { CheckTokenDTO } from "../../../../DTO/check-token-DTO";
import { checkAuth } from "../../../../stores/auth/async";

export default function BaseAuthLayout(): React.ReactNode {
  const token = localStorage.getItem("token");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (token) {
    (async function () {
      const info: CheckTokenDTO = await dispatch(checkAuth()).unwrap();

      if (info?.token != "invalid") {
        return navigate("/");
      }
    })();
  }

  return (
    <Grid bg={"black"} height={"100vh"} width={"100%"} color={"brand.color"} gridTemplateColumns={"100%"} alignItems={"center"} justifyItems={"center"}>
      <Box bg={"white"} width={{ base: "90%", md: "70%", lg: "40%" }} rounded={"20px"}>
        <ToastContainer autoClose={2000}></ToastContainer>
        <Outlet />
      </Box>
    </Grid>
  );
}
