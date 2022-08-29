export type Datum = {
  Date: Date;
  Open: number;
  High: number;
  Low: number;
  Close: number;
  "Adj Close": number;
  Volume: number;
}

const markOptions: BinOptions<RectOptions<Datum>> = {
  thresholds: "freedman-diaconis",
  ariaDescription: "Frequency by volume",
  x: (d: Datum) => Math.log10(d.Volume),
};

function Chart() {
  const [ chart, setChart ] = useState<SVGSVGElement | undefined>();

  useEffect(() => {
    csv(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vS-fpjzlVu3W7PUBJCw7noxW0c5-JLtpDdIQvew-OvybeSyptiFbgPx58fppK5OJfRDkjUjbkkboTqx/pub?output=csv",
      autoType
    ).then((data) => {

      setChart(
        addTooltips(getChart<Datum, RectOptions<Datum>>(data as Datum[], markOptions))
      );
    });
  }, []);

  useEffect(() => {
    if (chart instanceof SVGSVGElement) {
      document.querySelectorAll(".bar-tooltip").forEach((el) => {
        const tooltip = new MDCTooltip(el);
        tooltip.setShowDelay(80);
        tooltip.setHideDelay(40);
        // Add space between target & tooltip;
        tooltip.setAnchorBoundaryType(1);
      });
    }
  }, [ chart ]);

  return (
    <div
      style={{
        height: 400,
        width: 640,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!chart && <Throbber />}
      {chart &&
        // Output from Plot is assumed to be safe.
        <div dangerouslySetInnerHTML={{ __html: chart.outerHTML }} />
      }
    </div>
  );
}

export default Chart;

import { useEffect, useState } from "preact/hooks";
import { autoType } from "d3-dsv";
import { csv } from "d3-fetch";
import {
} from "@observablehq/plot";
import {
  type RectOptions,
} from "@observablehq/plot";
import {
  BinOptions,
} from "@observablehq/plot";
import { MDCTooltip } from "@material/tooltip";
import Throbber from "./Throbber";
import getChart from "./getChart";import addTooltips from "./addTooltips";
