import React, { useState } from "react";
import {
  Box,
  Button,
  Badge,
  useColorModeValue,
  Tooltip,
} from "@chakra-ui/react";
import { FiShoppingCart, FiSun, FiMoon } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useColorMode } from "@chakra-ui/react";
import { useAppSelector } from "../../../../stores/stores";

const MotionBox = motion(Box);
const MotionButton = motion(Button);

const FloatingCart: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isHovered, setIsHovered] = useState(false);
  
  // Get cart count from store (assuming it exists)
  const cartCount = useAppSelector((state) => state.cart?.items?.length || 0);

  const bgColor = useColorModeValue("brand.primary", "brand.accent");
  const hoverBg = useColorModeValue("brand.espresso", "brand.primary");
  const shadowColor = useColorModeValue(
    "rgba(139, 69, 19, 0.3)",
    "rgba(139, 69, 19, 0.5)"
  );

  return (
    <Box
      position="fixed"
      bottom="30px"
      right="30px"
      zIndex={1000}
      display="flex"
      flexDirection="column"
      gap={3}
    >
      {/* Dark Mode Toggle */}
      <Tooltip
        label={colorMode === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
        placement="left"
        hasArrow
      >
        <MotionButton
          size="lg"
          bg={bgColor}
          color="white"
          borderRadius="full"
          width="60px"
          height="60px"
          boxShadow={`0 8px 25px ${shadowColor}`}
          onClick={toggleColorMode}
          whileHover={{ 
            scale: 1.1,
            bg: hoverBg,
            boxShadow: `0 12px 35px ${shadowColor}`,
          }}
          whileTap={{ scale: 0.95 }}
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {colorMode === "light" ? <FiMoon size="24px" /> : <FiSun size="24px" />}
        </MotionButton>
      </Tooltip>

      {/* Floating Cart Button */}
      <Tooltip
        label={`${cartCount} items in cart`}
        placement="left"
        hasArrow
        isDisabled={cartCount === 0}
      >
        <MotionBox
          position="relative"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <MotionButton
            size="lg"
            bg={bgColor}
            color="white"
            borderRadius="full"
            width="70px"
            height="70px"
            boxShadow={`0 8px 25px ${shadowColor}`}
            onClick={() => {
              // Open cart modal or navigate to cart page
              console.log("Open cart");
            }}
            whileHover={{ 
              scale: 1.1,
              bg: hoverBg,
              boxShadow: `0 12px 35px ${shadowColor}`,
            }}
            whileTap={{ scale: 0.95 }}
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <FiShoppingCart size="28px" />
          </MotionButton>

          {/* Cart Badge */}
          <AnimatePresence>
            {cartCount > 0 && (
              <MotionBox
                position="absolute"
                top="-5px"
                right="-5px"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Badge
                  bg="red.500"
                  color="white"
                  borderRadius="full"
                  minW="25px"
                  h="25px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize="xs"
                  fontWeight="bold"
                  boxShadow="0 2px 8px rgba(220, 38, 38, 0.3)"
                  animate={isHovered ? "pulse" : "idle"}
                  variants={{
                    idle: { scale: 1 },
                    pulse: { scale: 1.2 },
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {cartCount > 99 ? "99+" : cartCount}
                </Badge>
              </MotionBox>
            )}
          </AnimatePresence>

          {/* Cart Ripple Effect */}
          <AnimatePresence>
            {isHovered && (
              <MotionBox
                position="absolute"
                top="50%"
                left="50%"
                width="100px"
                height="100px"
                bg="brand.primary"
                borderRadius="full"
                opacity={0.1}
                initial={{ scale: 0, opacity: 0.3 }}
                animate={{ scale: 1.5, opacity: 0 }}
                exit={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 0.6 }}
                transform="translate(-50%, -50%)"
              />
            )}
          </AnimatePresence>
        </MotionBox>
      </Tooltip>
    </Box>
  );
};

export default FloatingCart;
