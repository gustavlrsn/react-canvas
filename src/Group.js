import CanvasComponent from "./CanvasComponent";

class Group extends CanvasComponent {
  applyLayerProps = (prevProps, props) => {
    const layer = this.node;
    layer.type = "group";

    this.applyCommonLayerProps(prevProps, props);
  };

  render() {
    return [];
  }
}

export default Group;
