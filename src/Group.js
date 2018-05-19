"use strict";

import createComponent from "./createComponent";
import ContainerMixin from "./ContainerMixin";
import LayerMixin from "./LayerMixin";

const Group = createComponent("Group", LayerMixin, ContainerMixin, {
  mountComponent: function(
    transaction,
    nativeParent,
    nativeContainerInfo,
    context
  ) {
    const props = this._currentElement.props;
    const layer = this.node;

    this.applyLayerProps({}, props);
    this.mountAndInjectChildren(props.children, transaction, context);

    return layer;
  },

  receiveComponent: function(nextComponent, transaction, context) {
    const props = nextComponent.props;
    const prevProps = this._currentElement.props;
    this.applyLayerProps(prevProps, props);
    this.updateChildren(props.children, transaction, context);
    this._currentElement = nextComponent;
    this.node.invalidateLayout();
  },

  unmountComponent: function() {
    LayerMixin.unmountComponent.call(this);
    this.unmountChildren();
  }
});

export default Group;
