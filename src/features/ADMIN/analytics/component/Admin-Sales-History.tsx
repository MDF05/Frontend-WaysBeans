import React from "react";
import { Box, Heading, VStack, HStack, Text, Select, useColorModeValue } from "@chakra-ui/react";

export default function AdminSalesHistory(): React.ReactNode {
  const [range, setRange] = React.useState<"daily" | "weekly" | "monthly">("daily");
  const cardBg = useColorModeValue("rgba(255,255,255,0.6)", "rgba(44,24,16,0.5)");
  const borderCol = useColorModeValue("#E6D7C3", "#6F4E37");

  const items = React.useMemo(() => {
    const base = [
      { id: 1, date: "2025-10-09 14:21", product: "Arabica House Blend 250g", qty: 3, amount: 180000, buyer: "user_01" },
      { id: 2, date: "2025-10-09 11:03", product: "Robusta Premium 500g", qty: 1, amount: 120000, buyer: "user_15" },
      { id: 3, date: "2025-10-08 18:40", product: "Decaf Light Roast 250g", qty: 2, amount: 150000, buyer: "user_27" },
      { id: 4, date: "2025-10-08 09:15", product: "Signature Espresso 1kg", qty: 1, amount: 350000, buyer: "user_04" },
      { id: 5, date: "2025-10-07 16:10", product: "Blend Nusantara 250g", qty: 4, amount: 240000, buyer: "user_12" },
    ];
    return base;
  }, [range]);

  return (
    <VStack spacing={6} p={{ base: 4, md: 8 }} align="stretch" h={"100vh"}>
      <HStack justify="space-between">
        <Heading size="lg" color="brand.espresso">Sales History</Heading>
        <HStack>
          <Text color="brand.mocha">Range:</Text>
          <Select size="sm" value={range} onChange={(e) => setRange(e.target.value as any)} bg={cardBg} borderColor={borderCol} maxW="180px">
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </Select>
        </HStack>
      </HStack>

      <Box bg={cardBg} borderRadius="lg" border="1px solid" borderColor={borderCol} p={4} backdropFilter="blur(8px)">
        <VStack align="stretch" spacing={3}>
          {items.map((item) => (
            <HStack key={item.id} justify="space-between" border="1px solid" borderColor={borderCol} borderRadius="md" p={3} bg={useColorModeValue("rgba(255,255,255,0.4)", "rgba(44,24,16,0.4)")}>
              <VStack spacing={0} align="start">
                <Text fontWeight="600" color="brand.espresso">{item.product}</Text>
                <Text fontSize="sm" color="brand.mocha">{item.date}</Text>
              </VStack>
              <HStack>
                <Text color="brand.espresso">Qty: {item.qty}</Text>
                <Text color="brand.mocha">•</Text>
                <Text color="brand.espresso">IDR {item.amount.toLocaleString("id-ID")}</Text>
                <Text color="brand.mocha">•</Text>
                <Text color="brand.mocha">{item.buyer}</Text>
              </HStack>
            </HStack>
          ))}
        </VStack>
      </Box>
    </VStack>
  );
}


