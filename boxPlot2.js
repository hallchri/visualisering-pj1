//window.onload = redraw();
var cryptoData = [];
function redraw() {
    var currency = "";
    var dateFrom = 0;
    var dateTo = 0;
    var dateButton = document.getElementById('submit-date');
    

    dateButton.addEventListener('click', function() {
        currency = document.getElementById('currency-list');
        currency = currency.value;
        dateFrom = new Date(Date.parse(document.getElementById('start-date').value));
        dateTo = new Date(Date.parse(document.getElementById('end-date').value));
        var diff = (dateTo.getTime() - dateFrom.getTime()) / (1000 * 60 * 60 * 24);
        //console.log(diff);

        $.get("https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=" + currency + "&limit=" + diff + "&toTs=" + ((Date.parse(document.getElementById('end-date').value)) / 1000) + "",function(data, status) { 
            d3.select('.canvas').remove();
            console.log(data);
            cryptoData = data.Data.Data;
            var date = new Date(data.Data.Data[data.Data.Data.length - 1].time * 1000);
            console.log("datum " + date);
            console.log(lineIsDrawn);
            console.log(boxIsDrawn);
            redraw();
        });
    });

    var lineIsDrawn = false;
    var boxIsDrawn =  false;

function drawChart() {
        var width = 800, height = 800, margin = 30;
        var chartWidth = width - (margin*2);
        var chartHeight = height - (margin*2);
        var yMargin = 500;
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
        console.log("min " + min);
        console.log("max " + max);
        console.log("tid " + timeSamples);
        console.log("open " + cryptoValues);

        var minTime = d3.min(timeSamples);
        var maxTime = d3.max(timeSamples);

        var format = d3.timeFormat("%x");
        
        var xScale = d3.scaleLinear()
            .domain([minTime * 1000, maxTime * 1000])
            .range([0, chartWidth]);

        var xAxis = d3.axisTop(xScale)
            .ticks(5)
            .tickFormat(format)
            .tickPadding(20);

        var minY = min;
        var maxY = max;
        var yScale = d3.scaleLinear()
            .domain([minY - 1000, maxY + 1000])
            .range([chartHeight, 0]);
        
        var yAxis = d3.axisRight(yScale)
        .ticks(20)
        .tickPadding(20);

        var canvas = d3.select('body').append('svg')
            .attr('class', 'canvas')
            .attr('width', width)
            .attr('height', height);

        var chartGroup = canvas.append('g')
            .attr("transform","translate(50,50)");

        
        // Rita ut axeln
        chartGroup.append('g').call(xAxis);
        chartGroup.append('g').call(yAxis);

        var lineButton = document.getElementById('line-button');
        lineButton.addEventListener('click', function() {
            if(!lineIsDrawn) {
                d3.select('.box-group').remove();
                var lineGroup = chartGroup.append('g')
                    .attr('class','line-group');

                var path = d3.line()
                    .x( function(d,i) { return xScale(timeSamples[i] * 1000) } )
                    .y( function(d,i) { return yScale(cryptoValues[i]) } );

                lineGroup.append('path')
                    .attr('fill','none')
                    .attr('stroke','blue')
                    .attr('d', path(cryptoData));
            }
                lineIsDrawn = true;
                boxIsDrawn = false;
        });

        var boxButton = document.getElementById('box-button');
        boxButton.addEventListener('click', function() {
            if(!boxIsDrawn) {
                d3.select('.line-group').remove();
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
                
                // rita själva rektangeln
                boxGroup.append('rect')
                    .attr('class', 'boxes')
                    .attr('width', boxWidth)
                    .attr('height', (yScale(lQ) - yScale(uQ)))
                    .attr('fill','gray')
                    .attr('stroke', 'black')
                    .attr('x', chartWidth/2)
                    .attr('y', yScale(uQ));

                // rita en linje vertikalt vid minsta värdet
                boxGroup.append('line')
                    .attr('class', 'line-vert-min')
                    .attr('width', 5)
                    .attr('stroke', 'black')
                    .attr('x1', chartWidth/2)
                    .attr('x2', chartWidth/2 + boxWidth )
                    .attr('y1', yScale(min))
                    .attr('y2', yScale(min));
                    
                // rita en linje vid medianen
                boxGroup.append('line')
                    .attr('width', 5)
                    .attr('stroke', 'black')
                    .attr('x1', chartWidth/2)
                    .attr('x2', chartWidth / 2 + boxWidth)
                    .attr('y1', yScale(median))
                    .attr('y2', yScale(median));

                // rita en linje vid max värdet
                boxGroup.append('line')
                    .attr('width', 5)
                    .attr('stroke', 'black')
                    .attr('x1', chartWidth/2)
                    .attr('x2', chartWidth/2 + boxWidth)
                    .attr('y1', yScale(max))
                    .attr('y2', yScale(max));
            }
                boxIsDrawn = true;
                lineIsDrawn = false;
            });
        }
        drawChart();
    };
