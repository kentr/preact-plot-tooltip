const formatFixed = format(".2f");
const formatPercent = format(".1%");

export type MarkOptions = Record<string, unknown>;

type Extent = {
  x1: number,
  x2: number,
};

function getChart<Datum, Options = MarkOptions>( data: Datum[], markOptions: Options ): SVGSVGElement {

  const reduceMethod = (
    index: number[],
    _values: typeof data,
    basis = 1,
    extent?: Extent
  ) => {

    const proportion = index.length / basis;

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
  };

  /**
   * Value to be used for `title` output channel.
   */
  const titleOutput = {
    scope: "data",
    reduce: reduceMethod,
  };

  /**
   * All output channels for transform.
   */
  const outputs = {
    y: {
      scope: "data",
      label: "Frequency",
      reduce: (I: number[], V: Datum[], basis?: number) => {
        return I.length / (basis ?? 1)
      },
    },
    title: titleOutput,
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

export default getChart;

import {
  plot,
  binX,
  rectY,
  Rect,
} from "@observablehq/plot";
import { format } from "d3-format";
