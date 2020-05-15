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
    var width = 800, height = 500, margin = 20;
    var chartWidth = width-margin*2, chartHeight = height-margin*2

    var canvas = d3.select('body')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    // Skapa ordinal scale
    var xScale = d3.scaleBand()
        .domain(months)
        .range([0, chartWidth])
        .padding(0.2);

    // Temperaturen - 20 kan inte användas som Y axel, -20 är ju utanför canvas
    // Vi behöver en skala, för temperatur passar en lineär skala
    var yScale = d3.scaleLinear()
        .domain([d3.min(temps), d3.max(temps)]) // vilka värden (ska konverteras till pixelvärden)
        .range([chartHeight, 0]); // skala över vilken pixelstorlek

    // generera d-strängen för path
    var dString = d3.line()
        .x(function(d) { return xScale(d.month) })
        .y(function(d) { return yScale(d.temp) });
        //console.log(dString(data)); debug, kolla på d attributet
    
        // yAxel för temperaturer
    var yAxis = d3.axisLeft(yScale);

        // xAxel för månader
    var xAxis = d3.axisBottom(xScale);
        
    // skapa en grupp som container för grafen
    var chartGroup = canvas.append('g').attr("transform","translate("+ margin +","+ margin +")");

    // rita linjen
    chartGroup.append('path')
        .attr('fill', 'none')
        .attr('stroke', 'blue')
        .attr('d', dString(dataFix))
        .attr("transform","translate("+ chartWidth/months.length/2 +",0)");;

    // rita våra cirklar vid månaderna
    chartGroup.selectAll('dots').data(dataFix)
        .enter()
        .append('circle')
        .attr('cx', function(d) { return xScale(d.month)}) // använd våra skalor för att x och y ska hitta sina rätta platser
        .attr('cy', function(d) { return yScale(d.temp)})
        .attr('r', '4')
        .attr('fill', 'red')
        .attr("transform","translate("+ chartWidth/months.length/2 +",0)");
    
    // Rita axlar genom att .call på dom
    chartGroup.append('g').call(yAxis);
    chartGroup.append('g').call(xAxis).attr("transform","translate(0,"+ chartHeight +")");
    
    });
}