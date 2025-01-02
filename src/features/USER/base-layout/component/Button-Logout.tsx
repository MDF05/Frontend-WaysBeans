import { Button } from "@chakra-ui/react";
import { useAppDispatch } from "../../../../stores/stores";
import { LOGOUT } from "../../../../stores/auth/slice";
import { useNavigate } from "react-router-dom";

export default function ButtonLogout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function Logout() {
    dispatch(LOGOUT());
    navigate("/login");
  }

  return (
    <Button
      onClick={() => Logout()}
      bg={"transparent"}
      _hover={{ bg: "transparent" }}
      p={"0"}
      m={"0"}
      width={"100%"}
      display={"flex"}
      justifyContent={"start"}
      height={"20px"}
      fontWeight={"normal"}
    >
      Logout
    </Button>
  );
}
