import { Box } from "@chakra-ui/react";

export interface DataPoint {
  label: string;
  value: number;
}

export function BarChartTopProducts({
  data,
  height = 160,
  accent = "#8B4513",
}: {
  data: DataPoint[];
  height?: number;
  accent?: string;
}) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const barSpacing = 5; // jarak antar bar
  const margin = 5; // margin kiri & kanan
  const availableWidth = 100 - margin * 2; // total area chart setelah margin
  const barW = (availableWidth - barSpacing * (data.length - 1)) / data.length; // lebar tiap bar
  const chartHeight = 40;
  const chartStartY = 40;

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
        const x = margin + i * (barW + barSpacing); // posisi mulai dari kiri + margin
        const y = chartStartY + chartHeight - h;

        return (
          <g key={d.label}>
            {/* Bar */}
            <rect
              x={x}
              y={y}
              width={barW}
              height={h}
              rx={0.5}
              fill={accent}
              opacity={0.85}
            />

            {/* Label bawah */}
            <text
              x={x + barW / 2}
              y={chartStartY + chartHeight + 8}
              textAnchor="middle"
              fontSize={4.5}
              fill="#6F4E37"
              fontWeight="500"
            >
              {d.label}
            </text>

            {/* Value di atas bar */}
            <text
              x={x + barW / 2}
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
