"use client";

import { Box, Flex, Avatar, Button, Menu, MenuButton, MenuList, MenuItem, MenuDivider, Stack, Image, Grid, useDisclosure, Text } from "@chakra-ui/react";

import waysbeanslogo from "../../../../assets/image/Frame.png";
import bigLogo from "../../../../assets/image/Icon.png";
import rectangle from "../../../../assets/image/Rectangle 3.png";
import waves from "../../../../assets/image/Waves.png";
import avatarImage from "../../../../assets/image/profile.png";

import NavLink from "./Nav-Link";
import { Outlet } from "react-router-dom";
import useBaseLayout from "../hooks/use-base-layout";
import ChakraLinkExtendReactRouterLink from "../../../../components/Chakra-LInk-Extend-React-Router-Link";
import CartModal from "../../cart/component/Modal-Cart";
import IconBadgeCart from "./../../cart/component/Icon-Badge-Cart";
import ButtonLogout from "./Button-Logout";
import MenuItemUser from "./Menu-Item-User";
import { ToastContainer } from "react-toastify";

export default function BaseLayout() {
  const { pathname, user, profile } = useBaseLayout();
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Grid>
      <ToastContainer style={{ zIndex: 100000 }} autoClose={2000}></ToastContainer>
      <CartModal isOpen={isOpen} onClose={onClose}></CartModal>
      <Box bg={"brand.navbar"} px={4} zIndex={10000} position={"fixed"} width={"100%"}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <Image src={waysbeanslogo} width={"150px"} dropShadow={"5px 5px 5px black"}></Image>
          </Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <NavLink to="/" color={"brand.default"} _hover={{ bg: "brand.bgYoung" }}>
                Home
              </NavLink>

              {user?.role == "ADMIN" && (
                <>
                  <NavLink to="/admin/product" color={pathname == "/product" ? "brand.active" : "brand.baseColor"} _hover={{ bg: "brand.bgYoung" }}>
                    Product
                  </NavLink>
                </>
              )}

              {user?.role == "USER" && (
                <NavLink to="" color={pathname == "/" ? "brand.active" : "brand.baseColor"} gap={"5px"} onClick={onOpen}>
                  <IconBadgeCart color={pathname == "/" ? "brand.active" : "brand.baseColor"}></IconBadgeCart>
                </NavLink>
              )}

              <Menu>
                <MenuButton as={Button} rounded={"full"} variant={"link"} cursor={"pointer"} minW={0}>
                  <Avatar size={"sm"} src={profile?.profile?.content?.profile?.imageUrl ?? avatarImage} border={"1px solid black"} />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <MenuItemUser></MenuItemUser>
                  <MenuDivider />
                  <MenuItem _hover={{ bg: "transparent" }} p={"0"} m={"0"}>
                    <ChakraLinkExtendReactRouterLink
                      to="/profile/me"
                      width={"100%"}
                      display={"flex"}
                      justifyContent={"start"}
                      height={"100%"}
                      _hover={{ bg: "brand.bgYoung" }}
                      p={"5px 10px"}
                    >
                      Profile
                    </ChakraLinkExtendReactRouterLink>
                  </MenuItem>
                  <MenuItem _hover={{ bg: "brand.bgYoung" }}>
                    <ButtonLogout></ButtonLogout>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>

      {(pathname == "/" || pathname == "/admin") && (
        <Flex width={"100%"} justifyItems={"center"} justifyContent={"center"} bg={"brand.darkTheme"}>
          <Flex width={"80%"} height={"500px"} bg={"brand.bgYoung"} position={"relative"}>
            <Image src={bigLogo} transform={"scale(1)"} position={"absolute"} top={"120px"} left={"50px"}></Image>
            <Text fontSize={"2rem"} color={"brand.default"} position={"absolute"} top={"260"} left={"50"}>
              BEST QUALITY COFFEE BEANS
            </Text>
            <Text fontSize={"1.4rem"} color={"brand.default"} position={"absolute"} top={"360"} left={"50"} width={"500px"}>
              Quality freshly roasted coffee made just for you. Pour, brew and enjoy
            </Text>
            <Image src={rectangle} zIndex={"2"} position={"absolute"} top={"120px"} right={"-50px"}></Image>
            <Image src={waves} zIndex="1" position={"absolute"} bottom={"20px"} right={"50px"}></Image>
          </Flex>
        </Flex>
      )}

      <Box bg={"brand.darkTheme"}>
        <Outlet></Outlet>
      </Box>
    </Grid>
  );
}
