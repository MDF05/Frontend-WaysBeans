import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import InputForm from "../../component/Input-Form";
import { detailInputForm } from "../../types/input-form-types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useLogin from "../hook/use-login";
import { LoginSchema, loginSchema } from "./../../../../../schemas/login-schema";
import ChakraLinkExtendReactRouterLink from "../../../../../components/Chakra-LInk-Extend-React-Router-Link";

const inputFormLogin: detailInputForm[] = [
  { placeHolder: "name or email", type: "text", inputName: "nameOrEmail" },
  { placeHolder: "password", type: "password", inputName: "password" },
];

export default function Login(): React.ReactNode {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) });

  const { loading, onSubmit } = useLogin();

  return (
    <VStack padding={"30px 20px"} gap={"20px"} as={"form"} onSubmit={handleSubmit((data) => onSubmit(data))}>
      <Box w={"100%"}>
        <Text color={"brand.baseColor"} fontSize={"2rem"} fontWeight={"bold"}>
          Login
        </Text>
      </Box>
      <VStack gap={"20px"} w={"100%"}>
        <InputForm ElementDetails={inputFormLogin} registerHook={register} errors={errors}></InputForm>
      </VStack>
      <Box mt={"10px"} width={"100%"}>
        <Button bg={"brand.default"} width={"100%"} color={"brand.whiteColor"} type={"submit"} isLoading={loading} _hover={{ bg: "green" }}>
          Login
        </Button>
        <Flex gap="5px" mt={"10px"} color={"brand.default"}>
          <Text>don't have an account ? klik</Text>
          <ChakraLinkExtendReactRouterLink to="/register">
            <b>here</b>
          </ChakraLinkExtendReactRouterLink>
        </Flex>
      </Box>
    </VStack>
  );
}
