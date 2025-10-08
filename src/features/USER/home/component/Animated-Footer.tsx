import React from "react";
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Link,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiMail, FiPhone, FiMapPin, FiInstagram, FiFacebook, FiTwitter } from "react-icons/fi";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

const AnimatedFooter: React.FC = () => {
  const bgColor = useColorModeValue("brand.espresso", "brand.darkTheme");
  const textColor = useColorModeValue("brand.latte", "brand.cappuccino");
  const linkColor = useColorModeValue("brand.accent", "brand.sage");

  return (
    <Box
      bg={bgColor}
      color={textColor}
      position="relative"
      overflow="hidden"
      py={16}
    >
      {/* Animated Background Elements */}
      <Box position="absolute" top="0" left="0" width="100%" height="100%" overflow="hidden">
        {/* Rising Steam */}
        {[...Array(12)].map((_, i) => (
          <MotionBox
            key={i}
            position="absolute"
            width="2px"
            height="60px"
            bg="brand.latte"
            opacity="0.2"
            borderRadius="1px"
            left={`${Math.random() * 100}%`}
            bottom="0"
            animate={{
              y: [0, -100, -200],
              opacity: [0.2, 0.6, 0],
              scale: [1, 1.2, 0.8],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Floating Coffee Beans */}
        {[...Array(8)].map((_, i) => (
          <MotionBox
            key={i}
            position="absolute"
            width="16px"
            height="10px"
            bg="brand.primary"
            opacity="0.1"
            borderRadius="50%"
            left={`${Math.random() * 100}%`}
            top={`${Math.random() * 100}%`}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
              x: [0, Math.random() * 20 - 10],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
          />
        ))}
      </Box>

      <Container maxW="7xl" position="relative" zIndex={2}>
        <VStack spacing={12}>
          {/* Main Footer Content */}
          <HStack
            spacing={12}
            align="start"
            justify="space-between"
            width="100%"
            flexDirection={{ base: "column", lg: "row" }}
          >
            {/* Brand Section */}
            <MotionVStack
              align={{ base: "center", lg: "start" }}
              spacing={6}
              flex="1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Text
                fontSize="3xl"
                fontFamily="heading"
                fontWeight="bold"
                color="brand.latte"
              >
                WaysBeans
              </Text>
              <Text
                fontSize="lg"
                color={textColor}
                textAlign={{ base: "center", lg: "left" }}
                maxW="400px"
                lineHeight="1.6"
              >
                Crafting the perfect coffee experience with premium beans sourced from the world's finest coffee regions. 
                Every cup tells a story of passion, quality, and dedication.
              </Text>
              
              {/* Social Links */}
              <HStack spacing={4}>
                {[
                  { icon: FiInstagram, label: "Instagram", href: "#" },
                  { icon: FiFacebook, label: "Facebook", href: "#" },
                  { icon: FiTwitter, label: "Twitter", href: "#" },
                ].map((social) => (
                  <MotionBox
                    key={social.label}
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  >
                    <Link
                      href={social.href}
                      color={linkColor}
                      _hover={{ color: "brand.latte" }}
                      transition="color 0.3s ease"
                    >
                      <social.icon size="24px" />
                    </Link>
                  </MotionBox>
                ))}
              </HStack>
            </MotionVStack>

            {/* Quick Links */}
            <MotionVStack
              align={{ base: "center", lg: "start" }}
              spacing={4}
              flex="1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Text
                fontSize="xl"
                fontWeight="bold"
                color="brand.latte"
                mb={2}
              >
                Quick Links
              </Text>
              {[
                "About Us",
                "Our Story",
                "Coffee Origins",
                "Brewing Guide",
                "Sustainability",
                "Careers",
              ].map((link) => (
                <Link
                  key={link}
                  href="#"
                  color={textColor}
                  _hover={{ color: linkColor, transform: "translateX(5px)" }}
                  transition="all 0.3s ease"
                  fontSize="md"
                >
                  {link}
                </Link>
              ))}
            </MotionVStack>

            {/* Contact Info */}
            <MotionVStack
              align={{ base: "center", lg: "start" }}
              spacing={4}
              flex="1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Text
                fontSize="xl"
                fontWeight="bold"
                color="brand.latte"
                mb={2}
              >
                Contact Us
              </Text>
              
              <VStack align={{ base: "center", lg: "start" }} spacing={3}>
                <HStack spacing={3}>
                  <FiMail color={linkColor} />
                  <Text color={textColor}>hello@waysbeans.com</Text>
                </HStack>
                
                <HStack spacing={3}>
                  <FiPhone color={linkColor} />
                  <Text color={textColor}>+1 (555) 123-4567</Text>
                </HStack>
                
                <HStack spacing={3} align="start">
                  <FiMapPin color={linkColor} style={{ marginTop: "2px" }} />
                  <Text color={textColor} maxW="200px">
                    123 Coffee Street, Bean City, BC 12345
                  </Text>
                </HStack>
              </VStack>
            </MotionVStack>
          </HStack>

          <Divider borderColor="brand.mocha" opacity="0.3" />

          {/* Bottom Section */}
          <HStack
            justify="space-between"
            width="100%"
            flexDirection={{ base: "column", md: "row" }}
            spacing={4}
            textAlign={{ base: "center", md: "left" }}
          >
            <Text color={textColor} fontSize="sm">
              © 2024 WaysBeans. All rights reserved. Crafted with ☕ and ❤️
            </Text>
            
            <HStack spacing={6} fontSize="sm">
              <Link href="#" color={textColor} _hover={{ color: linkColor }}>
                Privacy Policy
              </Link>
              <Link href="#" color={textColor} _hover={{ color: linkColor }}>
                Terms of Service
              </Link>
              <Link href="#" color={textColor} _hover={{ color: linkColor }}>
                Cookie Policy
              </Link>
            </HStack>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default AnimatedFooter;
