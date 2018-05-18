import React from 'react';

import { storiesOf } from '@storybook/react';

import range from 'lodash.range';
import { scaleBand, interpolateInferno } from 'd3-scale';

import ReactCanvas from '../src/index';

const {Gradient, ListView, Surface, Group, Image, Text, registerLayerType, createCanvasComponent} = ReactCanvas;

import Alea from 'alea';

const random = new Alea(0);
random();
const NUM_ROWS = 16;
const NUM_COLS = 1000;
const rowsRange = range(0, NUM_ROWS);
const colRange = range(0, NUM_COLS);
const rows = rowsRange.map( () => colRange.map(() => random()));


registerLayerType('heatmap', function (ctx, layer) {
    const data = layer.data;
    var x = layer.frame.x;
    var y = layer.frame.y;
    var width = layer.frame.width;
    var height = layer.frame.height;
    var centerX = x + width / 2;
    var centerY = y + height / 2;

    var fillColor = layer.backgroundColor || '#FFF';
    var strokeColor = layer.borderColor || '#FFF';
    var strokeWidth = layer.borderWidth || 0;

    var shadowColor = layer.shadowColor || 0;
    var shadowOffsetX = layer.shadowOffsetX || 0;
    var shadowOffsetY = layer.shadowOffsetY || 0;
    var shadowBlur = layer.shadowBlur || 0;

    const horizontalScale = scaleBand().domain(rowsRange).range([x, x + width]);
    const verticalScale = scaleBand().domain(colRange).range([y, y + height]);

    ctx.fillStyle = fillColor;
    data.forEach((row, rowIdx) => {

        row.forEach((col, colIdx) => {
            ctx.fillStyle = interpolateInferno(col);
            const rectDimensions = {
                x: horizontalScale(rowIdx),
                y: verticalScale(colIdx),
                width: horizontalScale.bandwidth(),
                height: verticalScale.bandwidth(),
            };
            ctx.fillRect(rectDimensions.x, rectDimensions.y, rectDimensions.width, rectDimensions.height);
        })
    });



});

const Heatmap = createCanvasComponent({
  displayName: 'Heatmap',
  layerType: 'heatmap',

  applyCustomProps: function (prevProps, props) {
    var style = props.style || {};
    var layer = this.node;
    layer.shadowColor = style.shadowColor || 0;
    layer.shadowOffsetX = style.shadowOffsetX || 0;
    layer.shadowOffsetY = style.shadowOffsetY || 0;
    layer.shadowBlur = style.shadowBlur || 0;
    layer.data = props.data || [];
  }
});



const App = React.createClass({

    render: function () {
        const {data, height, width, x, y} = this.props;
        return (
            <Surface top={y} left={x} width={width} height={height}>
                <Heatmap
                    background={'blue'}
                    style={{
                        top: y,
                        left: x,
                        width: width,
                        height: height,
                        backgroundColor: 'green',
                        borderColor: '#000',
                        borderWidth: 1,
                        shadowColor: '#999',
                        shadowOffsetX: 15,
                        shadowOffsetY: 15,
                        shadowBlur: 20
                    }}
                    data={data}
                />
            </Surface>
        );
    },

});



storiesOf('Heatmap', module)
    .add('heatmap', () => {
        const props = {height: 800, width: 800, x: 0, y: 0, size: {width: 80, height: 80}};
        return (
            <div>
                <App data={rows} {...props} />
            </div>
        );
    });
