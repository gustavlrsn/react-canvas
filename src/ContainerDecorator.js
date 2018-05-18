import React from "react";
import emptyObject from "fbjs/lib/emptyObject";

export default function apply(Class) {
  return class extends React.Component {
    displayName = "Container";

    /**
     * Moves a child component to the supplied index.
     *
     * @param {ReactComponent} child Component to move.
     * @protected
     */
    moveChild = child => {
      const childNode = child._mountImage;
      const mostRecentlyPlacedChild = this._mostRecentlyPlacedChild;
      if (mostRecentlyPlacedChild == null) {
        // I'm supposed to be first.
        if (childNode.previousSibling) {
          if (this.node.firstChild) {
            childNode.injectBefore(this.node.firstChild);
          } else {
            childNode.inject(this.node);
          }
        }
      } else {
        // I'm supposed to be after the previous one.
        if (mostRecentlyPlacedChild.nextSibling !== childNode) {
          if (mostRecentlyPlacedChild.nextSibling) {
            childNode.injectBefore(mostRecentlyPlacedChild.nextSibling);
          } else {
            childNode.inject(this.node);
          }
        }
      }
      this._mostRecentlyPlacedChild = childNode;
    };

    /**
     * Creates a child component.
     *
     * @param {ReactComponent} child Component to create.
     * @param {object} childNode ART node to insert.
     * @protected
     */
    createChild = (child, afterNode, childNode) => {
      child._mountImage = childNode;
      const mostRecentlyPlacedChild = this._mostRecentlyPlacedChild;
      if (mostRecentlyPlacedChild == null) {
        // I'm supposed to be first.
        if (this.node.firstChild) {
          childNode.injectBefore(this.node.firstChild);
        } else {
          childNode.inject(this.node);
        }
      } else {
        // I'm supposed to be after the previous one.
        if (mostRecentlyPlacedChild.nextSibling) {
          childNode.injectBefore(mostRecentlyPlacedChild.nextSibling);
        } else {
          childNode.inject(this.node);
        }
      }
      this._mostRecentlyPlacedChild = childNode;
    };

    /**
     * Removes a child component.
     *
     * @param {ReactComponent} child Child to remove.
     * @protected
     */
    removeChild = child => {
      child._mountImage.remove();
      child._mountImage = null;
      this.node.invalidateLayout();
    };

    updateChildrenAtRoot = (nextChildren, transaction) => {
      this.updateChildren(nextChildren, transaction, emptyObject);
    };

    mountAndInjectChildrenAtRoot = (children, transaction) => {
      this.mountAndInjectChildren(children, transaction, emptyObject);
    };

    /**
     * Override to bypass batch updating because it is not necessary.
     *
     * @param {?object} nextChildren.
     * @param {ReactReconcileTransaction} transaction
     * @internal
     * @override {ReactMultiChild.Mixin.updateChildren}
     */
    updateChildren = (nextChildren, transaction, context) => {
      this._mostRecentlyPlacedChild = null;
      this._updateChildren(nextChildren, transaction, context);
    };

    // Shorthands

    mountAndInjectChildren = (children, transaction, context) => {
      const mountedImages = this.mountChildren(children, transaction, context);

      // Each mount image corresponds to one of the flattened children
      let i = 0;
      for (const key in this._renderedChildren) {
        if (this._renderedChildren.hasOwnProperty(key)) {
          const child = this._renderedChildren[key];
          child._mountImage = mountedImages[i];
          mountedImages[i].inject(this.node);
          i++;
        }
      }
    };
    getHostNode = () => this.node;
    getNativeNode = () => this.node;

    render() {
      return <Class {...this.props} />;
    }
  };
}
