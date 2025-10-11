import { Box } from "@chakra-ui/react";
import { DataPoint } from "./BarChartTopProducts";

export function BarChartBase({
  data,
  height = 160,
  accent = "#8B4513",
}: {
  data: DataPoint[];
  height?: number;
  accent?: string;
}) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const barW = 120 / data.length + 6; // Reserve space for text labels
  const chartHeight = 40; // Reduced to make room for value labels above bars
  const chartStartY = 40; // Start chart lower to make room for value labels

  return (
    <Box
      as="svg"
      width="100%"
      height={height}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
    >
      <rect x={0} y={0} width={100} height={100} fill="transparent" />
      {data.map((d, i) => {
        const h = (d.value / max) * chartHeight;
        const x = i * barW + barW * 0.1;
        const w = barW * 0.8;
        const y = chartStartY + chartHeight - h;
        return (
          <g key={d.label}>
            <rect
              x={x}
              y={y}
              width={w}
              height={h}
              rx={0.5}
              fill={accent}
              opacity={0.85}
            />
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
