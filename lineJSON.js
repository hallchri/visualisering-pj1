function drawChart() {

    // En array med våra x och y koordinater för cassiopeia
    var dataArray = [ {x:5,y:5},{x:10,y:15},{x:20,y:7},{x:30,y:18},{x:40,y:10} ];

    var width = 500;
    var height = 300;

    // ritunderlag
    var canvas = d3.select('body')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

        // d3.line() är en generator som genererar en sträng för d="M x y ...
    var path = d3.line()
        .x( function(data) { return data.x * 6 } )
        .y( function(data) { return data.y * 6 } )
        .curve(d3.curveCardinal);
    // DEBUG: console.log(path(dataArray));
    
    
    canvas.append('path') // rita en linje (obs path inte svg line)
        .attr('fill','none')
        .attr('stroke','blue')
        .attr('d', path(dataArray)); // <path id="lineAB" d="M 100 350 l 150 -300" stroke="red" fill="none" />
}