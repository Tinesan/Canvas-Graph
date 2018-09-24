//var dataset = [450, 620, 490, 560, 380, 730, 760, 450, 620, 490, 560, 380];

var svgWidth = 600;
var svgHeight = 400;
var dataset = [];
for (var i = 0; i < 25; i++) {
    var newNumber = Math.round(Math.random() * 30);
    dataset.push(newNumber);
}
var maxNum = getMaxOfArray(dataset);
var heightProportion = svgHeight / maxNum;
var widthProportion = svgWidth / dataset.length;

console.log(heightProportion);
console.log(widthProportion);

function getMaxOfArray(numArray) {
    return Math.max.apply(null, numArray);
}

var svg = d3.select('.d3-js').append('svg');

svg.attr('width', svgWidth).attr('height', svgHeight);

var rect = svg
    .selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect');

rect.attr('x', function(d, i) {
    return i * widthProportion;
})
    .attr('y', function(d, i) {
        return svgHeight - d * heightProportion;
    })
    .attr('width', function(d, i) {
        return widthProportion - 1;
    })
    .attr('height', function(d, i) {
        return heightProportion * d;
    })
    .attr('fill', function(d) {
        return 'rgb(100, 200, ' + heightProportion * d * 0.5 + ')';
    });

svg.selectAll('text')
    .data(dataset)
    .enter()
    .append('text')
    .text(function(d) {
        return d;
    })
    .attr('x', function(d, i) {
        return i * widthProportion + 2;
    })
    .attr('y', function(d) {
        return svgHeight - d * heightProportion + 15;
    })
    .attr('font-family', 'sans-serif')
    .attr('font-size', '14px')
    .attr('fill', 'white');
