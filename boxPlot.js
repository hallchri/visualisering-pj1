function drawBoxPlot() {
     // läs in extern json data (d3v5)
    d3.json('boxPlot.json').then(function(jsonData) {
    
        var width = 600, height = 150, margin = 30;
        var chartWidth = width - (margin*2);
        var chartHeight = height - (margin*2);
        var barWidth = 40, barPadding = 5;
        var boxHeight = 50;
        var boxY = chartHeight-boxHeight;
        var lineY = boxY + boxHeight / 2;

        
        // ladda in datan
        var temps = [];
        for(i = 0; i<jsonData.temperatures.length; i++) {
            temps.push(jsonData.temperatures[i].temp);
        }
        console.log(temps);

        // Vad behöver vi räkna för att kunna rita en boxplot
        var min = d3.min(temps);
        var max = d3.max(temps);
        // TODO: Om ojämnt antal, ta mittersta, om jämnt antal, räkna medeltal av de två mittersta
        var median = temps[ Math.floor(temps.length * 0.5)];
        var lq = temps[ Math.floor(temps.length * 0.25) ];
        var uq = temps[ Math.floor(temps.length * 0.75) ];

        console.log("min " + min);
        console.log("max " + max);
        console.log("median " + median);
        console.log("lq " + lq);
        console.log("uq " + uq);

        // skapa en x skala å x axel
        var xScale = d3.scaleLinear()
            .domain([min-5,max+5])
            .range([0, chartWidth]);
        
        var xAxis = d3.axisBottom(xScale);
        

        var canvas = d3.select('body').append('svg')
            .attr('width', width)
            .attr('height', height);

        // skapa en grupp som inte täcker hela ritunderlaget (använd margins)
        var boxGroup = canvas.append('g')
            .attr("transform","translate(0,0)");
        
        
        // rita en linje från min till maxvärdet
        boxGroup.append('line')
            .attr('width', 5)
            .attr('stroke', 'black')
            .attr('x1', xScale(min))
            .attr('x2', xScale(max))
            .attr('y1', lineY)
            .attr('y2', lineY);
        
        boxGroup.append('rect')
            .attr('width', xScale(uq) - xScale(lq))
            .attr('height', boxHeight)
            .attr('fill','gray')
            .attr('stroke', 'black')
            .attr('x', xScale(lq))
            .attr('y', boxY);

        // rita en linje vertikalt vid minsta värdet
        boxGroup.append('line')
            .attr('width', 5)
            .attr('stroke', 'black')
            .attr('x1', xScale(min))
            .attr('x2', xScale(min))
            .attr('y1', boxY + 10)
            .attr('y2', boxY + boxHeight - 10);
        
        // rita en linje vertikalt vid medianen
        boxGroup.append('line')
            .attr('width', 5)
            .attr('stroke', 'black')
            .attr('x1', xScale(median))
            .attr('x2', xScale(median))
            .attr('y1', boxY)
            .attr('y2', boxY + boxHeight);

        // rita en linje vertikalt vid max värdet
        boxGroup.append('line')
            .attr('width', 5)
            .attr('stroke', 'black')
            .attr('x1', xScale(max))
            .attr('x2', xScale(max))
            .attr('y1', boxY + 10)
            .attr('y2', boxY + boxHeight - 10);
         
        // Rita ut axeln
        boxGroup.append('g').call(xAxis);



    });
    
};