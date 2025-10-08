import { Box, Button, Flex, Text, VStack, InputGroup, InputLeftElement, Input, FormControl, FormErrorMessage, useToken, HStack } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { MdEmail, MdPerson, MdLock } from "react-icons/md";
import { GiCoffeeBeans } from "react-icons/gi";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useRegister from "../../login/hook/use-register";
import { registerSchema, RegisterSchema } from "../../../../../schemas/register-schema";
import ChakraLinkExtendReactRouterLink from "./../../../../../components/Chakra-LInk-Extend-React-Router-Link";
import coffeeBg from "../../../../../assets/image/bubuk-coffe.webp";

export default function Register(): React.ReactNode {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({ resolver: zodResolver(registerSchema) });

  const { loading, onSubmit } = useRegister();

  // Animations and styles
  const steam = keyframes`
    0% { transform: translateY(20px) scale(1); opacity: .15; }
    50% { transform: translateY(-10px) scale(1.05); opacity: .25; }
    100% { transform: translateY(-40px) scale(1.1); opacity: .1; }
  `;
  const rippleKeyframes = keyframes`
    0% { transform: scale(0); opacity: .35; }
    80% { transform: scale(12); opacity: .15; }
    100% { transform: scale(14); opacity: 0; }
  `;

  const beanFloat = keyframes`
    0% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(8deg); }
    100% { transform: translateY(0) rotate(0deg); }
  `;


  const [ripple, setRipple] = useState<{ x: number; y: number; ts: number } | null>(null);

  const handleRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRipple({ x, y, ts: Date.now() });
    setTimeout(() => setRipple(null), 600);
  };

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
              Register and start your artisan coffee journey
            </Text>
          </Box>

          {/* Inputs with icons */}
          <FormControl isInvalid={errors["email"] !== undefined}>
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="#8B5E34">
                <MdEmail />
              </InputLeftElement>
              <Input
                type="email"
                placeholder="email"
                {...register("email")}
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
            {errors["email"] && <FormErrorMessage>{errors["email"].message as string}</FormErrorMessage>}
          </FormControl>

          <FormControl isInvalid={errors["name"] !== undefined}>
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="#8B5E34">
                <MdPerson />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="username"
                {...register("name")}
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
            {errors["name"] && <FormErrorMessage>{errors["name"].message as string}</FormErrorMessage>}
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

          {/* Submit */}
          <Box mt={"10px"}>
            <Button
              type={"submit"}
              isLoading={loading}
              width={"100%"}
              position="relative"
              overflow="hidden"
              bgGradient={"linear(to-r, #8B5E34, #5C3A21)"}
              color={"#FFFDF7"}
              transition={"all .25s ease"}
              _hover={{ filter: "brightness(1.06)", transform: "translateY(-1px)" }}
              _active={{ transform: "translateY(0) scale(0.99)" }}
              onClick={handleRipple}
              _before={ripple ? {
                content: '""',
                position: "absolute",
                top: `${ripple.y - 10}px`,
                left: `${ripple.x - 10}px`,
                width: "20px",
                height: "20px",
                borderRadius: "9999px",
                background: "rgba(255, 255, 255, .45)",
                animation: `${rippleKeyframes} .6s ease-out forwards`,
                pointerEvents: "none",
              } : {}}
            >
              Register
            </Button>
            <Flex gap="5px" mt="10px" color={"#5C3A21"}>
              <Text>already have an account ? klik</Text>
              <ChakraLinkExtendReactRouterLink to="/login">
                <b>here</b>
              </ChakraLinkExtendReactRouterLink>
            </Flex>
          </Box>
        </VStack>
      </Box>

      {/* Floating bean icons */}
      <Box position="absolute" top="20%" left="8%" opacity={0.4} animation={`${beanFloat} 4.8s ease-in-out infinite`}>
        <GiCoffeeBeans size={20} color="#C8A27A" />
      </Box>
      <Box position="absolute" top="70%" left="85%" opacity={0.5} animation={`${beanFloat} 5.6s ease-in-out infinite`}>
        <GiCoffeeBeans size={22} color="#8B5E34" />
      </Box>
      <Box position="absolute" top="35%" left="78%" opacity={0.45} animation={`${beanFloat} 5.2s ease-in-out infinite`}>
        <GiCoffeeBeans size={18} color="#D9C2A7" />
      </Box>
    </Flex>
  );
}
