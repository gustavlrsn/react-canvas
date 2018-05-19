"use strict";

import React from "react";
import CanvasComponent from "./CanvasComponentDecorator";

@CanvasComponent
class Gradient extends React.Component {
  applyLayerProps = (prevProps, props) => {
    const layer = this.node;
    layer.type = "gradient";
    layer.colorStops = props.colorStops || [];
    this.applyCommonLayerProps(prevProps, props);
    this.node.invalidateLayout();
  };
}

export default Gradient;
