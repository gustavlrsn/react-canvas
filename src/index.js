import Surface from "./Surface";
import Core from "./Core";
import Image from "./Image";
import ListView from "./ListView";
import FontFace from "./FontFace";
import FrameUtils from "./FrameUtils";
import measureText from "./measureText";
import CanvasComponent from "./CanvasComponent";
import CanvasRenderer from "./CanvasRenderer";
import { registerLayerType } from "./DrawingUtils";

Surface.canvasRenderer = CanvasRenderer;

const registerCustomComponent = function(name, applyProps, drawFunction) {
  const layerType = name.toLowerCase();

  registerLayerType(layerType, drawFunction);

  const klass = class extends CanvasComponent {
    displayName = name;

    applyLayerProps = (prevProps, props) => {
      const style = props && props.style ? props.style : {};
      const layer = this.node;
      layer.type = layerType;
      applyProps(layer, style, prevProps, props);
      this.applyCommonLayerProps(prevProps, props);
    };
  };

  CanvasRenderer.registerComponentConstructor(name, klass);

  return name;
};

const ReactCanvas = {
  ...Core,
  Surface,
  Image,
  ListView,
  FontFace,
  FrameUtils,
  measureText,
  registerCustomComponent
};

export default ReactCanvas;
