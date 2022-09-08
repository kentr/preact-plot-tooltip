/**
 * @file Function for adding Material tooltips to chart.
 *
 * @copyright Kent Richards. All rights reserved. All use or
 *  redistribution is prohibited without explicit permission.
 */

const tooltipClass = "bar-tooltip";

/**
 * Adds Material tooltips to chart.
 *
 * @param markGroup The element to be modified.
 * @modifies markGroup
 */
function addTooltips({
  markGroup,
}: {
  markGroup: SVGGElement | null,
}): void {

  if (markGroup) {
    // @todo Refactor to vanilla JS?
    const body = select("body");

    select(markGroup)
      .attr("id", "pointer-events")
      .classed("bars", true)
      .selectChildren((el: SVGElement, i) => {
        const title = el.querySelector("title");

        if (title) {
          const mark = select(el);
          // `id` is required for tooltips.
          const markId = mark.attr("id") ?? `bar-${i}`;
          const tooltipId = `tooltip-${markId}`;

          mark
            // Ensure mark `id` attribute is sent.
            .attr("id", markId)
            .attr("aria-describedby", tooltipId);

          body
            .append(() =>
              create("div")
                .html(
                  `<div class="mdc-tooltip__surface mdc-tooltip__surface-animation tooltip__surface mdc-tooltip--shown">
                    <div class="mdc-tooltip__content tooltip__content">
                      ${title.innerHTML.replace(/\n/, "<br />")}
                    </div>
                  </div>`
                )
                .node()
            )
            .attr("id", tooltipId)
            .classed(`mdc-tooltip ${tooltipClass}`, true)
            .attr("role", "tooltip")
            .attr("aria-hidden", true);

          title.remove();
        }

        // Return value is unused, but satisfies TypeScript.
        return true;
      });

      document.querySelectorAll(`.${tooltipClass}`)
        .forEach((el) => {
          const tooltip = new MDCTooltip(el);
          tooltip.setShowDelay(80);
          tooltip.setHideDelay(40);
          // Add space between target & tooltip;
          tooltip.setAnchorBoundaryType(1);
        });
  }
}

import { create, select } from "d3-selection";
import { MDCTooltip } from "@material/tooltip";

export default addTooltips;
