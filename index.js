var svg = d3.select('#wrapper')
            .append('svg')
            .attr({'width': 900, 'height': 600});


var data = [{
    "xAxis": 350,
    "yAxis": 300,
    "width": 100,
    "red": d3.rgb(255, 0, 0),
    "green": d3.rgb(0, 255, 0),
    "blue": d3.rgb(0, 0, 255),
    "scale1": 4/5,
    "scale2": 3/5,
    "angle1": Math.asin(4/5) * 180 / Math.PI,
    "angle2": Math.asin(3/5) * 180 / Math.PI
}];

var group = svg.selectAll("g")
                .data(data)
                .enter()
                .append("g");
                // .attr("transform","translate("+ 200 +","+ 200 +")");

// first square
var rec = group.append("rect")
               .attr("x", function(d) { return d.xAxis; })
               .attr("y", function(d) { return d.yAxis; })
               .attr("height", function(d) { return d.width; })
               .attr("width", function(d) { return d.width; })
               .style("fill", function(d) { return d.red; });


var left = group.append("rect")
                .attr("x", function(d) { return d.xAxis; })
                .attr("y", function(d) { return d.yAxis; })
                .attr("height", function(d) { return d.width * d.scale1; })
                .attr("width", function(d) { return d.width * d.scale1; })
                .style("fill", function(d) { return d.blue; })
                // .transition()
                // .duration(800)
                // .ease('cubic')
                .attr('transform', function(d, i){ return "rotate("+ -(d.angle2+90) + "," + d.xAxis + "," + d.yAxis + ")"; });

var right = group.append("rect")
                .attr("x", function(d) { return d.xAxis + d.width; })
                .attr("y", function(d) { return d.yAxis; })
                .attr("height", function(d) { return d.width * d.scale2; })
                .attr("width", function(d) { return d.width * d.scale2; })
                .style("fill", function(d) { return d.green; })
                // .transition()
                // .duration(800)
                // .ease('cubic')
                .attr('transform', function(d, i){ return "rotate("+ -(d.angle2+90) + "," + (d.xAxis + d.width) + "," + d.yAxis + ")"; });

// ori.x + 100 * 4/5
// ori.x + 100 * 4/5 + 100 * 4/5 * 4/5

var leftRec = function (level) {
    group.append("rect")
         .attr("x", function(d) {
             var sum = 0;
             for (var i = 1; i < level+1; i++) {
                 sum += d.width * Math.pow( 4/5, i);
             }
             return  d.xAxis + sum;
         })
         .attr("y", function(d) { return d.yAxis; })
         .attr("height", function(d) { return d.width * Math.pow(d.scale1, level+1); })
         .attr("width", function(d) { return d.width * Math.pow(d.scale1, level+1); })
         .attr('fill', function(d) { return d.blue.darker(level) })
         .attr('transform', function(d) {
             var tmp = "rotate("+  -(d.angle2 + 90) + "," + d.xAxis + "," + d.yAxis + ")";
             var sum = 0;
             for (var i = 1; i < level + 1; i++) {
                 sum += d.width * Math.pow( 4/5, i);
                 tmp += "rotate(" + (-d.angle2) + "," + (d.xAxis + sum) + "," + d.yAxis  + ")" ;
             }
             return tmp
         });
};
