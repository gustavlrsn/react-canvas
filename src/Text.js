import CanvasComponent from "./CanvasComponent";

function childrenAsString(children) {
  if (!children) {
    return "";
  }
  if (typeof children === "string") {
    return children;
  }
  if (children.length) {
    return children.join("\n");
  }
  return "";
}

function textArraysEqual(a, b) {
  if (typeof a !== typeof b || a.length !== b.length) return false;

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }

  return true;
}

class Text extends CanvasComponent {
  applyLayerProps = (prevProps, props) => {
    const style = props && props.style ? props.style : {};
    const layer = this.node;

    layer.type = "text";

    if (
      layer.text === null ||
      !textArraysEqual(prevProps.children, props.children)
    ) {
      layer.text = childrenAsString(props.children);
    }

    layer.color = style.color;
    layer.fontFace = style.fontFace;
    layer.fontSize = style.fontSize;
    layer.lineHeight = style.lineHeight;
    layer.textAlign = style.textAlign;

    this.applyCommonLayerProps(prevProps, props);
  };
}

export default Text;
