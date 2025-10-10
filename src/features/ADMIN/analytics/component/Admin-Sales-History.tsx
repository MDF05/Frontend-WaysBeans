import React from "react";
import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Select,
  useColorModeValue,
  Spinner,
} from "@chakra-ui/react";
import { adminApi } from "../../../../lib/api-v1";

export default function AdminSalesHistory(): React.ReactNode {
  const [range, setRange] = React.useState<"daily" | "weekly" | "monthly">(
    "daily"
  );
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [items, setItems] = React.useState<
    {
      id: number;
      date: string;
      product: string;
      qty: number;
      amount: number | string;
      buyerProfileId: number;
    }[]
  >([]);
  const cardBg = useColorModeValue(
    "rgba(255,255,255,0.6)",
    "rgba(44,24,16,0.5)"
  );
  const borderCol = useColorModeValue("#E6D7C3", "#6F4E37");

  console.log(items);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await adminApi.getSalesHistory(range, 100);
        const content = res?.content || res;
        if (!mounted) return;
        setItems(content);
      } catch (e) {
        if (!mounted) return;
        setError("Failed to load sales history");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [range]);

  return (
    <VStack spacing={6} p={{ base: 4, md: 8 }} align="stretch" h={"100vh"}>
      <HStack justify="space-between">
        <Heading size="lg" color="brand.espresso">
          Sales History
        </Heading>
        <HStack>
          <Text color="brand.mocha">Range:</Text>
          <Select
            size="sm"
            value={range}
            onChange={(e) => setRange(e.target.value as any)}
            bg={cardBg}
            borderColor={borderCol}
            maxW="180px"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </Select>
        </HStack>
      </HStack>

      <Box
        bg={cardBg}
        borderRadius="lg"
        border="1px solid"
        borderColor={borderCol}
        p={4}
        backdropFilter="blur(8px)"
      >
        {loading && (
          <HStack>
            <Spinner size="sm" />
            <Text color="brand.mocha">Loading…</Text>
          </HStack>
        )}
        {error && <Text color="red.500">{error}</Text>}
        <VStack align="stretch" spacing={3}>
          {items.map((item) => (
            <HStack
              key={item.id}
              justify="space-between"
              border="1px solid"
              borderColor={borderCol}
              borderRadius="md"
              p={3}
              bg={useColorModeValue(
                "rgba(255,255,255,0.4)",
                "rgba(44,24,16,0.4)"
              )}
            >
              <VStack spacing={0} align="start">
                <Text fontWeight="600" color="brand.espresso">
                  {item.product}
                </Text>
                <Text fontSize="sm" color="brand.mocha">
                  {new Date(item.date).toLocaleString()}
                </Text>
              </VStack>
              <HStack>
                <Text color="brand.espresso">Qty: {item.qty}</Text>
                <Text color="brand.mocha">•</Text>
                <Text color="brand.espresso">
                  IDR {Number(item.amount).toLocaleString("id-ID")}
                </Text>
              </HStack>
            </HStack>
          ))}
        </VStack>
      </Box>
    </VStack>
  );
}
