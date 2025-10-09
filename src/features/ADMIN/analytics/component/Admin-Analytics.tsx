import React, { useMemo, useState } from "react";
import { Box, Grid, GridItem, Heading, HStack, Select, Stat, StatHelpText, StatLabel, StatNumber, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useColorModeValue, VStack } from "@chakra-ui/react";

type RangeKey = "daily" | "weekly" | "monthly" | "yearly";

interface DataPoint {
  label: string;
  value: number;
}

function BarChart({ data, height = 160, accent = "#8B4513" }: { data: DataPoint[]; height?: number; accent?: string }) {
  const max = Math.max(...data.map(d => d.value), 1);
  const barW = 100 / data.length;
  return (
    <Box as="svg" width="100%" height={height} viewBox={`0 0 100 ${height}`} preserveAspectRatio="none">
      <rect x={0} y={0} width={100} height={height} fill="transparent" />
      {data.map((d, i) => {
        const h = (d.value / max) * (height - 24);
        const x = i * barW + barW * 0.15;
        const w = barW * 0.7;
        const y = height - 18 - h;
        return (
          <g key={d.label}>
            <rect x={x} y={y} width={w} height={h} rx={2} fill={accent} opacity={0.85} />
            <text x={x + w / 2} y={height - 6} textAnchor="middle" fontSize={3.2} fill="#6F4E37">{d.label}</text>
          </g>
        );
      })}
    </Box>
  );
}

export default function AdminAnalytics(): React.ReactNode {
  const [range, setRange] = useState<RangeKey>("daily");
  const cardBg = useColorModeValue("rgba(255,255,255,0.6)", "rgba(44,24,16,0.5)");
  const borderCol = useColorModeValue("#E6D7C3", "#6F4E37");

  const datasets = useMemo(() => {
    return {
      daily: Array.from({ length: 7 }).map((_, i) => ({ label: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i], value: Math.round(30 + Math.random() * 70) })),
      weekly: Array.from({ length: 4 }).map((_, i) => ({ label: `W${i+1}`, value: Math.round(200 + Math.random() * 400) })),
      monthly: Array.from({ length: 12 }).map((_, i) => ({ label: ["J","F","M","A","M","J","J","A","S","O","N","D"][i], value: Math.round(800 + Math.random() * 1200) })),
      yearly: Array.from({ length: 5 }).map((_, i) => ({ label: `${2019 + i}`, value: Math.round(8000 + Math.random() * 6000) })),
    } as Record<RangeKey, DataPoint[]>;
  }, []);

  const active = datasets[range];

  const kpis = useMemo(() => {
    const totalSales = active.reduce((a, b) => a + b.value, 0);
    const orders = Math.round(totalSales / 2.7);
    const avgOrder = orders ? totalSales / orders : 0;
    const growth = Math.round((Math.random() * 20 - 5) * 10) / 10; // -5%..+15%
    return { totalSales, orders, avgOrder, growth };
  }, [active]);

  return (
    <VStack spacing={8} p={{ base: 4, md: 8 }} align="stretch">
      <HStack justify="space-between">
        <Heading size="lg" color="brand.espresso">Analytics & Reports</Heading>
        <HStack>
          <Text color="brand.mocha">Range:</Text>
          <Select size="sm" value={range} onChange={(e) => setRange(e.target.value as RangeKey)} bg={cardBg} borderColor={borderCol} maxW="180px">
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </Select>
        </HStack>
      </HStack>

      <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={4}>
        <GridItem>
          <Box bg={cardBg} borderRadius="lg" border="1px solid" borderColor={borderCol} p={4} backdropFilter="blur(8px)">
            <Stat>
              <StatLabel>Total Sales</StatLabel>
              <StatNumber color="brand.primary">IDR {kpis.totalSales.toLocaleString("id-ID")}</StatNumber>
              <StatHelpText color={kpis.growth >= 0 ? "green.500" : "red.400"}>{kpis.growth}% vs prev range</StatHelpText>
            </Stat>
          </Box>
        </GridItem>
        <GridItem>
          <Box bg={cardBg} borderRadius="lg" border="1px solid" borderColor={borderCol} p={4} backdropFilter="blur(8px)">
            <Stat>
              <StatLabel>Orders</StatLabel>
              <StatNumber color="brand.espresso">{kpis.orders.toLocaleString()}</StatNumber>
              <StatHelpText>Completed</StatHelpText>
            </Stat>
          </Box>
        </GridItem>
        <GridItem>
          <Box bg={cardBg} borderRadius="lg" border="1px solid" borderColor={borderCol} p={4} backdropFilter="blur(8px)">
            <Stat>
              <StatLabel>Avg. Order</StatLabel>
              <StatNumber color="brand.espresso">IDR {Math.round(kpis.avgOrder).toLocaleString("id-ID")}</StatNumber>
              <StatHelpText>Per order</StatHelpText>
            </Stat>
          </Box>
        </GridItem>
        <GridItem>
          <Box bg={cardBg} borderRadius="lg" border="1px solid" borderColor={borderCol} p={4} backdropFilter="blur(8px)">
            <Stat>
              <StatLabel>Return Rate</StatLabel>
              <StatNumber color="brand.espresso">{(Math.random()*3).toFixed(1)}%</StatNumber>
              <StatHelpText>Lower is better</StatHelpText>
            </Stat>
          </Box>
        </GridItem>
      </Grid>

      <Box bg={cardBg} borderRadius="lg" border="1px solid" borderColor={borderCol} p={4} backdropFilter="blur(8px)">
        <Heading size="md" mb={2} color="brand.espresso">Sales Overview</Heading>
        <BarChart data={active} height={160} accent="#8B4513" />
      </Box>

      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
        <Box bg={cardBg} borderRadius="lg" border="1px solid" borderColor={borderCol} p={4} backdropFilter="blur(8px)">
          <Heading size="sm" mb={2} color="brand.espresso">Top Products</Heading>
          <BarChart data={[{label:"A",value:56},{label:"B",value:44},{label:"C",value:38},{label:"D",value:22}]} height={150} accent="#6F4E37" />
        </Box>
        <Box bg={cardBg} borderRadius="lg" border="1px solid" borderColor={borderCol} p={4} backdropFilter="blur(8px)">
          <Heading size="sm" mb={2} color="brand.espresso">Sales by Coffee Category</Heading>
          <BarChart data={[{label:"Arabica",value:72},{label:"Robusta",value:41},{label:"Blend",value:58},{label:"Decaf",value:19}]} height={150} accent="#CD853F" />
        </Box>
      </Grid>
    </VStack>
  );
}


