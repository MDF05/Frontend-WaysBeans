import React, { useState, useEffect } from "react";
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiSearch, FiX } from "react-icons/fi";
import { motion } from "framer-motion";
import { useAppDispatch } from "../../../../stores/stores";
import { setFilterProduct } from "../../../../stores/product/slice-product";

const MotionBox = motion(Box);

const ModernSearch: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const dispatch = useAppDispatch();

  const bgColor = useColorModeValue("white", "brand.darkTheme");
  const borderColor = useColorModeValue("brand.cappuccino", "brand.mocha");
  const focusBorderColor = useColorModeValue("brand.primary", "brand.accent");

  useEffect(() => {
    if (searchText === "") {
      dispatch(setFilterProduct(null));
    }
  }, [searchText, dispatch]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchText.trim()) {
      setIsSearching(true);
      dispatch(setFilterProduct(searchText));
      
      // Simulate search delay for animation
      setTimeout(() => {
        setIsSearching(false);
      }, 1000);
    }
  };

  const clearSearch = () => {
    setSearchText("");
    dispatch(setFilterProduct(null));
  };

  return (
    <MotionBox
      width="100%"
      maxW="600px"
      mx="auto"
      mb={8}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <form onSubmit={handleSearch}>
        <InputGroup
          size="lg"
        >
          <InputLeftElement
            pointerEvents="none"
            children={
              <MotionBox
                animate={isSearching ? "searching" : "idle"}
                variants={{
                  idle: { rotate: 0 },
                  searching: { rotate: 360 },
                }}
                transition={{
                  duration: 1,
                  repeat: isSearching ? Infinity : 0,
                  ease: "linear",
                }}
              >
                <FiSearch color="brand.primary" size="20px" />
              </MotionBox>
            }
          />
          
          <Input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search for your perfect coffee..."
            bg={bgColor}
            border="2px solid"
            borderColor={isFocused ? focusBorderColor : borderColor}
            borderRadius="full"
            fontSize="lg"
            px={6}
            py={6}
            _hover={{
              borderColor: focusBorderColor,
              boxShadow: "0 4px 20px rgba(139, 69, 19, 0.1)",
            }}
            _focus={{
              borderColor: focusBorderColor,
              boxShadow: isFocused ? "0 0 0 3px rgba(139, 69, 19, 0.1)" : "none",
            }}
            transition="all 0.3s ease"
            _placeholder={{
              color: "brand.mocha",
              opacity: 0.7,
            }}
          />
          
          {searchText && (
            <InputRightElement>
              <Button
                size="sm"
                variant="ghost"
                onClick={clearSearch}
                color="brand.mocha"
                _hover={{ transform: "scale(1.1)" }}
                _active={{ transform: "scale(0.9)" }}
                transition="transform 0.2s ease"
              >
                <FiX size="18px" />
              </Button>
            </InputRightElement>
          )}
        </InputGroup>
      </form>
    </MotionBox>
  );
};

export default ModernSearch;
