import React from 'react'
import PropTypes from 'prop-types'

import { Group, Image, Text, FontFace, measureText } from '../../src/index'

const CONTENT_INSET = 14
const TEXT_SCROLL_SPEED_MULTIPLIER = 0.6
const TEXT_ALPHA_SPEED_OUT_MULTIPLIER = 1.25
const TEXT_ALPHA_SPEED_IN_MULTIPLIER = 2.6
const IMAGE_LAYER_INDEX = 2
const TEXT_LAYER_INDEX = 1

class Page extends React.Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    article: PropTypes.shape({
      title: PropTypes.string.isRequired,
      excerpt: PropTypes.string.isRequired
    }).isRequired,
    scrollTop: PropTypes.number.isRequired
  }

  constructor(props) {
    super()

    // Pre-compute headline/excerpt text dimensions.
    const { article } = props
    const maxWidth = props.width - 2 * CONTENT_INSET
    const titleStyle = this.getTitleStyle(props)
    const excerptStyle = this.getExcerptStyle(props)

    this.titleMetrics = measureText(
      article.title,
      maxWidth,
      titleStyle.fontFace,
      titleStyle.fontSize,
      titleStyle.lineHeight
    )
    this.excerptMetrics = measureText(
      article.excerpt,
      maxWidth,
      excerptStyle.fontFace,
      excerptStyle.fontSize,
      excerptStyle.lineHeight
    )
  }

  // Styles
  // ======

  getGroupStyle = () => {
    const { width, height } = this.props
    return {
      top: 0,
      left: 0,
      width,
      height
    }
  }

  getImageHeight = props => {
    return Math.round(props.height * 0.5)
  }

  getImageStyle = () => {
    const { width } = this.props
    return {
      top: 0,
      left: 0,
      width,
      height: this.getImageHeight(this.props),
      backgroundColor: '#eee',
      zIndex: IMAGE_LAYER_INDEX
    }
  }

  getTitleStyle = props => {
    return {
      top: this.getImageHeight(props) + CONTENT_INSET,
      left: CONTENT_INSET,
      width: props.width - 2 * CONTENT_INSET,
      fontSize: 22,
      lineHeight: 30,
      fontFace: FontFace('Avenir Next Condensed, Helvetica, sans-serif', null, {
        weight: 500
      })
    }
  }

  getExcerptStyle = props => {
    return {
      left: CONTENT_INSET,
      width: props.width - 2 * CONTENT_INSET,
      fontFace: FontFace('Georgia, serif'),
      fontSize: 15,
      lineHeight: 23
    }
  }

  getTextGroupStyle = () => {
    const { scrollTop, height, width } = this.props
    const imageHeight = this.getImageHeight(this.props)
    let translateY = 0
    const alphaMultiplier =
      scrollTop <= 0
        ? -TEXT_ALPHA_SPEED_OUT_MULTIPLIER
        : TEXT_ALPHA_SPEED_IN_MULTIPLIER
    let alpha = 1 - (scrollTop / height) * alphaMultiplier
    alpha = Math.min(Math.max(alpha, 0), 1)
    translateY = -scrollTop * TEXT_SCROLL_SPEED_MULTIPLIER

    return {
      width,
      height: height - imageHeight,
      top: imageHeight,
      left: 0,
      alpha,
      translateY,
      zIndex: TEXT_LAYER_INDEX
    }
  }

  render() {
    const { height, article } = this.props
    const groupStyle = this.getGroupStyle()
    const imageStyle = this.getImageStyle()
    const titleStyle = this.getTitleStyle(this.props)
    const excerptStyle = this.getExcerptStyle(this.props)

    // Layout title and excerpt below image.
    titleStyle.height = this.titleMetrics.height
    excerptStyle.top = titleStyle.top + titleStyle.height + CONTENT_INSET
    excerptStyle.height = height - excerptStyle.top - CONTENT_INSET

    return (
      <Group style={groupStyle}>
        <Image
          style={imageStyle}
          src={article.imageUrl}
          fadeIn
          useBackingStore
        />
        <Group style={this.getTextGroupStyle()} useBackingStore>
          <Text style={titleStyle}>{this.props.article.title}</Text>
          <Text style={excerptStyle}>{this.props.article.excerpt}</Text>
        </Group>
      </Group>
    )
  }
}

export default Page
