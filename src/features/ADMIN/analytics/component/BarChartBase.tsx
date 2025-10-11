import { Box } from "@chakra-ui/react";
import { DataPoint } from "./BarChartTopProducts"; // DataPoint is imported from here

// Define constant coordinate system values
const BAR_WIDTH = 10;
const BAR_GAP = 5;
const TOTAL_BAR_UNIT = BAR_WIDTH + BAR_GAP; // 15 units per bar/gap set
const PADDING_X = 5; // Left and right padding for the chart content
const CHART_TOP = 15; // Y-coordinate for the top of the bar area (space for value labels)
const CHART_BOTTOM = 80; // Y-coordinate for the bottom of the bar area (space for category labels)
const CHART_HEIGHT = CHART_BOTTOM - CHART_TOP; // 65 units for bar height

export function BarChartBase({
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
  const VIEW_BOX_WIDTH = dataCount * TOTAL_BAR_UNIT + PADDING_X;
  const VIEW_BOX_HEIGHT = 100;

  return (
    <Box
      as="svg"
      width="100%"
      height={height}
      // Dynamic viewBox ensures the chart scales to fit all data points
      viewBox={`0 0 ${VIEW_BOX_WIDTH} ${VIEW_BOX_HEIGHT}`}
      preserveAspectRatio="xMinYMid meet"
    >
      {/* Map data points to bars */}
      {data.map((d, i) => {
        const barH = (d.value / max) * CHART_HEIGHT;
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
            {/* Category Label (below the bar) */}
            <text
              x={barX + BAR_WIDTH / 2}
              y={CHART_BOTTOM + 8} // Position 8 units below the chart bottom
              textAnchor="middle"
              fontSize={7}
              fill="#6F4E37"
              fontWeight="500"
            >
              {d.label}
            </text>
          </g>
        );
      })}
    </Box>
  );
}
