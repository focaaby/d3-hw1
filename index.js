var svg = d3.select('body')
            .append('svg')
            .attr({'width': 900, 'height': 600})
            .on("click", click)
            .on("contextmenu", contextmenu);

var data = [
  {"x": 350, "y": 300, "width":100, "color": "red", "transform": "", "class": ""},
  {"x": 350, "y": 300, "width":80, "color": "blue", "transform": "rotate(-126.86, 350, 300)", "class": "left"},
  {"x": 450, "y": 300, "width":60, "color": "green", "transform": "rotate(-126.86, 450, 300)", "class": "right"}
];


var count = depth = 11;
var angle = Math.asin(3/5) * 180 / Math.PI;
var blue = d3.rgb(0, 0, 255),
    green = d3.rgb(0, 255, 0);

var recs  = svg.selectAll("rect")
                .data(data)
                .enter()
                .append("rect")
                .attr("id", function(d){ return d.class; })
                .attr("x", function(d) { return d.x; })
                .attr("y", function(d) { return d.y; })
                .attr("height", function(d) { return d.width; })
                .attr("width", function(d) { return d.width; })
                .attr("fill", function(d) { return d.color; })
                .attr("transform", function(d){ return d.transform; });

// function leftAppend(on, order, width){
function leftAppend(parentRect, order){
  if (order > depth - 1) {
    return
  }

  var newLeft = svg.append("g")
        .attr("class", function(d) { return "left " + "level-" + order })
        .append("rect")
        .attr("x", function(d) { return parseInt(parentRect.attr("x")) + parseInt(parentRect.attr("width")); })
        .attr("y", function(d) { return parentRect.attr("y"); })
        .attr("height", function(d) { return parentRect.attr("width") * 4/5; })
        .attr("width", function(d) { return parentRect.attr("width") * 4/5; })
        // .attr("fill", function(d) { return d.blue((parseInt(parentRect.attr("data-level")) + 1)); })
        .attr("fill", function(d) { return blue.darker(order) ;})
        .attr("transform", function(d) {
          var tmp = parentRect.attr("transform");
          if (!tmp) {
              tmp = '';
          }
          tmp += 'rotate(' +  -(angle) + ',' + (parseInt(parentRect.attr("x")) + parseInt(parentRect.attr("width"))) + ',' + parentRect.attr("y") + ')';
          return tmp;
        });

    var newRight = svg.append("g")
          .attr("class", function(d) { return "right " + "level-" + order })
          .append("rect")
          .attr("x", function(d) { return parseInt(parentRect.attr("x")) + parseInt(parentRect.attr("width")); })
          .attr("y", function(d) { return parseInt(parentRect.attr("y")) + parseInt(parentRect.attr("width")); })
          .attr("height", function(d) { return parentRect.attr("width") * 3/5; })
          .attr("width", function(d) { return parentRect.attr("width") * 3/5; })
          // .attr("fill", function(d) { return d.blue((parseInt(parentRect.attr("data-level")) + 1)); })
          .attr("fill", function(d) { return blue.darker(order) ;})
          .attr("transform", function(d) {
            var tmp = parentRect.attr("transform");
            if (!tmp) {
                tmp = '';
            }
            tmp += 'rotate(' +  -(angle) + ',' + (parseInt(parentRect.attr("x")) + parseInt(parentRect.attr("width"))) + ',' + (parseInt(parentRect.attr("y")) + parseInt(parentRect.attr("width"))) + ')';
            return tmp;
          });

    // leftAppend(newRight, order + 1);
    leftAppend(newLeft, order + 1);
    rightAppend(newRight, order + 1)
}

function rightAppend(parentRect, order){
  if (order > depth - 1) {
    return
  }

  var newLeft = svg.append("g")
        .attr("class", function(d) { return "left " + "level-" + order })
        .append("rect")
        .attr("x", function(d) { return parseInt(parentRect.attr("x")) + parseInt(parentRect.attr("width")); })
        .attr("y", function(d) { return parseInt(parentRect.attr("y")) + parseInt(parentRect.attr("width")); })
        .attr("height", function(d) { return parentRect.attr("width") * 4/5; })
        .attr("width", function(d) { return parentRect.attr("width") * 4/5; })
        // .attr("fill", function(d) { return d.blue((parseInt(parentRect.attr("data-level")) + 1)); })
        .attr("fill", function(d) { return green.darker(order) ;})
        .attr("transform", function(d) {
          var tmp = parentRect.attr("transform");
          if (!tmp) {
              tmp = '';
          }
          tmp += 'rotate(' +  (90-angle) + ',' + (parseInt(parentRect.attr("x")) + parseInt(parentRect.attr("width"))) + ',' + (parseInt(parentRect.attr("y")) + parseInt(parentRect.attr("width"))) + ')';
          return tmp;
        });

    var newRight = svg.append("g")
          .attr("class", function(d) { return "right " + "level-" + order })
          .append("rect")
          .attr("x", function(d) { return parentRect.attr("x");; })
          .attr("y", function(d) { return parseInt(parentRect.attr("y")) + parseInt(parentRect.attr("width")); })
          .attr("height", function(d) { return parentRect.attr("width") * 3/5; })
          .attr("width", function(d) { return parentRect.attr("width") * 3/5; })
          // .attr("fill", function(d) { return d.blue((parseInt(parentRect.attr("data-level")) + 1)); })
          .attr("fill", function(d) { return green.darker(order) ;})
          .attr("transform", function(d) {
            var tmp = parentRect.attr("transform");
            if (!tmp) {
                tmp = '';
            }
            tmp += 'rotate(' +  (90-angle) + ',' + (parentRect.attr("x")) + ',' + (parseInt(parentRect.attr("y")) + parseInt(parentRect.attr("width"))) + ')';
            return tmp;
          });

    leftAppend(newLeft, order + 1);
    rightAppend(newRight, order + 1);
}


function click() {

  if (count == 0) {
    return;
  } else {
    count--;
  }

  var left = d3.select("#left");
  var right = d3.select("#right");
  d3.selectAll(".left").remove();
  d3.selectAll(".right").remove();
  leftAppend(left, count);
  rightAppend(right, count);
}

function contextmenu() {
  d3.event.preventDefault();

  if (count >= depth) {
    return;
  } else {
    count++;
  }

  var left = d3.select("#left");
  var right = d3.select("#right");
  d3.selectAll(".left").remove();
  d3.selectAll(".right").remove();
  leftAppend(left, count);
  rightAppend(right, count);

}
