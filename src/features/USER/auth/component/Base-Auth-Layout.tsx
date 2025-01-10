import { Box, Grid } from "@chakra-ui/react";
import { Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function BaseAuthLayout(): React.ReactNode {
  const token = localStorage.getItem("token");

  if (token) return <Navigate to={"/"}></Navigate>;

  return (
    <Grid bg={"brand.fontProduct"} height={"100vh"} width={"100%"} color={"brand.color"} gridTemplateColumns={"100%"} alignItems={"center"} justifyItems={"center"}>
      <Box bg={"white"} width={{ base: "90%", md: "70%", lg: "40%" }} rounded={"20px"}>
        <ToastContainer autoClose={2000}></ToastContainer>
        <Outlet />
      </Box>
    </Grid>
  );
}
