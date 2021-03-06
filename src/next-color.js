(function() {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('next-js-core2');
  var Color = require('color');

  function clamp(val) {
    return Math.min(1, Math.max(0, val));
  }

  // function lighten(color, amount) {
  //   var hsl = this.hsl();

  //   hsl.l += amount.value / 100;
  //   hsl.l = clamp(hsl.l);
  //   return hsla(color, hsl);
  // }

  var NxColor = nx.declare('nx.Color', {
    statics: {
      rgba: function(inValue, inAlpha) {
        return Color(inValue).alpha(inAlpha);
      },
      lighten: function(inValue, inAmount) {
        var color = Color(inValue);
        var colors = color.hsl().color.slice();
        colors[2] += inAmount * 100;
        return Color.hsl(colors);
      },
      darken: function(inValue, inAmount) {
        var color = Color(inValue);
        var colors = color.hsl().color.slice();
        colors[2] -= inAmount * 100;
        return Color.hsl(colors);
      },
      saturate: function(inValue, inAmount) {
        var color = Color(inValue);
        var colors = color.hsl().color.slice();
        colors[1] += inAmount * 100;
        return Color.hsl(colors);
      },
      desaturate: function(inValue, inAmount) {
        var color = Color(inValue);
        var colors = color.hsl().color.slice();
        colors[1] -= inAmount * 100;
        return Color.hsl(colors);
      },
      adjustHue: function(inValue, inDeg) {
        var color = Color(inValue);
        var colors = color.hsl().color;
        var hue = Color(inValue).hue() + inDeg;
        hue = hue > 360 ? hue - 360 : hue;
        hue = hue < 0 ? hue + 360 : hue;
        return Color.hsl(hue, colors[1], colors[2]);
      },
      // $hue,$saturation,$lightness
      hsl: function(inH, inS, inL) {
        return Color.hsl(inH, inS, inL);
      },
      hsla: function(inH, inS, inL, inAlpha) {
        return this.hsl(inH, inS, inL).alpha(inAlpha);
      },
      'hue,saturation,lightness': function(_, inIndex) {
        return function(inValue) {
          if (!inValue) return inValue;
          var color = Color(inValue);
          var colors = color.hsl().color;
          return colors[inIndex];
        };
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxColor;
  }
})();
