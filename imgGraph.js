var isDrawn = false;
function drawChart() {
    // definiera våra variabler vi skickar in
var iData = getImage(); //console.log(iData);
var rData = {}, gData = {}, bData = {};

for (var i = 0; i < 256; i++) {
    rData[i] = 0;
    gData[i] = 0;
    bData[i] = 0;
}

// loopa genom vår bild data för att tillsätta de respektive värden för r, g och b
for(var i = 0; i < iData.length; i+=4) {
    rData[iData[i]]++;
    gData[iData[i+1]]++;
    bData[iData[i+2]]++;
    // OBS! Jag/Vi skiter i alpha-kanalen, obviously
}

if(isDrawn) {
    d3.selectAll('g.chartGroup').remove(); 
    isDrawn = false;
}

drawHistogram({rData, bData, gData});

    function drawHistogram(data) {

        var width = 800, height = 600, margin = 40;
        var chartWidth = width-(margin*2), chartHeight = height-(margin*2);
        
        d3.select('svg').remove('staplar');

        // skapa ritunderlag
        var canvas = d3.select('body')
            .append('svg')
            .attr('width', width)
            .attr('height', height);
        
        function sortColor(data, color) {
            //var data = Object.keys(data.rData).map(function(key){ return {freq:data.rData[key] + data.gData[key] + data.bData[key], idx:+key}});
            var data = Object.keys(data).map(function(key){ return {frekvens:data[key], cValue:+key}});
        
            //var data = Object.keys(dataFixed).map(function(key){ return {freq:dataFixed[key], idx:+key}});
            console.log(data);


        //var data = Object.keys(d).map(function(key){ return {freq:d[key], idx:+key}});
        //console.log(data);

            // färgskalan
            var xScale = d3.scaleLinear()
                .domain([0, d3.max(data, function(d) { return d.cValue; })])
                .range([0, chartWidth]);

            // frekvens
            var yScale = d3.scaleLinear()
                .domain([0, d3.max(data, function(d) { return d.frekvens; })])
                .range([chartHeight, 0]);

            // vi skapar våra axlar
            var yAxis = d3.axisLeft(yScale);
            var xAxis = d3.axisBottom(xScale).ticks(5, 's');
            
            var chartGroup = canvas.append('g')
                .attr('transform','translate(' + margin*2 + ',' + margin +')')
                .attr('class', 'chartGroup');

            // rita ut våra virtuella staplar + animering som extra
            chartGroup.selectAll('staplar').data(data)
                .enter()
                .append('rect')
                .attr('class', 'stapel'+color)
                .attr('fill', color)
                // animering start
                .transition()
                .attr('y', function(d) { return yScale(d.frekvens)})
                .attr('height', function(d) { return chartHeight - yScale(d.frekvens)})
                .delay(function(d,i){ return(i*5)})
                // animering slut
                .attr('x', function(d) { return xScale(d.cValue); })
                .attr('y', function(d) { return yScale(d.frekvens); })
                .attr('width', 2)
                .attr('opacity', 0.33)
                .attr('height', function(d) { return chartHeight - yScale(d.frekvens); });

                // vi vill inte att y-axeln ritas om flera gånger per bilduppladdning, vi vill uppdatera den och ta bort den äldre
            if(!isDrawn) {
                chartGroup.append('g').call(yAxis)
                    .attr('class','y-axis');
                isDrawn = true;
            }
                
            chartGroup.append('g').call(xAxis).attr('transform','translate(0,'+ chartHeight +')');

        }
        sortColor(data.rData, 'red');
        sortColor(data.gData, 'green');
        sortColor(data.bData, 'blue');
    }

};