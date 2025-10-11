import { Box } from "@chakra-ui/react";

export interface DataPoint {
  label: string;
  value: number;
}

// Define constant coordinate system values
const BAR_WIDTH = 12; // Slightly wider bars for Top Products (fewer items)
const BAR_GAP = 50; // Ditingkatkan dari 6 menjadi 10 untuk menambah jarak
const TOTAL_BAR_UNIT = BAR_WIDTH + BAR_GAP; // 22 units per bar/gap set (sebelumnya 18)
const PADDING_X = 5; // Left and right padding for the chart content
const CHART_TOP = 15; // Y-coordinate for the top of the bar area (space for value labels)
const CHART_BOTTOM = 80; // Y-coordinate for the bottom of the bar area (space for category labels)
const CHART_HEIGHT = CHART_BOTTOM - CHART_TOP; // 65 units for bar height

export function BarChartTopProducts({
  data,
  height = 160,
  accent = "#8B4513",
}: {
  data: DataPoint[];
  height?: number;
  accent?: string;
}) {
  // Find the maximum value to scale bar heights, ensuring it's at least 1 to avoid division by zero
  const max = Math.max(...data.map((d) => d.value), 1);
  const dataCount = data.length || 1;

  // Calculate the total width needed for the viewBox based on the number of data points
  // PADDING_X * 2 ditambahkan di sini untuk memastikan ada padding di kanan juga,
  // dan mencegah bar terakhir terlalu mepet ke tepi.
  const VIEW_BOX_WIDTH = dataCount * TOTAL_BAR_UNIT + PADDING_X * 2;
  const VIEW_BOX_HEIGHT = 100;

  return (
    <Box
      as="svg"
      width="100%"
      height={height}
      // Dynamic viewBox ensures the chart scales to fit all data points
      viewBox={`10 0 ${VIEW_BOX_WIDTH} ${VIEW_BOX_HEIGHT}`}
      preserveAspectRatio="xMinYMid meet"
    >
      {/* Map data points to bars */}
      {data.map((d, i) => {
        const barH = (d.value / max) * CHART_HEIGHT;
        // PADDING_X ditambahkan agar bar pertama tidak menempel di kiri
        const barX = PADDING_X + i * TOTAL_BAR_UNIT;
        // Bars grow upward from the bottom of the chart area
        const barY = CHART_BOTTOM - barH;

        return (
          <g key={d.label}>
            {/* Bar Rectangle */}
            <rect
              x={barX}
              y={barY}
              width={BAR_WIDTH}
              height={barH}
              rx={1}
              fill={accent}
              opacity={0.85}
            />
            {/* Value Label (on top of the bar) */}
            <text
              x={barX + BAR_WIDTH / 2}
              y={barY - 3} // Position 3 units above the bar top
              textAnchor="middle"
              fontSize={7}
              fill={accent}
              fontWeight="600"
            >
              {d.value.toLocaleString()}
            </text>
            {/* Product Name Label (below the bar) */}
            <text
              x={barX + BAR_WIDTH / 2}
              y={CHART_BOTTOM + 8} // Position 8 units below the chart bottom
              textAnchor="middle"
              fontSize={5} // Dikecilkan dari 6 menjadi 5 untuk memberi ruang lebih
              fill="#6F4E37"
              fontWeight="500"
            >
              {/* Truncate long labels to fit better on small screens */}
              {d.label.length > 15 ? d.label.substring(0, 13) + "..." : d.label}
            </text>
          </g>
        );
      })}
    </Box>
  );
}
