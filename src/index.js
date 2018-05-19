import Surface from "./Surface";
import ListView from "./ListView";
import FontFace from "./FontFace";
import FrameUtils from "./FrameUtils";
import measureText from "./measureText";
import { registerLayerType } from "./DrawingUtils";

export default {
  Surface: Surface,
  Layer: "Layer",
  Group: "Group",
  Image: "Image",
  Text: "Text",
  Gradient: "Gradient",
  ListView: ListView,
  FontFace: FontFace,
  measureText: measureText,
  FrameUtils: FrameUtils,
  registerLayerType: registerLayerType
};
