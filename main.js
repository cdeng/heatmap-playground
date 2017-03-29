
/*  start legend code */
// we want to display the gradient, so we have to draw it
var legendCanvas = document.createElement('canvas');
legendCanvas.width = 100;
legendCanvas.height = 10;

var legendCtx = legendCanvas.getContext('2d');
var gradientCfg = {};

var legendMin = document.querySelector('#legendMin');
var legendmax = document.querySelector('#legendMax');
var gradientImg = document.querySelector('#gradient');

// now generate some random data
var points = [];
var max = 100; // The upper bound of the dataset
var min = 0; // The lower bound of the dataset
var width = 840;
var height = 400;
var len = 200; // Number of points being generated

function updateLegend(data) {
  // the onExtremaChange callback gives us min, max, and the gradientConfig
  // so we can update the legend
  legendMin.innerHTML = data.min;
  legendMax.innerHTML = data.max;
  // regenerate gradient image
  if (data.gradient != gradientCfg) {
    gradientCfg = data.gradient;
    var gradient = legendCtx.createLinearGradient(0, 0, 100, 1);
    for (var key in gradientCfg) {
      gradient.addColorStop(key, gradientCfg[key]);
    }
    legendCtx.fillStyle = gradient;
    legendCtx.fillRect(0, 0, 100, 10);
    gradientImg.src = legendCanvas.toDataURL();
  }
};

// Generate random points for heatmap
while (len--) {
  var val = Math.floor(Math.random() * 100);
  var point = {
    x: Math.floor(Math.random() * width),
    y: Math.floor(Math.random() * height),
    value: val
  };
  points.push(point);
}

// Heatmap data format
var data = {
  max: max,
  data: points
};

// Minimal heatmap instance configuration
var heatmapInstance = h337.create({
  // Only container is required, the rest will be defaults
  container: document.querySelector(".heatmapContainer"),
  // onExtremaChange will be called whenever there's a new maximum or minimum
  onExtremaChange: function(data) {
    updateLegend(data);
  }
});

// If you have a set of datapoints always use setData instead of addData
// for data initialization
heatmapInstance.setData(data);
