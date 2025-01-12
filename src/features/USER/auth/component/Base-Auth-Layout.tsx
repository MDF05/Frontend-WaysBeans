import { Box, Grid } from "@chakra-ui/react";
import { Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAppSelector } from "../../../../stores/stores";

export default function BaseAuthLayout(): React.ReactNode {
  const token = localStorage.getItem("token");
  const state = useAppSelector((state) => state.auth);

  if (token && state?.user?.id) return <Navigate to={"/"}></Navigate>;

  return (
    <Grid bg={"black"} height={"100vh"} width={"100%"} color={"brand.color"} gridTemplateColumns={"100%"} alignItems={"center"} justifyItems={"center"}>
      <Box bg={"white"} width={{ base: "90%", md: "70%", lg: "40%" }} rounded={"20px"}>
        <ToastContainer autoClose={2000}></ToastContainer>
        <Outlet />
      </Box>
    </Grid>
  );
}
