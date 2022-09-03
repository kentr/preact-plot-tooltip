const {
  plot,
  binX,
  rectY,
  Rect,
} = Plot;

const formatFixed = format(".2f");
const formatPercent: (v: number) => string = format(".1%");

export type MarkOptions = Record<string, unknown>;

type Extent = {
  x1: number,
  x2: number,
};

function getChart<Datum, Data = Datum[], Options = MarkOptions>( data: Data, markOptions: Options ): SVGSVGElement {

  /**
   * All output channels for transform.
   */
  const outputs = {
    y: {
      scope: "data",
      label: "Frequency",
      reduce: binYReducer,
    },
    title: {
      scope: "data",
      reduce: binTitleReducer,
    },
  };

  const optionsTransformed: MarkOptions = binX(outputs, markOptions);

  const mark: typeof Rect = rectY(data, optionsTransformed);

  const chart = plot({
    class: "plot",
    style: {
      background: "transparent",
    },
    x: {
      round: true,
    },
    y: {
      grid: true,
    },
    marks: [ mark ],
  });

  return chart;
}

function binTitleReducer<Data>(
  index: number[],
  _values: Data,
  basis = 1,
  extent?: Extent
): number | string {

  const proportion = binYReducer<Data>(index, _values, basis);

  // First pass, on data specified by `scope` property.
  // This value is subsequently passed to each call on bins in the
  // `basis` param.
  if (extent == null) {
    return proportion;
  }
  // Subsequent passes on each bin.
  else {
    const { x1, x2 }: Extent = extent;
    return `Vol (log₁₀): ${formatFixed( x1 )}-${formatFixed( x2 )}, Freq: ${formatPercent(proportion)}`;
  }
}

function binYReducer<Data>(index: number[], _values: Data, basis = 1) {
  return index.length / (basis ?? 1)
}

export default getChart;

import * as Plot from "@observablehq/plot";
import { format } from "d3-format";
