import React from "react";
import { storiesOf } from "@storybook/react";
import ReactCanvas from "../src/index";
const { Gradient, Surface } = ReactCanvas;

storiesOf("Gradient", module)
  .add("transparent-grey", () => {
    const props = { size: { width: 80, height: 80 } };
    return (
      <div>
        <Surface
          top={0}
          left={0}
          width={props.size.width}
          height={props.size.height}
        />
      </div>
    );
  })
  .add("blue-green", () => {
    const props = { size: { width: 80, height: 80 } };
    return (
      <div>
        <Surface
          top={0}
          left={0}
          width={props.size.width}
          height={props.size.height}
        >
          <Gradient
            style={{
              top: 0,
              left: 0,
              width: props.size.width,
              height: props.size.height
            }}
            colorStops={[
              { color: "#00FF00", position: 0 },
              { color: "#0000FF", position: 1 }
            ]}
          />
        </Surface>
      </div>
    );
  });
