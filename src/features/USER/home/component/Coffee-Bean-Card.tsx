import React, { useState } from "react";
import {
  Box,
  Button,
  Image,
  Text,
  VStack,
  HStack,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiShoppingCart, FiHeart } from "react-icons/fi";
import ChakraLinkExtendReactRouterLink from "../../../../components/Chakra-LInk-Extend-React-Router-Link";
import nothingImage from "../../../../assets/image/no-image-gallery.png";

const MotionBox = motion(Box);
const MotionButton = motion(Button);

interface CoffeeBeanCardProps {
  product: any;
  onOpen: () => void;
  index: number;
}

const CoffeeBeanCard: React.FC<CoffeeBeanCardProps> = ({ product, onOpen, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const cardBg = useColorModeValue("rgba(255,255,255,0.55)", "rgba(44,24,16,0.45)");
  const borderGlass = useColorModeValue("rgba(255,255,255,0.35)", "rgba(255,255,255,0.18)");
  const shadowColor = useColorModeValue(
    "rgba(60, 36, 20, 0.18)",
    "rgba(0, 0, 0, 0.35)"
  );

  const formatPrice = (price: string) => {
    return parseInt(price).toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      position="relative"
      w={{ base: "280px", md: "320px" }}
      h="420px"
      cursor="pointer"
    >
      {/* Decorative Floating Leaf Accents */}
      <MotionBox
        position="absolute"
        top="-10px"
        left="-15px"
        width="20px"
        height="20px"
        bg="brand.forest"
        borderRadius="50% 0 50% 0"
        zIndex={1}
        animate={isHovered ? "hover" : "idle"}
        variants={{
          idle: { rotate: 0, scale: 1, y: 0 },
          hover: { rotate: 15, scale: 1.1, y: -6 },
        }}
        transition={{ duration: 0.3 }}
      />
      
      <MotionBox
        position="absolute"
        top="-5px"
        right="-10px"
        width="15px"
        height="15px"
        bg="brand.sage"
        borderRadius="50% 0 50% 0"
        zIndex={1}
        animate={isHovered ? "hover" : "idle"}
        variants={{
          idle: { rotate: 0, scale: 1, y: 0 },
          hover: { rotate: -10, scale: 1.1, y: -6 },
        }}
        transition={{ duration: 0.3, delay: 0.1 }}
      />

      {/* Main Card Container - Glassmorphism + organic rounded */}
      <MotionBox
        bg={cardBg}
        borderRadius="32px"
        p={6}
        h="100%"
        boxShadow={`0 10px 30px ${shadowColor}`}
        border="1px solid"
        borderColor={borderGlass}
        position="relative"
        overflow="hidden"
        style={{ backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
        animate={isHovered ? "hover" : "idle"}
        variants={{
          idle: { 
            scale: 1,
            rotate: 0,
            boxShadow: `0 10px 30px ${shadowColor}`,
          },
          hover: { 
            scale: 1.02,
            rotate: 0.6,
            boxShadow: `0 18px 48px ${shadowColor}`,
          },
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Soft highlight blob */}
        <Box
          position="absolute"
          top="-60px"
          left="-60px"
          width="180px"
          height="180px"
          borderRadius="50%"
          // bgGradient="radial(brand.latte, transparent)"
          bg="green"
          opacity={0.35}
          filter="blur(20px)"
          pointerEvents="none"
        />

        {/* Inner subtle border */}
        <Box
          position="absolute"
          top="10%"
          left="10%"
          right="10%"
          bottom="10%"
          borderRadius="28px"
          border="1px solid"
          borderColor="brand.accent"
          opacity={0.3}
          bg="brand.latte"
          height={"100%"}

        />
        {/* Like Button */}
        <MotionButton
          position="absolute"
          top={4}
          right={4}
          size="sm"
          variant="ghost"
          color={isLiked ? "red.400" : "gray.400"}
          onClick={(e) => {
            e.preventDefault();
            setIsLiked(!isLiked);
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          zIndex={2}
        >
          <FiHeart />
        </MotionButton>

        {/* Product Image */}
        <ChakraLinkExtendReactRouterLink
          onClick={onOpen}
          to="/"
          state={{ product }}
          display="block"
          h="220px"
          mb={4}
        >
          <MotionBox
            position="relative"
            h="220px"
            borderRadius="24px"
            overflow="hidden"
            bg="brand.latte"
            animate={isHovered ? "hover" : "idle"}
            variants={{
              idle: { scale: 1 },
              hover: { scale: 1.05 },
            }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={product?.images[0]?.imageUrl ?? nothingImage}
              alt={product.name}
              width="100%"
              height="100%"
              objectFit="cover"
              filter={isHovered ? "brightness(1.1)" : "brightness(1)"}
              transition="filter 0.3s ease"
            />
            
            {/* Overlay gradient */}
            <Box
              position="absolute"
              bottom={0}
              left={0}
              right={0}
              h="50%"
              bgGradient="linear(to-t, blackAlpha.400, transparent)"
            />
          </MotionBox>
        </ChakraLinkExtendReactRouterLink>

        {/* Product Info */}
        <VStack align="center" spacing={3} flex={1}>
          <Text
            fontSize="lg"
            fontWeight="700"
            color="brand.espresso"
            textTransform="capitalize"
            noOfLines={2}
            lineHeight="1.2"
          >
            {product.name}
          </Text>

          <HStack justify="space-between" width="100%">
            <VStack align="start" spacing={1}  w={"100%"} textAlign={"center"} alignItems={"center"}> 
              <Text
                fontSize="xl"
                fontWeight="800"
                color="brand.primary"
              >
                {formatPrice(product.price)}
              </Text>
              <Badge
                colorScheme={product.quantity > 10 ? "green" : "orange"}
                variant="subtle"
                borderRadius="full"
                px={3}
                py={1}
              >
                Stock: {product.quantity}
              </Badge>
            </VStack>
          </HStack>

          {/* Add to Cart Button */}
          <MotionButton
            width="100%"
            bg="brand.primary"
            color="white"
            size="md"
            fontWeight="600"
            leftIcon={<FiShoppingCart />}
            _hover={{
              bg: "brand.espresso",
            }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 8px 25px rgba(139, 69, 19, 0.3)",
            }}
            whileTap={{ scale: 0.98 }}
            transition="all 0.2s ease"
            onClick={(e) => {
              e.preventDefault();
              // Add to cart logic here
            }}
          >
            Add to Cart
          </MotionButton>
        </VStack>

        {/* Animated Coffee Bean Decoration */}
        <MotionBox
          position="absolute"
          bottom="-5px"
          left="-5px"
          width="30px"
          height="18px"
          bg="brand.primary"
          borderRadius="50%"
          opacity={0.1}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" } as any}
        />
      </MotionBox>
    </MotionBox>
  );
};

export default CoffeeBeanCard;
