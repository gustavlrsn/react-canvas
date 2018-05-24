import RenderLayer from "./RenderLayer";
import { make } from "./FrameUtils";
import * as EventTypes from "./EventTypes";
import emptyObject from "fbjs/lib/emptyObject";

let LAYER_GUID = 0;

export default class CanvasComponent {
  constructor(type) {
    this.type = type;
    this.subscriptions = null;
    this.listeners = null;
    this.node = new RenderLayer(this);
    this._layerId = LAYER_GUID++;
  }

  putEventListener = (type, listener) => {
    const subscriptions = this.subscriptions || (this.subscriptions = {});
    const listeners = this.listeners || (this.listeners = {});

    if (listeners[type] !== listener) {
      listeners[type] = listener;
    }

    if (listener) {
      if (!subscriptions[type]) {
        subscriptions[type] = this.node.subscribe(type, listener, this);
      }
    } else {
      if (subscriptions[type]) {
        subscriptions[type]();
        delete subscriptions[type];
      }
    }
  };

  destroyEventListeners = () => {
    this.listeners = null;
    this.subscriptions = null;
    this.node.destroyEventListeners();
  };

  applyCommonLayerProps = (prevProps, props) => {
    const layer = this.node;

    layer._originalStyle = null;
    let style = emptyObject;

    if (props && props.style) {
      style = props.style;
      layer._originalStyle = style;
    }

    // Common layer properties
    layer.alpha = style.alpha;
    layer.backgroundColor = style.backgroundColor;
    layer.borderColor = style.borderColor;
    layer.borderWidth = style.borderWidth;
    layer.borderRadius = style.borderRadius;
    layer.clipRect = style.clipRect;

    if (!layer.frame) {
      layer.frame = make(0, 0, 0, 0);
    }

    layer.frame.x = style.left || 0;
    layer.frame.y = style.top || 0;
    layer.frame.width = style.width || 0;
    layer.frame.height = style.height || 0;
    layer.scale = style.scale;
    layer.translateX = style.translateX;
    layer.translateY = style.translateY;
    layer.zIndex = style.zIndex;

    // Shadow
    layer.shadowColor = style.shadowColor;
    layer.shadowBlur = style.shadowBlur;
    layer.shadowOffsetX = style.shadowOffsetX;
    layer.shadowOffsetY = style.shadowOffsetY;

    // Generate backing store ID as needed.
    if (props.useBackingStore) {
      layer.backingStoreId = this._layerId;
    }

    // Register events
    for (const type in EventTypes) {
      this.putEventListener(EventTypes[type], props[type]);
    }
  };

  getLayer = () => this.node;

  /**
   * Resets all the state on this CanvasComponent so it can be added to a pool for re-use.
   *
   * @return {RenderLayer}
   */
  reset = () => {
    this.destroyEventListeners();
    this._originalStyle = null;
    this.node.reset(this);
  };
}
