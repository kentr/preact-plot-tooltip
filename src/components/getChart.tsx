const formatFixed = format(".2f");
const formatPercent = format(".1%");

function getChart<Datum, Options>( data: Datum[], markOptions: Options ): SVGSVGElement {

  const reduceMethod: BinReduceMethodWithScope<Datum, MarkProperties["title"], number> = (
    index,
    _values,
    basis = 1,
    extent?
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
      const { x1, x2 }: {
        x1: number;
        x2: number;
      } = extent;
      return `Vol (log₁₀): ${formatFixed( x1 )}-${formatFixed( x2 )}, Freq: ${formatPercent(proportion)}`;
    }
  };

  /**
   * Value to be used for `title` output channel.
   */
  const titleOutput: BinReducerObject<Datum, MarkProperties["title"], number> = {
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

  const optionsTransformed = binX<Options>(outputs, markOptions);

  const mark: Rect<Datum> = rectY<Datum>(data, optionsTransformed);

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
  MarkProperties,
  rectY,
  Rect,
  BinReducerObject,
  BinReduceMethodWithScope,
} from "@observablehq/plot";
import { format } from "d3-format";
