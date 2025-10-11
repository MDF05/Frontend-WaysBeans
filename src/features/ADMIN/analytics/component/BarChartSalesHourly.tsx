import { Box } from "@chakra-ui/react";
import { DataPoint } from "./BarChartTopProducts";

// Define constant coordinate system values
const PADDING_X = 5; // Left and right padding for the chart content
const CHART_TOP = 15; // Y-coordinate for the top of the bar area (space for value labels)
const CHART_BOTTOM = 80; // Y-coordinate for the bottom of the bar area (space for category labels)
const CHART_HEIGHT = CHART_BOTTOM - CHART_TOP; // 65 units for bar height

// Nilai tetap untuk mode scroll (misalnya, total 24 jam)
const SCROLL_WIDTH_UNIT = 500;

export function BarChartSalesHourly({
  data,
  height = 160,
  accent = "#8B4513",
  isScrollable = false, // Properti baru untuk mengaktifkan mode scroll
}: {
  data: DataPoint[];
  height?: number;
  accent?: string;
  isScrollable?: boolean;
}) {
  // Find the maximum value to scale bar heights, ensuring it's at least 1 to avoid division by zero
  const max = Math.max(...data.map((d) => d.value), 1);
  const dataCount = data.length || 1;

  // --- LOGIKA PENYESUAIAN LEBAR BAR BERDASARKAN MODE ---
  let BAR_WIDTH, BAR_GAP, TOTAL_BAR_UNIT, VIEW_BOX_WIDTH;

  if (isScrollable) {
    // Mode Scroll (Untuk 24 jam)
    // Kita paksakan total lebar SVG menjadi SCROLL_WIDTH_UNIT (misalnya 500)
    VIEW_BOX_WIDTH = SCROLL_WIDTH_UNIT;

    // Alokasikan ruang per bar agar pas dengan lebar tetap (500 unit)
    TOTAL_BAR_UNIT = (VIEW_BOX_WIDTH - PADDING_X * 2) / dataCount;
    BAR_GAP = TOTAL_BAR_UNIT * 0.2; // 20% gap
    BAR_WIDTH = TOTAL_BAR_UNIT - BAR_GAP;
  } else {
    // Mode Default (Responsive, lebar view box menyesuaikan data count)
    // Menggunakan BAR_WIDTH dan BAR_GAP default yang sudah diset sebelumnya
    BAR_WIDTH = 10;
    BAR_GAP = 5;
    TOTAL_BAR_UNIT = BAR_WIDTH + BAR_GAP; // 15 units per bar/gap set
    VIEW_BOX_WIDTH = dataCount * TOTAL_BAR_UNIT + PADDING_X * 2;
  }
  // --------------------------------------------------------

  const VIEW_BOX_HEIGHT = 100;

  return (
    <Box
      // Jika isScrollable true, kita bungkus SVG di dalam Box dengan overflow-x: scroll
      {...(isScrollable && { overflowX: "scroll", maxW: "100%" })}
    >
      <Box
        as="svg"
        // Jika isScrollable true, atur lebar SVG minimal sesuai VIEW_BOX_WIDTH
        // Jika tidak, biarkan width: 100% (responsive)
        width={isScrollable ? `${VIEW_BOX_WIDTH}px` : "100%"}
        height={height}
        viewBox={`0 0 ${VIEW_BOX_WIDTH} ${VIEW_BOX_HEIGHT}`}
        preserveAspectRatio={isScrollable ? "none" : "xMinYMid meet"} // Jangan preserve aspect ratio jika scrollable
        minWidth={isScrollable ? `${VIEW_BOX_WIDTH}px` : "auto"} // Pastikan SVG cukup lebar
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
                fontSize={isScrollable ? 8 : 7} // Sedikit lebih besar untuk tampilan scroll
                fill={accent}
                fontWeight="600"
              >
                {d.value.toLocaleString("id-ID")}
              </text>
              {/* Category Label (below the bar) */}
              <text
                x={barX + BAR_WIDTH / 2}
                y={CHART_BOTTOM + 8} // Position 8 units below the chart bottom
                textAnchor="middle"
                fontSize={isScrollable ? 8 : 7} // Sedikit lebih besar untuk tampilan scroll
                fill="#6F4E37"
                fontWeight="500"
              >
                {d.label}
              </text>
            </g>
          );
        })}
      </Box>
    </Box>
  );
}
