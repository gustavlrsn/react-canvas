import React from "react";
import { storiesOf } from "@storybook/react";
import { Gradient, Text, Group, Image, Surface } from "../index";

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
        >
          <Gradient
            style={{
              top: 0,
              left: 0,
              width: props.size.width,
              height: props.size.height
            }}
            colorStops={[
              { color: "transparent", position: 0 },
              { color: "#000", position: 1 }
            ]}
          />
        </Surface>
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

storiesOf("Text", module).add("hello-world", () => {
  const props = { size: { width: 400, height: 400 } };
  return (
    <div>
      <Surface
        top={0}
        left={0}
        width={props.size.width}
        height={props.size.height}
      >
        <Group>
          <Text
            style={{
              top: 0,
              left: 0,
              width: props.size.width,
              height: props.size.height
            }}
          >
            Hello World
          </Text>
          <Text
            style={{
              top: 30,
              left: 0,
              color: "red",
              width: props.size.width,
              height: props.size.height
            }}
          >
            Hello World 2
          </Text>

          <Image
            style={{
              top: 50,
              left: 0
            }}
            src="https://i.imgur.com/U1p9DSP.png"
          />
        </Group>
      </Surface>
    </div>
  );
});

storiesOf("Image", module).add("hello-world", () => {
  const props = { size: { width: 400, height: 400 } };
  return (
    <div>
      <Surface
        top={0}
        left={0}
        width={props.size.width}
        height={props.size.height}
      >
        <Image
          style={{
            top: 50,
            width: 200,
            height: 200,
            left: 0
          }}
          src="https://i.imgur.com/U1p9DSP.png"
        />
      </Surface>
    </div>
  );
});
