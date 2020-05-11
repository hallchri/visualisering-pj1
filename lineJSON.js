function drawChart() {


    // OBS! YTTERST VIKTIGT FÖR ATT KLARA PROJEKT 1

    // En array med våra x och y koordinater för cassiopeia
    var dataArray = d3.json("lineData.json").get(function(error,dataArray) {
        // En array med våra x och y koordinater för cassiopeia
        console.log(dataArray);

    var xs = [];
    var ys = [];
    
    // gå igenom dataarrayn och hämta x samt y
    for(i = 0; i < dataArray.length; i++) {
        // push för att lägga till ett eller flera värden i en array
        xs.push(dataArray[i].x);
        ys.push(dataArray[i].y);
    }
    console.log(xs);
        
    var width = 500;
    var height = 300;

    // ritunderlag
    var canvas = d3.select('body')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

        // d3.line() är en generator som genererar en sträng för d="M x y ...
    var path = d3.line()                                               
        .x( function(d) { return d.x * 6 } )
        .y( function(d) { return d.y * 6 } );
    // DEBUG: console.log(path(dataArray));
    
    canvas.append('path') // rita en linje (obs path inte svg line)
        .attr('fill','none')
        .attr('stroke','blue')
        .attr('d', path(dataArray)); // <path id="lineAB" d="M 100 350 l 150 -300" stroke="red" fill="none" />

    // gruppera våra cirklar får att göra de mer praktiskt å flexibelt
    var dotsGroup = canvas.append('g');

    dotsGroup.selectAll('dots').data(dataArray)
        .enter()
        .append('circle')
        .attr('cx', function(d) { return d.x * 6})
        .attr('cy', function(d) { return d.y * 6 })
        .attr('r', '4')
        .attr('fill', 'red');
    
    });
}