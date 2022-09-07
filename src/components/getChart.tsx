const {
  plot,
  binX,
  map,
  rectY,
  Rect,
} = Plot;

const formatFixed = format(".2f");
const formatPercent: (v: number) => string = format(".1%");

function getChart<Datum, Data = Datum[]>( data: Data, markOptions: MarkOptions<Datum> ): SVGSVGElement {

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

  const optionsBinned: MarkOptions<Datum> = binX(outputs, markOptions);

  /**
   * Mark that displays visual bars.
   */
  const markData: typeof Rect = rectY(data,
    // Remove `ariaDescription` from mark options.
    // It will be kept on the mouse events overlay so that
    // tooltips will be added to _that_ mark instead.
    (
      ({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ariaDescription,
        ...keep
      }) => keep
    )(optionsBinned)
  );

  /**
   * Transparent bar overlay for mouse events.
   */
  const markHover: typeof Rect = rectY(data, {
    ...map(
      {
        y: {
          map: (index: number[], binnedVals: Y[], mappedVals: Y[]): void => {
            binnedVals.forEach((_, i) => {
                mappedVals[i] = mappedVals[0] ?? Math.max(...binnedVals);
            });
          },
        },
      },
      optionsBinned
    ),
    fill: "transparent",
  });

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
    marks: [
      markData,
      markHover,
    ],
  });

  return chart;
}

/**
 * Reducer for `title` values on bins.
 *
 * @param index Array of integers, with each element being an index
 *  value into the data array.
 * @param values Array of data values.
 * @param basis
 * @param extent
 */
function binTitleReducer<Data>(
  index: number[],
  values: Data,
  basis = 1,
  extent?: BinExtentX<X>
): number | string {

  const proportion = binYReducer<Data>(index, values, basis);

  // First pass, on data specified by `scope` property.
  // This value is subsequently passed to each call on bins in the
  // `basis` param.
  if (extent == null) {
    return proportion;
  }
  // Subsequent passes on each bin.
  else {
    const { x1, x2 }: BinExtentX<X> = extent;
    return `Vol (log₁₀): ${formatFixed( x1 )}-${formatFixed( x2 )}
    Freq: ${formatPercent(proportion)}`;
  }
}

/**
 * Reducer for `title` values on bins.
 *
 * @param index Array of integers, with each element being an index
 *  value into the data array.
 * @param _values Array of data values.
 * @param basis
 * @returns
 */
function binYReducer<Data>(index: number[], _values: Data, basis = 1) {
  return index.length / (basis ?? 1)
}

import * as Plot from "@observablehq/plot";
import { format } from "d3-format";

export type MarkOptions<Datum> = {
  ariaDescription: string,
  thresholds: string | number,
  x: (d: Datum) => number,
};

type X = number;
type Y = number;

type BinExtentX<T = number> = {
  x1: T,
  x2: T,
};

export default getChart;
