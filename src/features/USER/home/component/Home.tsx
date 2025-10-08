import React, { useEffect } from "react";
import { Box, Container, VStack, Heading, Text, useDisclosure, useColorModeValue } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../../../stores/stores";
import { GetProductAsync } from "../../../../stores/product/async-product";

// New Components
import HeroSection from "./Hero-Section";
import ModernSearch from "./Modern-Search";
import ModernFilter from "./Modern-Filter";
import CoffeeBeanCard from "./Coffee-Bean-Card";
import TestimonialCarousel from "./Testimonial-Carousel";
import AnimatedFooter from "./Animated-Footer";
import FloatingCart from "./Floating-Cart";
import ScrollReveal from "./Scroll-Reveal";
import ModalDetailProduct from "./Modal-Detail-Product";

export default function Home(): React.ReactNode {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.auth);
  const products = useAppSelector((state) => state.products);
  
  const bgColor = useColorModeValue("brand.background", "brand.darkTheme");

  useEffect(() => {
    if (state?.user?.id) {
      dispatch(GetProductAsync()).unwrap();
    }
  }, [dispatch, state?.user?.id]);

  const displayProducts = products.filterProduct ?? products?.products?.content ?? [];

  return (
    <Box bg={bgColor} minH="100vh">
      {/* Hero Section */}
      <HeroSection />

      {/* Products Section */}
      <Box py={20} position="relative" >
        <Container maxW="7xl" >
          <VStack spacing={16}>
            {/* Section Header */}
            <ScrollReveal direction="up" delay={0.2}>
              <VStack spacing={4} textAlign="center" maxW="600px" mx="auto">
                <Text
                  fontSize="lg"
                  color="brand.accent"
                  fontWeight="600"
                  letterSpacing="2px"
                  textTransform="uppercase"
                >
                  Our Premium Collection
                </Text>
                <Heading
                  as="h2"
                  fontSize={{ base: "3xl", md: "4xl" }}
                  fontFamily="heading"
                  color="brand.espresso"
                  textAlign="center"
                >
                  Discover Your Perfect Coffee
                </Heading>
                <Text
                  fontSize="lg"
                  color="brand.mocha"
                  textAlign="center"
                  lineHeight="1.6"
                >
                  Handpicked beans from the world's finest coffee regions, 
                  roasted to perfection for an exceptional experience.
                </Text>
              </VStack>
            </ScrollReveal>

            {/* Search and Filter */}
            <ScrollReveal direction="up" delay={0.4}>
              <VStack spacing={8} width="100%">
                <ModernSearch />
                <ModernFilter />
              </VStack>
            </ScrollReveal>

            {/* Products Grid */}
            <ScrollReveal direction="up" delay={0.6} style={{ width: "100%" }} >
              <Box width="100%" bg={"green"} >
                {displayProducts.length > 0 ? (
                  <Box
                    display="grid"
                    gridTemplateColumns={{
                      base: "repeat(auto-fit, minmax(280px, 1fr))",
                      md: "repeat(auto-fit, minmax(320px, 1fr))",
                      lg: "repeat(auto-fit, minmax(320px, 1fr))",
                    }}
                    gap={8}
                    justifyItems="center"
                    px={{ base: 4, md: 0 }}
                  >
                    {displayProducts.map((product: any, index: number) => (
                      <CoffeeBeanCard
                        key={product.id || index}
                        product={product}
                        onOpen={onOpen}
                        index={index}
                      />
                    ))}
                  </Box>
                ) : (
                  <VStack spacing={6} py={20}>
                    <Text fontSize="xl" color="brand.mocha" textAlign="center">
                      No products found matching your search.
                    </Text>
                    <Text color="brand.accent" textAlign="center">
                      Try adjusting your search terms or filters.
                    </Text>
                  </VStack>
                )}
              </Box>
            </ScrollReveal>
          </VStack>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <TestimonialCarousel />

      {/* Footer */}
      <AnimatedFooter />

      {/* Floating Cart */}
      <FloatingCart />

      {/* Product Detail Modal */}
      <ModalDetailProduct isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}
