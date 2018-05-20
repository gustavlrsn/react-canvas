import React from "react";
import invariant from "fbjs/lib/invariant";
import emptyObject from "fbjs/lib/emptyObject";
import Gradient from "./Gradient";
import Text from "./Text";
import Group from "./Group";
import { RawImage } from "./Image";
import ReactDOMFrameScheduling from "./ReactDOMFrameScheduling";
import ReactFiberReconciler from "react-reconciler";
import { getClosestInstanceFromNode } from "./ReactDOMComponentTree";

const UPDATE_SIGNAL = {};

const ctors = {
  Gradient: Gradient,
  Text: Text,
  Group: Group,
  RawImage: RawImage
};

const CanvasHostConfig = {
  appendInitialChild(parentInstance, child) {
    if (typeof child === "string") {
      // Noop for string children of Text (eg <Text>{'foo'}{'bar'}</Text>)
      invariant(false, "Text children should already be flattened.");
      return;
    }

    child.getLayer().inject(parentInstance.getLayer());
  },

  createInstance(type, props /*, internalInstanceHandle*/) {
    const instance = new ctors[type](props);

    if (typeof instance.applyLayerProps !== "undefined") {
      instance.applyLayerProps({}, props);
      instance.getLayer().invalidateLayout();
    }

    return instance;
  },

  createTextInstance(text /*, rootContainerInstance, internalInstanceHandle*/) {
    return text;
  },

  finalizeInitialChildren(/*domElement, type, props*/) {
    return false;
  },

  getPublicInstance(instance) {
    return instance;
  },

  prepareForCommit() {
    // Noop
  },

  prepareUpdate(/*domElement, type, oldProps, newProps*/) {
    return UPDATE_SIGNAL;
  },

  resetAfterCommit() {
    // Noop
  },

  resetTextContent(/*domElement*/) {
    // Noop
  },

  shouldDeprioritizeSubtree(/*type, props*/) {
    return false;
  },

  getRootHostContext() {
    return emptyObject;
  },

  getChildHostContext() {
    return emptyObject;
  },

  scheduleDeferredCallback: ReactDOMFrameScheduling.rIC,

  shouldSetTextContent(type, props) {
    return (
      typeof props.children === "string" || typeof props.children === "number"
    );
  },

  now: ReactDOMFrameScheduling.now,

  isPrimaryRenderer: false,

  useSyncScheduling: true,

  mutation: {
    appendChild(parentInstance, child) {
      const childLayer = child.getLayer();
      const parentLayer = parentInstance.getLayer();

      if (childLayer.parentLayer === parentLayer) {
        childLayer.moveToTop();
      } else {
        childLayer.inject(parentLayer);
      }

      parentLayer.invalidateLayout();
    },

    appendChildToContainer(parentInstance, child) {
      const childLayer = child.getLayer();
      const parentLayer = parentInstance.getLayer();

      if (childLayer.parentLayer === parentLayer) {
        childLayer.moveToTop();
      } else {
        childLayer.inject(parentLayer);
      }

      parentLayer.invalidateLayout();
    },

    insertBefore(parentInstance, child, beforeChild) {
      const parentLayer = parentInstance.getLayer();
      child.getLayer().injectBefore(parentLayer, beforeChild.getLayer());
    },

    insertInContainerBefore(parentInstance, child, beforeChild) {
      const parentLayer = parentInstance.getLayer();
      child.getLayer().injectBefore(parentLayer, beforeChild.getLayer());
    },

    removeChild(parentInstance, child) {
      child.destroyEventListeners();
      child.getLayer().remove();
    },

    removeChildFromContainer(parentInstance, child) {
      child.destroyEventListeners();
      child.getLayer().remove();
    },

    commitTextUpdate(/*textInstance, oldText, newText*/) {
      // Noop
    },

    commitMount(/*instance, type, newProps*/) {
      // Noop
    },

    commitUpdate(instance, updatePayload, type, oldProps, newProps) {
      if (typeof instance.applyLayerProps !== "undefined") {
        instance.applyLayerProps(newProps, oldProps);
        instance.getLayer().invalidateLayout();
      }
    }
  }
};

const CanvasRenderer = ReactFiberReconciler(CanvasHostConfig);

CanvasRenderer.injectIntoDevTools({
  findFiberByHostInstance: getClosestInstanceFromNode,
  bundleType: process.env.NODE_ENV !== "production" ? 1 : 0,
  version: React.version || 16,
  rendererPackageName: "react-canvas",
  getInspectorDataForViewTag: (...args) => {
    console.log(args);
  }
});

CanvasRenderer.registerComponentConstructor = (name, ctor) => {
  ctors[name] = ctor;
};

export default CanvasRenderer;
