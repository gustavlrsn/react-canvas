import invariant from "fbjs/lib/invariant";
import emptyObject from "fbjs/lib/emptyObject";
import { Surface, Gradient } from "./index";
import ReactDOMFrameScheduling from "./ReactDOMFrameScheduling";

const UPDATE_SIGNAL = {};

const CanvasHostConfig = {
  appendInitialChild(parentInstance, child) {
    if (typeof child === "string") {
      // Noop for string children of Text (eg <Text>{'foo'}{'bar'}</Text>)
      invariant(false, "Text children should already be flattened.");
      return;
    }

    child.inject(parentInstance);
  },

  createInstance(type, props /*, internalInstanceHandle*/) {
    const ctors = {
      SURFACE: () => new Surface(props),
      GRADIENT: () => new Gradient(props)
    };

    const instance = ctors[type]();

    if (typeof instance.applyLayerProps !== "undefined") {
      instance.applyLayerProps({}, props);
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

  isPrimaryRenderer: true,

  mutation: {
    appendChild(parentInstance, child) {
      const childLayer = child.getLayer();
      const parentLayer = parentInstance.getLayer();

      if (childLayer.parentLayer === parentLayer) {
        childLayer.eject();
      }

      childLayer.inject(parentLayer);
    },

    appendChildToContainer(parentInstance, child) {
      const childLayer = child.getLayer();
      const parentLayer = parentInstance.getLayer();

      if (childLayer.parentLayer === parentLayer) {
        childLayer.eject();
      }

      childLayer.inject(parentLayer);
    },

    insertBefore(parentInstance, child, beforeChild) {
      invariant(
        child.getLayer() !== beforeChild.getLayer(),
        "ReactART: Can not insert node before itself"
      );
      child.getLayer().injectBefore(beforeChild.getLayer());
    },

    insertInContainerBefore(parentInstance, child, beforeChild) {
      invariant(
        child.getLayer() !== beforeChild.getLayer(),
        "ReactART: Can not insert node before itself"
      );
      child.getLayer().injectBefore(beforeChild.getLayer());
    },

    removeChild(parentInstance, child) {
      child.destroyEventListeners();
      child.getLayer().eject();
    },

    removeChildFromContainer(parentInstance, child) {
      child.destroyEventListeners();
      child.getLayer().eject();
    },

    commitTextUpdate(/*textInstance, oldText, newText*/) {
      // Noop
    },

    commitMount(/*instance, type, newProps*/) {
      // Noop
    },

    commitUpdate(instance, updatePayload, type, oldProps, newProps) {
      if (typeof instance.applyLayerProps !== "undefined") {
        instance.applyLayerProps(instance, newProps, oldProps);
      }
    }
  }
};

export default CanvasHostConfig;
