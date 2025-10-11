import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  GridItem,
  Heading,
  HStack,
  Select,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  useColorModeValue,
  VStack,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import { adminApi } from "../../../../lib/api-v1";
import { BarChartTopProducts, DataPoint } from "./BarChartTopProducts";
import { BarChartBase } from "./BarChartBase";
import { BarChartWeekly } from "./BarChartWeekly";
import { BarChartHourly } from "./BarChartBaseHourly";

type RangeKey = "daily" | "weekly" | "monthly" | "yearly";

export default function AdminAnalytics(): React.ReactNode {
  const [range, setRange] = useState<RangeKey>("daily");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [serverSeries, setServerSeries] = useState<DataPoint[]>([]);
  const [serverKpis, setServerKpis] = useState<{
    totalSales: number;
    orders: number;
    avgOrder: number;
    growth: number;
  }>({ totalSales: 0, orders: 0, avgOrder: 0, growth: 0 });
  const [topProducts, setTopProducts] = useState<
    { name: string; qty: number }[]
  >([]);
  const [hourly, setHourly] = useState<DataPoint[]>([]);
  const [weekday, setWeekday] = useState<DataPoint[]>([]);
  const [weekly8, setWeekly8] = useState<DataPoint[]>([]);
  const cardBg = useColorModeValue(
    "rgba(255,255,255,0.6)",
    "rgba(44,24,16,0.5)"
  );
  const borderCol = useColorModeValue("#E6D7C3", "#6F4E37");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await adminApi.getAnalytics(range);
        const content = res?.content || res; // support successResponse wrapper
        if (!mounted) return;
        setServerSeries((content.series || []) as DataPoint[]);
        setServerKpis(
          content.kpis || { totalSales: 0, orders: 0, avgOrder: 0, growth: 0 }
        );
        setTopProducts(content.topProducts || []);
        setHourly((content.hourly || []) as DataPoint[]);
        setWeekday((content.weekday || []) as DataPoint[]);
        setWeekly8((content.weekly8 || []) as DataPoint[]);
      } catch (e) {
        if (!mounted) return;
        setError("Failed to load analytics");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [range]);

  const kpis = serverKpis;

  return (
    <VStack spacing={6} p={{ base: 4, md: 6 }} align="stretch">
      <HStack justify="space-between">
        <Heading size="lg" color="brand.espresso">
          Analytics & Reports
        </Heading>
        <HStack>
          <Text color="brand.mocha">Range:</Text>
          <Select
            size="sm"
            value={range}
            onChange={(e) => setRange(e.target.value as RangeKey)}
            bg={cardBg}
            borderColor={borderCol}
            maxW="180px"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </Select>
        </HStack>
      </HStack>

      {loading && (
        <HStack>
          <Spinner size="sm" />
          <Text color="brand.mocha">Loading analytics…</Text>
        </HStack>
      )}
      {error && <Text color="red.500">{error}</Text>}

      <Grid
        templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }}
        gap={4}
        width={"100%"}
      >
        <GridItem>
          <Box
            bg={cardBg}
            borderRadius="lg"
            border="1px solid"
            borderColor={borderCol}
            p={4}
            backdropFilter="blur(8px)"
          >
            <Stat>
              <StatLabel>Total Sales</StatLabel>
              <StatNumber color="brand.primary">
                IDR {kpis.totalSales.toLocaleString("id-ID")}
              </StatNumber>
              <StatHelpText color={kpis.growth >= 0 ? "green.900" : "red.700"}>
                {kpis.growth}% vs prev range
              </StatHelpText>
            </Stat>
          </Box>
        </GridItem>
        <GridItem>
          <Box
            bg={cardBg}
            borderRadius="lg"
            border="1px solid"
            borderColor={borderCol}
            p={4}
            backdropFilter="blur(8px)"
          >
            <Stat>
              <StatLabel>Orders</StatLabel>
              <StatNumber color="brand.espresso">
                {kpis.orders.toLocaleString()}
              </StatNumber>
              <StatHelpText>Completed</StatHelpText>
            </Stat>
          </Box>
        </GridItem>
        <GridItem>
          <Box
            bg={cardBg}
            borderRadius="lg"
            border="1px solid"
            borderColor={borderCol}
            p={4}
            backdropFilter="blur(8px)"
          >
            <Stat>
              <StatLabel>Avg. Order</StatLabel>
              <StatNumber color="brand.espresso">
                IDR {Math.round(kpis.avgOrder).toLocaleString("id-ID")}
              </StatNumber>
              <StatHelpText>Per order</StatHelpText>
            </Stat>
          </Box>
        </GridItem>
        <GridItem>
          <Box
            bg={cardBg}
            borderRadius="lg"
            border="1px solid"
            borderColor={borderCol}
            p={4}
            backdropFilter="blur(8px)"
          >
            <Stat>
              <StatLabel>Return Rate</StatLabel>
              <StatNumber color="brand.espresso">{(0).toFixed(1)}%</StatNumber>
              <StatHelpText>Lower is better</StatHelpText>
            </Stat>
          </Box>
        </GridItem>
      </Grid>

      <Flex
        flexDirection={"column"}
        width={"96.5vw"}
        gap={"20px"}
        boxSizing="border-box"
      >
        <Box
          bg={cardBg}
          borderRadius="lg"
          border="1px solid"
          borderColor={borderCol}
          p={4}
          backdropFilter="blur(8px)"
        >
          <Heading size="sm" mb={2} color="brand.espresso">
            Top Products
          </Heading>
          <BarChartTopProducts
            data={topProducts.map((p) => ({ label: p.name, value: p.qty }))}
            height={300}
            accent="#6F4E37"
            key={"chart-2"}
          />
        </Box>
        <Box
          bg={cardBg}
          borderRadius="lg"
          border="1px solid"
          borderColor={borderCol}
          p={4}
          backdropFilter="blur(8px)"
          overflowX="hidden"
          overflowY="hidden"
          maxWidth="100%"
        >
          <Heading size="md" mb={2} color="brand.espresso">
            Sales Overview
          </Heading>
          <Box minWidth="1200px" width="max-content">
            <BarChartBase data={serverSeries} height={320} accent="#8B4513" />
          </Box>
        </Box>

        <Box
          bg={cardBg}
          borderRadius="lg"
          border="1px solid"
          borderColor={borderCol}
          p={4}
          backdropFilter="blur(8px)"
          overflowX="auto"
          overflowY="hidden"
          maxWidth="100%"
        >
          <Heading size="sm" mb={2} color="brand.espresso">
            Hourly Sales
          </Heading>
          <Box minWidth="1200px" width="max-content">
            <BarChartHourly data={hourly} height={320} accent="#7B3F00" />
          </Box>
        </Box>
      </Flex>

      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
        <Box
          bg={cardBg}
          borderRadius="lg"
          border="1px solid"
          borderColor={borderCol}
          p={4}
          backdropFilter="blur(8px)"
        >
          <Heading size="sm" mb={2} color="brand.espresso">
            Weekday Sales
          </Heading>
          <BarChartWeekly data={weekday} height={220} accent="#A0522D" />
        </Box>
        <Box
          bg={cardBg}
          borderRadius="lg"
          border="1px solid"
          borderColor={borderCol}
          p={4}
          backdropFilter="blur(8px)"
        >
          <Heading size="sm" mb={2} color="brand.espresso">
            Last 8 Weeks
          </Heading>
          <BarChartWeekly data={weekly8} height={220} accent="#B5651D" />
        </Box>
      </Grid>
    </VStack>
  );
}
