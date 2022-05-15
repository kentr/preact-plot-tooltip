import { useEffect, useState } from "preact/hooks";
import { autoType } from "d3-dsv";
import { csv } from "d3-fetch";
import { format } from "d3-format";
import { type ScaleContinuousNumeric } from "d3-scale";
import {
  select,
  create,
  type Selection,
} from "d3-selection";
import {
  plot,
  binX,
  ruleY,
  type MarkOptions,
  type ConstantOrChannel,
} from "@observablehq/plot";
import {
  identity,
  indexOf,
} from "@observablehq/plot/options";
import { rectY, type Rect } from "../plot/marks/rect";
import { MDCTooltip } from "@material/tooltip";

const formatToFixed = format(".2f");

interface Datum {
  Date: Date;
  Open: number;
  High: number;
  Low: number;
  Close: number;
  "Adj Close": number;
  Volume: number;
}

function Chart() {
  const [ chart, setChart ] = useState<SVGElement | undefined>();

  useEffect(() => {
    csv(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vS-fpjzlVu3W7PUBJCw7noxW0c5-JLtpDdIQvew-OvybeSyptiFbgPx58fppK5OJfRDkjUjbkkboTqx/pub?output=csv",
      autoType
    ).then((data) => {
      setChart(getChart(data as Datum[]));
    });
  }, []);

  useEffect(() => {
    document.querySelectorAll(".bar-tooltip")
      .forEach((el) => {
        const tooltip = new MDCTooltip(el);
        tooltip.setShowDelay(80);
        tooltip.setHideDelay(40);
      });

  }, [ chart ]);

  if (!chart) {
    return null;
  }

  return <div dangerouslySetInnerHTML={{ __html: chart.outerHTML }} />;
}

function getChart(data: Datum[]): SVGElement | undefined {
  return plot({
    x: {
      round: true,
      label: "Trade volume (log₁₀) →",
    },
    y: {
      grid: true,
      percent: true,
    },
    marks: [
      rectY(data, ({
        ...binX(
          {
            y: "proportion",
          },
          {
            x: (d: Datum) => Math.log10(d.Volume),
            thresholds: "freedman-diaconis",
          }
        ),
        markCbFn: (
          selection: Selection<SVGRectElement, Datum, SVGGElement, undefined>,
          mark: Rect,
          _index: number[],
          scales: {
            x: ScaleContinuousNumeric<number, number>,
            y: ScaleContinuousNumeric<number, number>,
          },
          channels: {
            x1: number[],
            x2: number[],
            y1: number[],
            y2: number[],
          }
        ) => {

          const { x1: X1, x2: X2, y1: Y1, y2: Y2 } = channels;
          const { x: xScale, y: yScale } = scales;

          selection.selectChildren<SVGRectElement, Datum>(mark.selector).each(function (_d, i, g) {

            const tooltipId = `tooltip-${i}`;
            select(g[i]).attr("data-tooltip-id", tooltipId);

            const msg = `Vol (log₁₀): ${formatToFixed(xScale.invert(X1[i]))}-${formatToFixed(xScale.invert(X2[i]))}, Freq: ${(yScale.invert(Y2[i]) - yScale.invert(Y1[i])).toFixed(1)}%`;

            select("body")
              .append(() =>
                create("div")
                  .html(
                    `<div class="mdc-tooltip__surface mdc-tooltip__surface-animation tooltip__surface">
                        <div class="mdc-tooltip__content tooltip__content">
                          ${msg}
                        </div>
                      </div>`
                  )
                  .node()
              )
              .attr("id", tooltipId)
              .attr("aria-hidden", true)
              .attr("role", "tooltip")
              .classed("mdc-tooltip bar-tooltip chart-tooltip", true);
          });
        },
      } as unknown) as { x: typeof indexOf, interval: number, y2: typeof identity }),
      ruleY([ 0 ], {}),
    ],
  });
}

export interface RectOptions<Datum> extends MarkOptions<Datum> {
  x1: ConstantOrChannel<number | string, Datum>,
  y1: ConstantOrChannel<number | string, Datum>,
  x2?: ConstantOrChannel<number | string, Datum>,
  y2?: ConstantOrChannel<number | string, Datum>,
  z?: ConstantOrChannel<number | string, Datum>,

  inset?: number,
  insetTop?: number,
  insetRight?: number,
  insetBottom?: number,
  insetLeft?: number,
  rx?: number,
  ry?: number,
  markCbFn?: (arg: unknown) => unknown,
}

export default Chart;
