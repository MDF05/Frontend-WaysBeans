import { Avatar, Center, Grid } from "@chakra-ui/react";
import useMenuItemUser from "../hooks/use-menu-item-user";
import avatarImage from "../../../../assets/image/profile.png";

export default function MenuItemUser() {
  const { state } = useMenuItemUser();

  return (
    <Grid>
      <br />
      <Center>
        <Avatar size={"2xl"} src={state.profile?.content?.profile.imageUrl ?? avatarImage} border={"1px solid black"} />
      </Center>
      <br />
      <Center flexDirection={"column"}>
        <p>{state.profile?.content?.profile?.name ?? "username"}</p>
        <p>{state.profile?.content?.profile.user?.email ?? "user@gmail.com"}</p>
      </Center>
      <br />
    </Grid>
  );
}
