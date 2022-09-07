/**
 *
 * @param markNodes {NodeList} NodeList of DOM Elements that represent
 *  Plot marks.
 * @param onClick {function} Handler for `mousedown` and `touchstart`
 *  events on members of `markNodes`.
 */
function addClickHandlers({
  markNodes,
  onClick,
}: {
  markNodes: NodeListOf<SVGRectElement>,
  onClick: (ev: MouseEvent | TouchEvent, key?: number) => void,
}): void {

  // @todo Use `button` role with additional event handlers.
  // @see https://www.w3.org/WAI/ARIA/apg/example-index/button/button.html
  markNodes
    .forEach((el) => {
      el.addEventListener("mousedown", onClick);
      el.addEventListener("touchstart", onClick);
    });
}

export default addClickHandlers;
