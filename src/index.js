import Surface from "./Surface";
import Core from "./Core";
import Image from "./Image";
import ListView from "./ListView";
import FontFace from "./FontFace";
import FrameUtils from "./FrameUtils";
import measureText from "./measureText";
import { registerLayerType } from "./DrawingUtils";

const ReactCanvas = {
  ...Core,
  Surface,
  Image,
  ListView,
  FontFace,
  measureText,
  FrameUtils,
  registerLayerType
};

export default ReactCanvas;
