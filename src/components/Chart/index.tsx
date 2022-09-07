/**
 * @file Component to display a histogram.
 * @alias Chart.tsx
 *
 * @copyright Kent Richards. All rights reserved. All use or
 *  redistribution is prohibited without explicit permission.
 */

export type Datum = {
  Date: Date;
  Open: number;
  High: number;
  Low: number;
  Close: number;
  "Adj Close": number;
  Volume: number;
}

export const markOptions: MarkOptions<Datum> = {
  thresholds: "freedman-diaconis",
  ariaDescription: "Frequency by volume",
  x: (d: Datum): number => Math.log10(d.Volume),
};

/**
 * Displays a histogram.
 */
function Chart() {
  const [ chart, setChart ] = useState<SVGSVGElement | undefined>();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    csv<Datum>(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vS-fpjzlVu3W7PUBJCw7noxW0c5-JLtpDdIQvew-OvybeSyptiFbgPx58fppK5OJfRDkjUjbkkboTqx/pub?output=csv",
      autoType
    ).then((data) => {

      const chart = getChart<Datum, Datum[]>(data, markOptions);
      if (chart) {
        setChart(chart);
      }
    });
  }, []);

  useEffect(() => {
    if (chart instanceof SVGSVGElement && containerRef.current) {

      enhanceMarks(containerRef.current.querySelector(":scope > svg"));
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
        <div
          ref={containerRef}
          dangerouslySetInnerHTML={{ __html: chart.outerHTML }}
        />
      }
    </div>
  );
}

export default Chart;

import { useEffect, useRef, useState } from "preact/hooks";
import { autoType } from "d3-dsv";
import { csv } from "d3-fetch";
import Throbber from "../Throbber";
import
  getChart, {
    type MarkOptions,
  } from "../getChart";
import enhanceMarks from "./enhanceMarks";
import "./style.scss";
