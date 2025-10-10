import React from "react";
import { Box, Button, useColorModeValue, Tooltip } from "@chakra-ui/react";
import { FiSun, FiMoon } from "react-icons/fi";
import { motion } from "framer-motion";
import { useColorMode } from "@chakra-ui/react";

const MotionButton = motion(Button);

const FloatingCart: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

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
        label={
          colorMode === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"
        }
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
          _hover={{ bg: hoverBg }}
          whileHover={{
            scale: 1.1,
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
          {colorMode === "light" ? (
            <FiMoon size="24px" />
          ) : (
            <FiSun size="24px" />
          )}
        </MotionButton>
      </Tooltip>
    </Box>
  );
};

export default FloatingCart;
