import React, { useRef } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion, useScroll, useTransform } from "framer-motion";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

const HeroSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const bgGradient = useColorModeValue(
    "linear-gradient(135deg, #FEFCF3 0%, #F4E4BC 50%, #E6D7C3 100%)",
    "linear-gradient(135deg, #2C1810 0%, #3C2414 50%, #6F4E37 100%)"
  );

  return (
    <Box
      ref={ref}
      position="relative"
      minH="100vh"
      bgGradient={bgGradient}
      overflow="hidden"
      display="flex"
      alignItems="center"
    >
      {/* Animated Background Elements */}
      <Box position="absolute" top="0" left="0" width="100%" height="100%" overflow="hidden">
        {/* Floating Coffee Beans */}
        {[...Array(12)].map((_, i) => (
          <MotionBox
            key={i}
            position="absolute"
            width="20px"
            height="12px"
            bg="brand.primary"
            borderRadius="50%"
            left={`${Math.random() * 100}%`}
            top={`${Math.random() * 100}%`}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              x: [0, Math.random() * 20 - 10],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{ y }}
          />
        ))}

        {/* Floating Leaves */}
        {[...Array(8)].map((_, i) => (
          <MotionBox
            key={i}
            position="absolute"
            width="16px"
            height="16px"
            bg="brand.forest"
            borderRadius="50% 0 50% 0"
            left={`${Math.random() * 100}%`}
            top={`${Math.random() * 100}%`}
            animate={{
              y: [0, -25, 0],
              rotate: [0, 180],
              x: [0, Math.random() * 15 - 7.5],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
            style={{ y }}
          />
        ))}

        {/* Coffee Steam */}
        <Box position="relative">
          <MotionBox
            position="absolute"
            right="20%"
            top="40%"
            width="4px"
            height="60px"
            bg="white"
            opacity="0.3"
            borderRadius="2px"
            animate={{
              scaleY: [1, 1.5, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          {/* Steam bubble */}
          <MotionBox
            position="absolute"
            right="calc(20% - 2px)"
            top="calc(40% - 10px)"
            width="8px"
            height="8px"
            bg="white"
            borderRadius="50%"
            opacity="0.5"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </Box>
      </Box>

      <Container maxW="7xl" position="relative" zIndex={2}>
        <Flex
          direction={{ base: "column", lg: "row" }}
          align="center"
          justify="space-between"
          minH="80vh"
        >
          {/* Left Content */}
          <MotionVStack
            align={{ base: "center", lg: "start" }}
            spacing={8}
            flex="1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{ opacity }}
          >
            <VStack spacing={4} align={{ base: "center", lg: "start" }}>
              <Text
                fontSize="lg"
                color="brand.accent"
                fontWeight="600"
                letterSpacing="2px"
                textTransform="uppercase"
              >
                Premium Coffee Experience
              </Text>
              
              <Heading
                as="h1"
                fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
                fontFamily="heading"
                color="brand.espresso"
                textAlign={{ base: "center", lg: "left" }}
                lineHeight="1.1"
                maxW="600px"
              >
                Discover the Art of{" "}
                <Text as="span" color="brand.primary">
                  Perfect Coffee
                </Text>
              </Heading>
              
              <Text
                fontSize={{ base: "lg", md: "xl" }}
                color="brand.mocha"
                textAlign={{ base: "center", lg: "left" }}
                maxW="500px"
                lineHeight="1.6"
              >
                Handcrafted with love, sourced from the finest coffee regions. 
                Experience the rich aroma and exceptional taste that defines WaysBeans.
              </Text>
            </VStack>

            <Flex
              direction={{ base: "column", sm: "row" }}
              gap={4}
              w={{ base: "100%", sm: "auto" }}
            >
              <Button
                as={"a"}
                href="#coffee-product"
                size="lg"
                bg="brand.primary"
                color="white"
                px={8}
                py={6}
                fontSize="lg"
                fontWeight="600"
                _hover={{
                  bg: "brand.espresso",
                  transform: "translateY(-3px)",
                  boxShadow: "0 10px 25px rgba(139, 69, 19, 0.3)",
                }}
                _active={{
                  transform: "translateY(-1px)",
                }}
                transition="all 0.3s ease"
              >
                Shop Now
              </Button>
              
              <Button
                size="lg"
                as={"a"}
                href="#coffee-product"
                variant="outline"
                borderColor="brand.primary"
                color="brand.primary"
                px={8}
                py={6}
                fontSize="lg"
                fontWeight="600"
                _hover={{
                  bg: "brand.primary",
                  color: "white",
                  transform: "translateY(-3px)",
                  boxShadow: "0 10px 25px rgba(139, 69, 19, 0.2)",
                }}
                _active={{
                  transform: "translateY(-1px)",
                }}
                transition="all 0.3s ease"
              >
                Explore Beans
              </Button>
            </Flex>
          </MotionVStack>

          {/* Right Animated Coffee Scene */}
          <MotionBox
            flex="1"
            display="flex"
            justifyContent="center"
            alignItems="center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ y }}
          >
            <Box position="relative" w={{ base: "300px", md: "350px", lg: "400px" }} h={{ base: "300px", md: "350px", lg: "400px" }}>
              {/* Coffee Cup */}
              <MotionBox
                position="absolute"
                bottom="20%"
                left="50%"
                transform="translateX(-50%)"
                w={{ base: "150px", md: "175px", lg: "200px" }}
                h={{ base: "135px", md: "157px", lg: "180px" }}
                bg="brand.latte"
                borderRadius="0 0 100px 100px"
                border="4px solid"
                borderColor="brand.primary"
                animate={{
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Coffee Liquid */}
                <Box
                  position="absolute"
                  top="20px"
                  left="20px"
                  right="20px"
                  bottom="20px"
                  bg="brand.espresso"
                  borderRadius="0 0 80px 80px"
                />
                
                {/* Coffee Handle */}
                <Box
                  position="absolute"
                  right="-20px"
                  top="40px"
                  width="40px"
                  height="60px"
                  border="4px solid"
                  borderColor="brand.primary"
                  borderLeft="none"
                  borderRadius="0 20px 20px 0"
                  bg="brand.latte"
                />
              </MotionBox>

              {/* Pouring Coffee Pot */}
              <MotionBox
                position="absolute"
                top="10%"
                right="20%"
                w={{ base: "60px", md: "70px", lg: "80px" }}
                h={{ base: "90px", md: "105px", lg: "120px" }}
                bg="brand.primary"
                borderRadius="10px 10px 5px 5px"
                animate={{
                  rotate: [0, 15, 0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Coffee Stream */}
                <MotionBox
                  position="absolute"
                  bottom="-30px"
                  left="50%"
                  transform="translateX(-50%)"
                  width="3px"
                  height="40px"
                  bg="brand.espresso"
                  borderRadius="2px"
                  animate={{
                    scaleY: [1, 1.2, 1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </MotionBox>

              {/* Coffee Beans */}
              {[...Array(6)].map((_, i) => (
                <MotionBox
                  key={i}
                  position="absolute"
                  width="12px"
                  height="8px"
                  bg="brand.primary"
                  borderRadius="50%"
                  left={`${30 + i * 15}%`}
                  top={`${60 + Math.sin(i) * 10}%`}
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, 180],
                  }}
                  transition={{
                    duration: 2 + i * 0.3,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </Box>
          </MotionBox>
        </Flex>
      </Container>
    </Box>
  );
};

export default HeroSection;
