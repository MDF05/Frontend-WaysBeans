import { Box, Button, Flex, Text, VStack, InputGroup, InputLeftElement, Input, FormControl, FormErrorMessage, useToken, HStack } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { MdPerson, MdLock } from "react-icons/md";
import { GiCoffeeBeans } from "react-icons/gi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useLogin from "../hook/use-login";
import { LoginSchema, loginSchema } from "./../../../../../schemas/login-schema";
import ChakraLinkExtendReactRouterLink from "../../../../../components/Chakra-LInk-Extend-React-Router-Link";
import coffeeBg from "../../../../../assets/image/bubuk-coffe.webp";

export default function Login(): React.ReactNode {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) });

  const { loading, onSubmit } = useLogin();

  // animations and tokens
  const steam = keyframes`
    0% { transform: translateY(20px) scale(1); opacity: .15; }
    50% { transform: translateY(-10px) scale(1.05); opacity: .25; }
    100% { transform: translateY(-40px) scale(1.1); opacity: .1; }
  `;
  const [caramel] = useToken("colors", ["brand.bgYoung"]);

  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      position={"fixed"}
      top={0}
      right={0}
      bottom={0}
      left={0}
      zIndex={1}
      bgImage={`linear-gradient(rgba(18,12,7,0.65), rgba(43,30,22,0.75)), url(${coffeeBg})`}
      bgSize={"cover"}
      bgPos={"center"}
      bgRepeat={"no-repeat"}
      overflow={"hidden"}
      p={{ base: "20px", md: "32px" }}
      as={"form"}
      onSubmit={handleSubmit((data) => onSubmit(data))}
    >
      {/* steam layers */}
      <Box position="absolute" top="-40px" left="10%" w="140px" h="220px" bgGradient={"radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1), transparent 60%)"} filter="blur(18px)" animation={`${steam} 6s ease-in-out infinite`} />
      <Box position="absolute" top="-20px" left="60%" w="180px" h="260px" bgGradient={"radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1), transparent 60%)"} filter="blur(20px)" animation={`${steam} 7.5s ease-in-out infinite`} />
      <Box position="absolute" top="0" left="35%" w="120px" h="200px" bgGradient={"radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08), transparent 60%)"} filter="blur(18px)" animation={`${steam} 5.5s ease-in-out infinite`} />

      {/* Card */}
      <Box
        w={{ base: "100%", sm: "420px" }}
        bgGradient={"linear(to-b, #F4E6D8, #E8D3BA)"}
        color={"#2B1E16"}
        rounded={{ base: "xl" }}
        boxShadow={"0 20px 60px rgba(43,30,22,.45), inset 0 1px 0 rgba(255,255,255,.6)"}
        border={"1px solid rgba(139,94,52,.25)"}
        p={{ base: "26px", md: "30px" }}
        position="relative"
      >
        {/* Subtle top beans accent */}
        <HStack position="absolute" top="-14px" left="50%" transform="translateX(-50%)" spacing="6px" opacity={0.8}>
          <GiCoffeeBeans color="#8B5E34" />
          <GiCoffeeBeans color="#5C3A21" />
          <GiCoffeeBeans color="#8B5E34" />
        </HStack>
        <VStack gap={"18px"} alignItems={"stretch"}>
          <Box>
            <Text fontSize={{ base: "1.8rem", md: "2rem" }} fontWeight={700} fontFamily={"Georgia, 'Times New Roman', serif"} letterSpacing={"0.3px"}>
              Bubuk Coffee
            </Text>
            <Text fontSize={{ base: "0.95rem", md: "1rem" }} color={"#5C3A21"}>
              Welcome back — please sign in
            </Text>
          </Box>

          <FormControl isInvalid={errors["nameOrEmail"] !== undefined}>
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="#8B5E34">
                <MdPerson />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="name or email"
                {...register("nameOrEmail")}
                bg={"#F6EADB"}
                borderColor={"#C8A27A"}
                color={"#2B1E16"}
                _placeholder={{ color: "#8B5E34" }}
                _focus={{
                  boxShadow: `0 0 0 3px ${caramel || '#C8A27A'}66`,
                  borderColor: "#8B5E34",
                }}
              />
            </InputGroup>
            {errors["nameOrEmail"] && <FormErrorMessage>{errors["nameOrEmail"].message as string}</FormErrorMessage>}
          </FormControl>

          <FormControl isInvalid={errors["password"] !== undefined}>
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="#8B5E34">
                <MdLock />
              </InputLeftElement>
              <Input
                type="password"
                placeholder="password"
                {...register("password")}
                bg={"#F6EADB"}
                borderColor={"#C8A27A"}
                color={"#2B1E16"}
                _placeholder={{ color: "#8B5E34" }}
                _focus={{
                  boxShadow: `0 0 0 3px ${caramel || '#C8A27A'}66`,
                  borderColor: "#8B5E34",
                }}
              />
            </InputGroup>
            {errors["password"] && <FormErrorMessage>{errors["password"].message as string}</FormErrorMessage>}
          </FormControl>

          <Box mt={"10px"}>
            <Button
              type={"submit"}
              isLoading={loading}
              width={"100%"}
              bgGradient={"linear(to-r, #8B5E34, #5C3A21)"}
              color={"#FFFDF7"}
              transition={"all .25s ease"}
              _hover={{ filter: "brightness(1.06)", transform: "translateY(-1px)" }}
              _active={{ transform: "translateY(0) scale(0.99)" }}
            >
              Login
            </Button>
            <Flex gap="5px" mt={"10px"} color={"#5C3A21"}>
              <Text>don't have an account ? klik</Text>
              <ChakraLinkExtendReactRouterLink to="/register">
                <b>here</b>
              </ChakraLinkExtendReactRouterLink>
            </Flex>
          </Box>
        </VStack>
      </Box>
    </Flex>
  );
}
