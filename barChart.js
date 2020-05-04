window.onresize = redraw; // Rita grafen när fönstret ändrar storlek
window.onload = redraw; // Rita grafen en gång när sidan laddas

function redraw() {
    // Höjden på våra rektanglar i barcharten
    var dataTable = [70,110,150,200, 90];
    var width = window.innerWidth * 0.8;
    var height = window.innerHeight / 2;
    var barWidth = 40;
    var barMargin = 30;

    // Ta bort tidigare grafer
    d3.select('svg').remove('staplar');

    // Skalningsfunktion för y-axeln
    var yScale = d3.scaleLinear()
        .domain([0,d3.max(dataTable)])
        .range([0,height]);

    var xScale = d3.scaleBand()
        .domain(dataTable)
        .range([0,width])
        .padding(0.2);
        //.paddingInner(0.2)
        //.paddingOuter(0.5);


    //Skapa ett ritunderlag
    var canvas = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("background", "lightgrey");
    
    // Här börjar tidsresan
    canvas.selectAll("staplar")
        .data(dataTable) // Fyll virtuella staplar med data från arrayn (dataTable)
        
        .enter() // Gå in i varje virtuella stapel
            .append("rect")
            .attr("width", function(data) {return xScale.bandwidth(); })
            .attr("height", function(data) {return yScale(data) + barMargin;})
            .attr("x", function(data) {return xScale(data); }) // förskjuter rektanglarna med 100px (gånger 1, 2...)
            .attr("y", function(data, i) {return height - yScale(data) + barMargin}); // vi måste få att y-positionen börjar från bottnet av stapeln
}