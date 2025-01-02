import { Box, Grid } from "@chakra-ui/react";
import { Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function BaseAuthLayout(): React.ReactNode {
  const token = localStorage.getItem("token");

  if (token) return <Navigate to={"/"}></Navigate>;

  return (
    <Grid
      bg={"brand.background"}
      height={"100vh"}
      width={"100%"}
      color={"brand.color"}
      gridTemplateColumns={"100%"}
      alignItems={"center"}
      paddingX={"150px"}
      justifyItems={"center"}
    >
      <Box bg={"brand.backgroundBlur"} width={"50%"}>
        <ToastContainer autoClose={2000}></ToastContainer>
        <Outlet />
      </Box>
    </Grid>
  );
}
