import React, { useEffect, useMemo, useState } from "react";
import { Box, Grid, GridItem, Heading, HStack, Select, Stat, StatHelpText, StatLabel, StatNumber,  Text, useColorModeValue, VStack, Spinner } from "@chakra-ui/react";
import { adminApi } from "../../../../lib/api-v1";

type RangeKey = "daily" | "weekly" | "monthly" | "yearly";

interface DataPoint {
  label: string;
  value: number;
} 

function BarChart({ data, height = 160, accent = "#8B4513" }: { data: DataPoint[]; height?: number; accent?: string }) {
  const max = Math.max(...data.map(d => d.value), 1);
  const barW = 100 / data.length;// Reserve space for text labels
  const chartHeight = 100; // Reduced to make room for value labels above bars
  const chartStartY = 10; // Start chart lower to make room for value labels
  
  return (
    <Box as="svg" width="100%" height={height} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
      <rect x={0} y={0} width={100} height={100} fill="transparent" />
      {data.map((d, i) => {
        const h = (d.value / max) * chartHeight;
        const x = i * barW + barW * 0.1;
        const w = barW * 0.8;
        const y = chartStartY + chartHeight - h;
        return (
          <g key={d.label}>
            <rect x={x} y={y} width={w} height={h} rx={0.5} fill={accent} opacity={0.85} />
            <text 
              x={x + w / 2} 
              y={chartStartY + chartHeight + 8} 
              textAnchor="middle" 
              fontSize={4.5} 
              fill="#6F4E37"
              fontWeight="500"
            >
              {d.label}
            </text>
            <text 
              x={x + w / 2} 
              y={y - 2} 
              textAnchor="middle" 
              fontSize={4} 
              fill="#8B4513"
              fontWeight="600"
            >
              {d.value}
            </text>
          </g>
        );
      })}
    </Box>
  );
}

export default function AdminAnalytics(): React.ReactNode {
  const [range, setRange] = useState<RangeKey>("daily");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [serverSeries, setServerSeries] = useState<DataPoint[]>([]);
  const [serverKpis, setServerKpis] = useState<{ totalSales: number; orders: number; avgOrder: number; growth: number }>({ totalSales: 0, orders: 0, avgOrder: 0, growth: 0 });
  const [topProducts, setTopProducts] = useState<{ productId: number; qty: number }[]>([]);
  const cardBg = useColorModeValue("rgba(255,255,255,0.6)", "rgba(44,24,16,0.5)");
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
        setServerKpis(content.kpis || { totalSales: 0, orders: 0, avgOrder: 0, growth: 0 });
        setTopProducts(content.topProducts || []);
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

      {loading && (
        <HStack>
          <Spinner size="sm" />
          <Text color="brand.mocha">Loading analytics…</Text>
        </HStack>
      )}
      {error && <Text color="red.500">{error}</Text>}

      <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={4}>
        <GridItem>
          <Box bg={cardBg} borderRadius="lg" border="1px solid" borderColor={borderCol} p={4} backdropFilter="blur(8px)">
            <Stat>
              <StatLabel>Total Sales</StatLabel>
              <StatNumber color="brand.primary">IDR {kpis.totalSales.toLocaleString("id-ID")}</StatNumber>
              <StatHelpText color={kpis.growth >= 0 ? "green.900" : "red.700"}>{kpis.growth}% vs prev range</StatHelpText>
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


      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
      <Box bg={cardBg} borderRadius="lg" border="1px solid" borderColor={borderCol} p={4} backdropFilter="blur(8px)" >
        <Heading size="md" mb={2} color="brand.espresso">Sales Overview</Heading>
        <BarChart data={serverSeries} height={500}  accent="#8B4513" />
      </Box>
      <Box bg={cardBg} borderRadius="lg" border="1px solid" borderColor={borderCol} p={4} backdropFilter="blur(8px)">
          <Heading size="sm" mb={2} color="brand.espresso">Top Products</Heading>
          <BarChart data={topProducts.map((p, i) => ({ label: `${p.productId}`, value: p.qty }))} height={500} accent="#6F4E37" key={"chart-2"} />
      </Box>
      <Box bg={cardBg} borderRadius="lg" border="1px solid" borderColor={borderCol} p={4} backdropFilter="blur(8px)">
          <Heading size="sm" mb={2} color="brand.espresso">Sales by Coffee Category</Heading>
          <BarChart data={[{label:"Arabica",value:72},{label:"Robusta",value:41},{label:"Blend",value:58},{label:"Decaf",value:19}]} height={400} accent="#CD853F" />
        </Box>
        <Box bg={cardBg} borderRadius="lg" border="1px solid" borderColor={borderCol} p={4} backdropFilter="blur(8px)">
          <Heading size="sm" mb={3} color="brand.espresso">Recent Coffee Powder Sales</Heading>
          {/* simple mocked history list for quick insight */}
          <VStack align="stretch" spacing={3}>
            {[{id:1,date:"2025-10-09",product:"Arabica House Blend",qty:3,buyer:"user_01"},
              {id:2,date:"2025-10-09",product:"Robusta Premium",qty:1,buyer:"user_15"},
              {id:3,date:"2025-10-08",product:"Decaf Light Roast",qty:2,buyer:"user_27"},
              {id:4,date:"2025-10-08",product:"Signature Espresso",qty:5,buyer:"user_04"}].map(item => (
              <HStack key={item.id} justify="space-between" border="1px solid" borderColor={borderCol} borderRadius="md" p={2} bg={useColorModeValue("rgba(255,255,255,0.4)", "rgba(44,24,16,0.4)")}>
                <VStack spacing={0} align="start">
                  <Text fontWeight="600" color="brand.espresso">{item.product}</Text>
                  <Text fontSize="sm" color="brand.mocha">{item.date}</Text>
                </VStack>
                <HStack>
                  <Text color="brand.espresso">Qty: {item.qty}</Text>
                  <Text color="brand.mocha">•</Text>
                  <Text color="brand.mocha">{item.buyer}</Text>
                </HStack>
              </HStack>
            ))}
          </VStack>
        </Box>
      </Grid>
    </VStack>
  );
}


