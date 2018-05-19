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

class Text extends CanvasComponent {
  applyLayerProps = (prevProps, props) => {
    const style = props && props.style ? props.style : {};
    const layer = this.node;

    layer.type = "text";
    layer.text = childrenAsString(props.children);

    layer.color = style.color;
    layer.fontFace = style.fontFace;
    layer.fontSize = style.fontSize;
    layer.lineHeight = style.lineHeight;
    layer.textAlign = style.textAlign;

    this.applyCommonLayerProps(prevProps, props);
    this.node.invalidateLayout();
  };
}

export default Text;
