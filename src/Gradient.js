import CanvasComponent from "./CanvasComponent";

class Gradient extends CanvasComponent {
  displayName = "Gradient";

  applyLayerProps = (prevProps, props) => {
    const layer = this.node;
    layer.type = "gradient";
    layer.colorStops = props.colorStops || [];
    this.applyCommonLayerProps(prevProps, props);
    this.node.invalidateLayout();
  };
}

export default Gradient;
