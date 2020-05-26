function drawBoxPlot() {
    $.get("https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=10",function(data, status) {     
        var cryptoData = data.Data.Data;
        //console.log(cryptoData);
        //console.log(status);

        //console.log("test " + juData[0].high);

        var width = 800, height = 800, margin = 30;
        var chartWidth = width - (margin*2);
        var chartHeight = height - (margin*2);
        var barWidth = 40, barPadding = 5;
        var boxHeight = 50;
        var boxY = chartHeight-boxHeight;
        var lineY = boxY + boxHeight / 2;
        var cryptoValues = [];
        var timeSamples = [];
        //var maxV = [], minV = [], lQ = [], medianV = [], uQ = [];

        /*

        // våra kvartiler o median etc.
        for(i = 0; i < cryptoData.length; i++) {
            cryptoValues.push(cryptoData[i].open);
            maxV.push(cryptoData[i].high);
            minV.push(cryptoData[i].low);
            medianV.push(cryptoValues[i]);
            lQ.push( Math.round((cryptoValues[i]*0.25) * 100) / 100 );
            uQ.push( Math.round((cryptoValues[i]*0.75) * 100) / 100 );
            lQ.sort();
            uQ.sort();
            medianV.sort()
            timeSamples.push(cryptoData[i].time);
        }

        */

        for(i = 0; i < cryptoData.length; i++) {
            cryptoValues.push(cryptoData[i].open);
            timeSamples.push(cryptoData[i].time);
            cryptoValues.sort();
        }

        var minV = d3.min(cryptoValues);
        var maxV = d3.max(cryptoValues);
        var median = cryptoValues[ Math.floor(cryptoValues.length * 0.5)];
        var lQ = cryptoValues[ Math.floor(cryptoValues.length * 0.25) ];
        var uQ = cryptoValues[ Math.floor(cryptoValues.length * 0.75) ];

        console.log(maxV)
        console.log(minV)


        console.log(cryptoValues);

        var minTime = d3.min(timeSamples);
        var maxTime = d3.max(timeSamples);

        var xScale = d3.scaleLinear()
            .domain([minTime, maxTime])
            .range([0, chartWidth]);

        var xAxis = d3.axisBottom(xScale);

        var yScale = d3.scaleLinear()
            .domain([maxV, minV])
            .range([0, chartHeight]);
        
        var yAxis = d3.axisRight(yScale);


        var canvas = d3.select('body').append('svg')
            .attr('width', width)
            .attr('height', height);

        var boxGroup = canvas.append('g')
            .attr("transform","translate(0,0)");

        // rita en linje från min till maxvärdet
        boxGroup.append('line')
            .attr('width', 5)
            .attr('stroke', 'black')
            .attr('x1', xScale(minV))
            .attr('x2', xScale(maxV))
            .attr('y1', lineY)
            .attr('y2', lineY);
    
        boxGroup.append('rect')
            .attr('class', 'boxes')
            .attr('width', 50) 
            .attr('height',  xScale(uQ) - xScale(lQ) + 40)
            .attr('fill','gray')
            .attr('stroke', 'black')
            .attr('x', xScale(timeSamples[3]))
            .attr('y', yScale(cryptoValues[3]));

            console.log(yScale(uQ) - yScale(lQ))

            // rita en linje vertikalt vid minsta värdet
        boxGroup.append('line')
            .attr('width', 5)
            .attr('stroke', 'black')
            .attr('x1', xScale(minV))
            .attr('x2', xScale(minV))
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
                .attr('x1', xScale(maxV))
                .attr('x2', xScale(maxV))
                .attr('y1', boxY + 10)
                .attr('y2', boxY + boxHeight - 10);

        // Rita ut axeln
        boxGroup.append('g').call(xAxis);
        boxGroup.append('g').call(yAxis);

    });    
};