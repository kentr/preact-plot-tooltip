/**
 * @file Function for adding Material tooltips to chart.
 *
 * @copyright Kent Richards. All rights reserved. All use or
 *  redistribution is prohibited without explicit permission.
 */

/**
 * Adds Material tooltips to chart.
 *
 * @param svg The element to be modified.
 * @modifies svg
 * @returns The modified (mutated) SVG element.
 */
function addTooltips(svg: SVGSVGElement, groupSelector: string): SVGSVGElement {

  const group: SVGGElement | null = svg.querySelector(
    `:scope ${groupSelector}`
  );

  if (group) {
    const body = select("body");

    select(group)
      .attr("id", "mouse-events")
      .classed("bars", true)
      .selectChildren(function (mark: SVGElement, i) {
        const title = mark.querySelector("title");

        if (title) {
          const _mark = select(mark);
          // let markId;
          // if (mark.attr("id")) {

          // }
          // `id` is required for tooltips.
          const markId = _mark.attr("id") ?? `bar-${i}`;
          const tooltipId = `tooltip-${markId}`;

          _mark
            // Ensure mark `id` attribute is sent.
            .attr("id", markId)
            .attr("aria-describedby", tooltipId);

          body
          .append(
            () =>
              create("div")
                .html(
                  `<div class="mdc-tooltip__surface mdc-tooltip__surface-animation tooltip__surface">
                    <div class="mdc-tooltip__content tooltip__content">
                      ${title.innerHTML.replace(/\n/, "<br />")}
                    </div>
                  </div>`
                )
                .node()
          )
            .attr("id", tooltipId)
            .classed("mdc-tooltip bar-tooltip", true)
            .attr("role", "tooltip")
            .attr("aria-hidden", true)

          title.remove();
        }

        // Return value is unused, but satisfies TypeScript.
        return true;
      });
  }

  return svg;
}

export default addTooltips;

import { create, select } from "d3-selection";
