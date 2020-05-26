lineIsDrawn = false;
boxIsDrawn =  false;

function drawChart() {
    $.get("https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=10",function(data, status) {   

        var cryptoData = data.Data.Data;
        var width = 800, height = 800, margin = 30;
        var chartWidth = width - (margin*2);
        var chartHeight = height - (margin*2);
        var boxWidth = 50;
        var boxX = chartWidth-boxWidth;
        var lineX = boxX + boxWidth / 2;
        var cryptoValues = [];
        var timeSamples = [];
        var maxV = [], minV = [], medianV = [];

        // våra kvartiler o median etc.
        for(i = 0; i < cryptoData.length; i++) {
            cryptoValues.push(cryptoData[i].open);
            maxV.push(cryptoData[i].high);
            minV.push(cryptoData[i].low);
            medianV.push(cryptoValues[i]);
            timeSamples.push(cryptoData[i].time);
        }

        medianV.sort()
        var median = medianV[ Math.floor(medianV.length * 0.5)];
        var lQ = medianV[ Math.floor(medianV.length *0.25)];
        var uQ = medianV[ Math.floor(medianV.length *0.75)];
        var min = d3.min(medianV);
        var max = d3.max(medianV);
        //var uQ = ( Math.round((cryptoValues.length *0.75) * 100) / 100 );
        console.log(median);
        console.log("lQ " + lQ);
        console.log("uQ " + uQ);
        console.log("min " + minV);
        console.log("max " + maxV);
        console.log("tid " + timeSamples);
        console.log("open " + cryptoValues);

        var minTime = d3.min(timeSamples);
        var maxTime = d3.max(timeSamples);

        var xScale = d3.scaleLinear()
            .domain([minTime - 100000, maxTime+100000])
            .range([0, chartWidth]);

        var xAxis = d3.axisBottom(xScale);

        var minY = d3.min(minV);
        var maxY = d3.max(maxV);
        var yScale = d3.scaleLinear()
            .domain([minY-1000, maxY])
            .range([chartHeight, 0]);
        
        var yAxis = d3.axisRight(yScale).ticks(20);

        var canvas = d3.select('body').append('svg')
            .attr('width', width)
            .attr('height', height);

        var chartGroup = canvas.append('g')
            .attr("transform","translate(0,0)");




        function drawBoxPlot() {

            if(lineIsDrawn) {
                d3.select('g.line-group').remove();
            }

            if(!boxIsDrawn) {
            var boxGroup = chartGroup.append('g')
                .attr('class', 'box-group');


                // rita en linje från min till maxvärdet
            boxGroup.append('line')
                .attr('width', 5)
                .attr('stroke', 'black')
                .attr('x1', chartWidth/2 + boxWidth / 2)
                .attr('x2', chartWidth/2 + boxWidth / 2)
                .attr('y1', yScale(min))
                .attr('y2', yScale(max));
        
            boxGroup.append('rect')
                .attr('class', 'boxes')
                .attr('width', boxWidth)
                .attr('height', yScale(median))
                .attr('fill','gray')
                .attr('stroke', 'black')
                .attr('x', chartWidth/2)
                .attr('y', yScale(uQ));

            // rita en linje vertikalt vid minsta värdet
            boxGroup
                .append('line')
                .attr('class', 'line-vert-min')
                .attr('width', 5)
                .attr('stroke', 'black')
                .attr('x1', chartWidth/2)
                .attr('x2', chartWidth/2 + boxWidth )
                .attr('y1', yScale(min))
                .attr('y2', yScale(min));
            
            // rita en linje vertikalt vid medianen
            boxGroup.append('line')
                .attr('width', 5)
                .attr('stroke', 'black')
                .attr('x1', chartWidth/2)
                .attr('x2', chartWidth / 2 + boxWidth)
                .attr('y1', yScale(median))
                .attr('y2', yScale(median));

            // rita en linje vertikalt vid max värdet
            boxGroup.append('line')
                .attr('width', 5)
                .attr('stroke', 'black')
                .attr('x1', chartWidth/2)
                .attr('x2', chartWidth/2 + boxWidth)
                .attr('y1', yScale(max))
                .attr('y2', yScale(max));

                boxIsDrawn = true;
                lineIsDrawn = false;
            }

        };


        function drawLineChart() {
            
            if(boxIsDrawn) {
                d3.select('g.box-group').remove();
            }

            if(!lineIsDrawn) {

            var lineGroup = chartGroup.append('g')
                .attr('class','line-group');

            var path = d3.line()
                .x( function(d,i) { return xScale(timeSamples[i]) } )
                .y( function(d,i) { return yScale(cryptoValues[i]) } );

            lineGroup.append('path')
                .attr('fill','none')
                .attr('stroke','blue')
                .attr('d', path(cryptoData));

                lineIsDrawn = true;
            }

            boxIsDrawn = false;

        };

        // Rita ut axeln
        chartGroup.append('g').call(xAxis);
        chartGroup.append('g').call(yAxis);

        var lineButton = document.getElementById('lineButton');
        lineButton.addEventListener('click', drawLineChart);

        var boxButton = document.getElementById('boxButton');
        boxButton.addEventListener('click', drawBoxPlot);

    });    
};
