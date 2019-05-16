import Surface from './Surface'
import Core from './Core'
import Image from './Image'
import FontFace from './FontFace'
import FrameUtils from './FrameUtils'
import measureText from './measureText'
import CanvasComponent from './CanvasComponent'
import { CanvasRenderer, registerComponentConstructor } from './CanvasRenderer'
import { registerLayerType } from './DrawingUtils'

Surface.canvasRenderer = CanvasRenderer

const registerCustomComponent = (name, applyProps, drawFunction) => {
  const layerType = name.toLowerCase()

  registerLayerType(layerType, drawFunction)

  const klass = class extends CanvasComponent {
    displayName = name

    applyLayerProps = (prevProps, props) => {
      const style = props && props.style ? props.style : {}
      const layer = this.node
      layer.type = layerType
      applyProps(layer, style, prevProps, props)
      this.applyCommonLayerProps(prevProps, props)
    }
  }

  registerComponentConstructor(name, klass)

  return name
}

const ReactCanvas = {
  ...Core,
  Surface,
  Image,
  FontFace,
  FrameUtils,
  measureText,
  registerCustomComponent
}

// eslint-disable-next-line prefer-destructuring
export const Text = ReactCanvas.Text
// eslint-disable-next-line prefer-destructuring
export const Group = ReactCanvas.Group
// eslint-disable-next-line prefer-destructuring
export const Gradient = ReactCanvas.Gradient
// eslint-disable-next-line prefer-destructuring
export const Layer = ReactCanvas.Layer

export {
  Surface,
  Image,
  FontFace,
  FrameUtils,
  measureText,
  registerCustomComponent
}

export default ReactCanvas
