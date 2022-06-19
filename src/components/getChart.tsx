function getChart<Datum>(data: Datum[]): ReturnType<typeof plot> {
  const mark = rectY<Datum>(data, {});

  const chart = plot({
    x: {
      round: true,
      label: "Trade volume (log₁₀) →",
    },
    y: {
      grid: true,
      percent: true,
    },
    marks: [
      rectWithCallback(mark, markCbFn),
      // ruleY([ 0 ], {}),
    ],
  });
  // return addTooltips();
  return chart;
}

function getTransform() {
  return binX<Datum>(
    {
      y: "proportion",
      title: {
        scope: "data",
        label: "Frequency",
        reduce: (I, V, basis = 1, { x1, x2 } = {}) => {
          const proportion = I.length / basis;
          if (!(x1 == null && x2 == null)) {
            const msg = `Vol (log₁₀): ${formatFixed(x1)}-${formatFixed(x2)}, Freq: ${formatPercent(proportion)}`;
            // console.log("[reduce] proportion:", basis, x1, x2 , msg);
            return msg;
          }
          else {
            // console.log("first pass");
            return proportion;
          }
        },
      },
    },
    {
      thresholds: "freedman-diaconis",
      ariaDescription: "Frequency by volume",
      // x: (d: Datum) => Math.log10(d.Volume),
    } as RectOptions<Datum>
  ),
    ;
}

export default getChart;

import { RectOptions } from "@observablehq/plot";
import {
  plot,
  binX
} from "@observablehq/plot";
import { rectY } from "@observablehq/plot";
import rectWithCallback from "./rectWithCallback";
import { markCbFn, Datum, formatFixed } from "./Chart";
