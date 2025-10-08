import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  VStack,
  Text,
  HStack,
  Avatar,
  Heading,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiChevronLeft, FiChevronRight, FiStar } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Coffee Enthusiast",
    content: "WaysBeans has completely transformed my morning routine. The rich, aromatic coffee beans create the perfect cup every time. It's like having a premium café experience at home!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Barista",
    content: "As a professional barista, I'm very particular about coffee quality. WaysBeans consistently delivers exceptional beans with complex flavors and perfect roast profiles.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Home Brewer",
    content: "The variety of beans from WaysBeans is incredible. Each origin tells a unique story through its flavor profile. My coffee collection has never been more diverse and delicious!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Coffee Shop Owner",
    content: "WaysBeans is my go-to supplier for premium coffee beans. The quality is unmatched, and my customers always ask about the exceptional taste. Highly recommended!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
];

const TestimonialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const bgColor = useColorModeValue("brand.cream", "brand.darkTheme");
  const cardBg = useColorModeValue("white", "brand.mocha");
  const textColor = useColorModeValue("brand.espresso", "brand.latte");

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <Box
      bg={bgColor}
      py={20}
      position="relative"
      overflow="hidden"
    >
      {/* Animated Steam Background */}
      <Box position="absolute" top="0" left="0" width="100%" height="100%" overflow="hidden">
        {[...Array(8)].map((_, i) => (
          <MotionBox
            key={i}
            position="absolute"
            width="3px"
            height="40px"
            bg="brand.primary"
            opacity="0.1"
            borderRadius="2px"
            left={`${Math.random() * 100}%`}
            top={`${Math.random() * 100}%`}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </Box>

      <Container maxW="6xl" position="relative" zIndex={2}>
        <VStack spacing={12}>
          {/* Section Header */}
          <MotionVStack
            spacing={4}
            textAlign="center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Text
              fontSize="lg"
              color="brand.accent"
              fontWeight="600"
              letterSpacing="2px"
              textTransform="uppercase"
            >
              Customer Stories
            </Text>
            <Heading
              as="h2"
              fontSize={{ base: "3xl", md: "4xl" }}
              fontFamily="heading"
              color={textColor}
              textAlign="center"
            >
              What Our Coffee Lovers Say
            </Heading>
          </MotionVStack>

          {/* Carousel Container */}
          <Box
            position="relative"
            width="100%"
            maxW="800px"
            height="300px"
            mx="auto"
          >
            <AnimatePresence mode="wait" custom={direction}>
              <MotionBox
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                position="absolute"
                width="100%"
                height="100%"
              >
                <Box
                  bg={cardBg}
                  borderRadius="2xl"
                  p={8}
                  h="100%"
                  boxShadow="0 8px 32px rgba(139, 69, 19, 0.1)"
                  border="1px solid"
                  borderColor="brand.cappuccino"
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                >
                  <VStack spacing={6} textAlign="center">
                    {/* Stars */}
                    <HStack spacing={1}>
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <MotionBox
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <FiStar
                            size="20px"
                            color="#FFD700"
                            fill="#FFD700"
                          />
                        </MotionBox>
                      ))}
                    </HStack>

                    {/* Testimonial Content */}
                    <Text
                      fontSize="lg"
                      color={textColor}
                      lineHeight="1.6"
                      fontStyle="italic"
                      maxW="600px"
                    >
                      "{testimonials[currentIndex].content}"
                    </Text>

                    {/* Author Info */}
                    <HStack spacing={4}>
                      <Avatar
                        size="md"
                        src={testimonials[currentIndex].avatar}
                        name={testimonials[currentIndex].name}
                      />
                      <VStack align="start" spacing={1}>
                        <Text
                          fontWeight="600"
                          color={textColor}
                          fontSize="md"
                        >
                          {testimonials[currentIndex].name}
                        </Text>
                        <Text
                          color="brand.accent"
                          fontSize="sm"
                          fontWeight="500"
                        >
                          {testimonials[currentIndex].role}
                        </Text>
                      </VStack>
                    </HStack>
                  </VStack>
                </Box>
              </MotionBox>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <IconButton
              aria-label="Previous testimonial"
              icon={<FiChevronLeft />}
              position="absolute"
              left="-60px"
              top="50%"
              transform="translateY(-50%)"
              bg="brand.primary"
              color="white"
              borderRadius="full"
              size="lg"
              onClick={prevTestimonial}
              _hover={{
                bg: "brand.espresso",
                transform: "translateY(-50%) scale(1.1)",
              }}
              transition="all 0.3s ease"
            />

            <IconButton
              aria-label="Next testimonial"
              icon={<FiChevronRight />}
              position="absolute"
              right="-60px"
              top="50%"
              transform="translateY(-50%)"
              bg="brand.primary"
              color="white"
              borderRadius="full"
              size="lg"
              onClick={nextTestimonial}
              _hover={{
                bg: "brand.espresso",
                transform: "translateY(-50%) scale(1.1)",
              }}
              transition="all 0.3s ease"
            />
          </Box>

          {/* Dots Indicator */}
          <HStack spacing={3}>
            {testimonials.map((_, index) => (
              <MotionBox
                key={index}
                  width="12px"
                  height="12px"
                borderRadius="full"
                bg={index === currentIndex ? "brand.primary" : "brand.cappuccino"}
                cursor="pointer"
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              />
            ))}
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default TestimonialCarousel;
