import CanvasComponent from "./CanvasComponent";

class Group extends CanvasComponent {
  applyLayerProps = (prevProps, props) => {
    this.applyCommonLayerProps(prevProps, props);
  };

  render() {
    return [];
  }
}

export default Group;
