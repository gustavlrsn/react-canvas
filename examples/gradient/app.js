import React from 'react';
import {Gradient, Surface} from 'react-canvas';


var App = React.createClass({

  render: function () {
    var size = this.getSize();
    return (
      <Surface top={0} left={0} width={size.width} height={size.height}>
        <Gradient style={this.getGradientStyle()}
                  colorStops={this.getGradientColors()} />
      </Surface>
    );
  },

  getGradientStyle: function(){
    var size = this.getSize();
    return {
      top: 0,
      left: 0,
      width: size.width,
      height: size.height
    };
  },

  getGradientColors: function(){
    return [
      { color: "transparent", position: 0 },
      { color: "#000", position: 1 }
    ];
  },

  getSize: function () {
    return {top: 0, right: 80, bottom: 80, left: 0, width: 80, height: 80}
  }

});

export default App;

