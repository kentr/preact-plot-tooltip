function enhanceMarks(chartEl: SVGSVGElement | null) {
  if (chartEl) {
    const selector = `:scope > g[aria-description="${markOptions.ariaDescription}"]`;
    const markGroup: SVGGElement | null = chartEl.querySelector(selector);

    addTooltips({ markGroup });

    addClickHandlers({
      markNodes: chartEl.querySelectorAll<SVGRectElement>(`${selector} > rect`),
      onClick: handleMarkClick,
    });
  }
}

/**
 * "Click" handler for individual histogram mark (bar).
 *
 * Only for demo. Doesn't do anything substantial.
 *
 * @param ev UI event
 */
 export function handleMarkClick(this: SVGRectElement, ev: MouseEvent | TouchEvent) {

  if (ev.type === "touchstart") {
    ev.preventDefault();
  }

  const id = this.id.split("-")[1];

  console.log(`Bar ${id} clicked`);
}

import addClickHandlers from "./addClickHandlers";
import addTooltips from "../addTooltips";
import { markOptions } from "./index";

export default enhanceMarks
