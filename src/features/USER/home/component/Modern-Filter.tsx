import React, { useState } from "react";
import {
  Box,
  HStack,
  Button,
  Text,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Badge,
} from "@chakra-ui/react";
import {  FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";
import { useAppDispatch } from "../../../../stores/stores";
import {
  setFilterProduct,
  setHighestPrice,
  setLowestPrice,
  setMostStock,
  setNewsProduct,
  setOldestProduct,
  setSmallestStock,
} from "../../../../stores/product/slice-product";

const MotionBox = motion(Box);
const MotionButton = motion(Button);

interface FilterOption {
  value: string;
  label: string;
  action: () => void;
  color: string;
}

const ModernFilter: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("default");
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  const bgColor = useColorModeValue("white", "brand.darkTheme");
  const borderColor = useColorModeValue("brand.cappuccino", "brand.mocha");
  const hoverBg = useColorModeValue("brand.latte", "brand.mocha");

  const filterOptions: FilterOption[] = [
    {
      value: "default",
      label: "All Products",
      action: () => dispatch(setFilterProduct(null)),
      color: "gray",
    },
    {
      value: "newest",
      label: "Newest",
      action: () => dispatch(setNewsProduct()),
      color: "green",
    },
    {
      value: "oldest",
      label: "Oldest",
      action: () => dispatch(setOldestProduct()),
      color: "blue",
    },
    {
      value: "highest-price",
      label: "Highest Price",
      action: () => dispatch(setHighestPrice()),
      color: "purple",
    },
    {
      value: "lowest-price",
      label: "Lowest Price",
      action: () => dispatch(setLowestPrice()),
      color: "orange",
    },
    {
      value: "highest-stock",
      label: "Most Stock",
      action: () => dispatch(setMostStock()),
      color: "teal",
    },
    {
      value: "lowest-stock",
      label: "Least Stock",
      action: () => dispatch(setSmallestStock()),
      color: "red",
    },
  ];

  const handleFilterChange = (option: FilterOption) => {
    setSelectedFilter(option.value);
    option.action();
    setIsOpen(false);
  };

  const currentFilter = filterOptions.find(opt => opt.value === selectedFilter);

  return (
    <MotionBox
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <HStack spacing={4} align="center">
        <Text
          fontSize="lg"
          fontWeight="600"
          color="brand.espresso"
          display={{ base: "none", md: "block" }}
        >
          Filter by:
        </Text>

        {/* Capsule-style Filter Buttons */}
        <HStack spacing={2} flexWrap="wrap">
          {filterOptions.slice(0, 4).map((option) => (
            <MotionButton
              key={option.value}
              size="sm"
              variant={selectedFilter === option.value ? "solid" : "outline"}
              bg={selectedFilter === option.value ? "brand.primary" : "transparent"}
              color={selectedFilter === option.value ? "white" : "brand.espresso"}
              borderColor="brand.primary"
              borderRadius="full"
              px={4}
              py={2}
              fontSize="sm"
              fontWeight="500"
              onClick={() => handleFilterChange(option)}
              whileHover={{ 
                scale: 1.05,
                bg: selectedFilter === option.value ? "brand.espresso" : "brand.latte",
              }}
              whileTap={{ scale: 0.95 }}
              transition="all 0.2s ease"
            >
              {option.label}
            </MotionButton>
          ))}

          {/* More Options Dropdown */}
          <Menu isOpen={isOpen} onOpen={() => setIsOpen(true)} onClose={() => setIsOpen(false)}>
            <MenuButton
              as={MotionButton}
              size="sm"
              variant="outline"
              borderColor="brand.primary"
              color="brand.espresso"
              borderRadius="full"
              px={4}
              py={2}
              fontSize="sm"
              fontWeight="500"
              rightIcon={<FiChevronDown />}
              whileHover={{ scale: 1.05, bg: "brand.latte" }}
              whileTap={{ scale: 0.95 }}
              transition="all 0.2s ease"
            >
              More
            </MenuButton>
            
            <MenuList
              bg={bgColor}
              border="2px solid"
              borderColor={borderColor}
              borderRadius="xl"
              boxShadow="0 8px 32px rgba(139, 69, 19, 0.15)"
              p={2}
              minW="200px"
            >
              {filterOptions.slice(4).map((option) => (
                <MenuItem
                  key={option.value}
                  onClick={() => handleFilterChange(option)}
                  bg="transparent"
                  borderRadius="lg"
                  py={3}
                  px={4}
                  _hover={{ bg: hoverBg }}
                  _focus={{ bg: hoverBg }}
                  transition="all 0.2s ease"
                >
                  <HStack spacing={3} width="100%">
                    <Badge
                      colorScheme={option.color}
                      variant="subtle"
                      borderRadius="full"
                      px={2}
                      py={1}
                    >
                      {option.label}
                    </Badge>
                  </HStack>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </HStack>

        {/* Active Filter Badge */}
        {selectedFilter !== "default" && (
          <MotionBox
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <Badge
              colorScheme={currentFilter?.color}
              variant="solid"
              borderRadius="full"
              px={3}
              py={1}
              fontSize="sm"
              fontWeight="600"
            >
              {currentFilter?.label}
            </Badge>
          </MotionBox>
        )}
      </HStack>
    </MotionBox>
  );
};

export default ModernFilter;
