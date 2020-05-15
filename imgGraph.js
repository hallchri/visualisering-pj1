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

console.log(rData);
console.log(gData);
console.log(bData);

console.log(iData);

drawHistogram({rData, bData, gData});

    function drawHistogram(d) {

        var dataFixed = [];
        var width = 800, height = 600, margin = 40;
        //var svg = d3.select('svg');

        width -= margin;
        height -= margin;

        // skapa ritunderlag

        var canvas = d3.select('body')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .style('background','cyan');

        //canvas.selectAll('staplar')

        var rDataFixed = Object.keys(d.rData).map(function(key){ return {freq:d.rData[key], idx:+key}});
        var gDataFixed = Object.keys(d.gData).map(function(key){ return {freq:d.gData[key], idx:+key}});
        var bDataFixed = Object.keys(d.bData).map(function(key){ return {freq:d.bData[key], idx:+key}});
        dataFixed.push(rDataFixed, gDataFixed,bDataFixed);
        console.log(dataFixed);


        // färgskalan
        var xScale = d3.scaleLinear()
            .domain([0, d3.max(dataFixed, function(d) { return d.idx; })])
            .range([0, width]);

        var yScale = d3.scaleLinear()
            .domain([0, d3.max(dataFixed, function(d) { return d.freq; })])
            .range([height, 0]);
    }

};