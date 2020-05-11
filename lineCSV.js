function drawChart() {
    // Importera data från extern csv fil
    
    //D3 v4 använder .get metoden
    //d3.csv("lineData.csv").get(function(error,data) {
        //console.log(data);
        
    //});

    //d3 ES6 V5 SYNTAX
    //d3.csv("lineData.csv").then((data) => {
        //console.log(data);     
    //});

    // d3.v5 erbjuder .then metoden och promises

    d3.csv("lineData.csv").then(function(data) {
        var temps = [], months = [], dataFix = [];

        // ladda in datan
        for(i = 0; i < data.length; i++) {
            months.push(data[i].Month);
            temps.push( parseFloat(data[i].Temp));
            dataFix.push( { month:months[i], temp:temps[i] } );
        }
        console.log(dataFix);
        console.log(months);
        console.log(temps);

    // skapa ritunderlag
    var width = 800, height = 500;

    var canvas = d3.select('body')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    // Skapa ordinal scale
    var xScale = d3.scaleBand()
        .domain(months)
        .range([0, width]);

    // Temperaturen - 20 kan inte användas som Y axel, -20 är ju utanför canvas
    // Vi behöver en skala, för temperatur passar en lineär skala
    var yScale = d3.scaleLinear()
        .domain([d3.min(temps), d3.max(temps)]) // vilka värden (ska konverteras till pixelvärden)
        .range([height, 0]); // skala över vilken pixelstorlek

    // generera d-strängen för path
    var dString = d3.line()
        .x(function(d) { return xScale(d.month) })
        .y(function(d) { return yScale(d.temp) });
        //console.log(dString(data)); debug, kolla på d attributet
        
    // rita linjen
    canvas.append('path')
        .attr('fill', 'none')
        .attr('stroke', 'blue')
        .attr('d', dString(dataFix));
    
    });
}