import CanvasComponent from "./CanvasComponent";

class Group extends CanvasComponent {
  applyLayerProps = (prevProps, props) => {
    this.applyCommonLayerProps(prevProps, props);
    this.node.invalidateLayout();
  };

  render() {
    return [];
  }
}

export default Group;
