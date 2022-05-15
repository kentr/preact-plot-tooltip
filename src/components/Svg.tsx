import { h } from "preact";
import { useEffect } from "preact/hooks";
import { MDCTooltip } from "@material/tooltip";

function Svg() {
  useEffect(() => {
    const el = document.getElementById("barTooltip-7");
    el && console.log(new MDCTooltip(el));
  });

  return (
    <svg
      class="plot-e178d25f4d08c"
      fill="currentColor"
      font-family="system-ui, sans-serif"
      font-size="10"
      text-anchor="middle"
      width="640"
      height="400"
      viewBox="0 0 640 400"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{
        overflow: "visible",
      }}
    >
      {/* <foreignObject style={{ height: "100%", width: "100%", border: "1px blue solid" }}>
              <div>
                foreign object
              </div>
            </foreignObject> */}
      <g
        aria-label="y-axis"
        aria-description="↑ Net generation (million MWh)"
        transform="translate(40,0)"
        fill="none"
        text-anchor="end"
        font-variant="tabular-nums"
      >
        <g class="tick" opacity="1" transform="translate(0,370)">
          <line stroke="currentColor" x2="-6" />
          <line stroke="currentColor" x2="580" stroke-opacity="0.1" />
          <text fill="currentColor" x="-9" dy="0.32em">
            0
          </text>
        </g>
        <g class="tick" opacity="1" transform="translate(0,328.8510111270628)">
          <line stroke="currentColor" x2="-6" />
          <line stroke="currentColor" x2="580" stroke-opacity="0.1" />
          <text fill="currentColor" x="-9" dy="0.32em">
            5
          </text>
        </g>
        <g class="tick" opacity="1" transform="translate(0,287.70202225412555)">
          <line stroke="currentColor" x2="-6" />
          <line stroke="currentColor" x2="580" stroke-opacity="0.1" />
          <text fill="currentColor" x="-9" dy="0.32em">
            10
          </text>
        </g>
        <g class="tick" opacity="1" transform="translate(0,246.55303338118838)">
          <line stroke="currentColor" x2="-6" />
          <line stroke="currentColor" x2="580" stroke-opacity="0.1" />
          <text fill="currentColor" x="-9" dy="0.32em">
            15
          </text>
        </g>
        <g class="tick" opacity="1" transform="translate(0,205.4040445082512)">
          <line stroke="currentColor" x2="-6" />
          <line stroke="currentColor" x2="580" stroke-opacity="0.1" />
          <text fill="currentColor" x="-9" dy="0.32em">
            20
          </text>
        </g>
        <g class="tick" opacity="1" transform="translate(0,164.25505563531402)">
          <line stroke="currentColor" x2="-6" />
          <line stroke="currentColor" x2="580" stroke-opacity="0.1" />
          <text fill="currentColor" x="-9" dy="0.32em">
            25
          </text>
        </g>
        <g class="tick" opacity="1" transform="translate(0,123.1060667623768)">
          <line stroke="currentColor" x2="-6" />
          <line stroke="currentColor" x2="580" stroke-opacity="0.1" />
          <text fill="currentColor" x="-9" dy="0.32em">
            30
          </text>
        </g>
        <g class="tick" opacity="1" transform="translate(0,81.95707788943957)">
          <line stroke="currentColor" x2="-6" />
          <line stroke="currentColor" x2="580" stroke-opacity="0.1" />
          <text fill="currentColor" x="-9" dy="0.32em">
            35
          </text>
        </g>
        <g class="tick" opacity="1" transform="translate(0,40.80808901650241)">
          <line stroke="currentColor" x2="-6" />
          <line stroke="currentColor" x2="580" stroke-opacity="0.1" />
          <text fill="currentColor" x="-9" dy="0.32em">
            40
          </text>
        </g>
        <text
          fill="currentColor"
          transform="translate(-40,20)"
          dy="-1em"
          text-anchor="start"
        >
          ↑ Net generation (million MWh)
        </text>
      </g>
      <g
        aria-label="x-axis"
        // aria-description="year"
        transform="translate(0,370)"
        fill="none"
        text-anchor="middle"
      >
        <g class="tick" opacity="1" transform="translate(330,0)">
          <line stroke="currentColor" y2="6" />
          <text fill="currentColor" y="9" dy="0.71em">
            2002-01-01
          </text>
        </g>
        <text
          fill="currentColor"
          transform="translate(330,30)"
          dy="-0.32em"
          text-anchor="middle"
        >
          year
        </text>
      </g>
      <g aria-label="rule" stroke="currentColor">
        <line x1="40" x2="620" y1="370" y2="370" />
      </g>
      <g class="mdc-tooltip-wrapper--rich">
        <rect
          data-tooltip-id="barTooltip-7"
          x="93"
          width="474"
          y="20.00192577267919"
          height="291.10488421097784"
          fill="yellow"
          stroke="currentColor" />
        {/* <foreignObject
              data-tooltip-id="barTooltip-8"

              x="93"
              width="474"
              y="20.00192577267919"
              height="291.10488421097784"

              style={{
                // height:
                // "100%",
                // width: "100%",
                border: "1px red dashed",
                overflow: "visible",
              }}

              class="mdc-tooltip-wrapper--rich"
            >
              <div
                id="barTooltip-8"
                class="mdc-tooltip mdc-tooltip--rich"
                // class="mdc-tooltip mdc-tooltip--rich mdc-tooltip--shown"
                aria-hidden="true"
                tabIndex={-1}
                data-mdc-tooltip-persistent="true"
                role="dialog"
              >
                <div class="mdc-tooltip__surface mdc-tooltip__surface-animation">
                  <h2 class="mdc-tooltip__title"> Lorem Ipsum </h2>
                  <p class="mdc-tooltip__content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Curabitur pretium vitae est et dapibus. Aenean sit amet felis eu
                    lorem fermentum aliquam sit amet sit amet eros.

                  </p>
                </div>
              </div>
            </foreignObject> */}
      </g>
    </svg>
  );
}

export default Svg;
