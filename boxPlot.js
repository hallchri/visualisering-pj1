function drawBoxPlot() {
     // läs in extern json data (d3v5)
    d3.json('boxPlot.json').then(function(jsonData) {
    
        var width = 600, height = 300, margin = 30;
        var chartWidth = width - (margin*2);
        var chartHeight = height - (margin*2);
        var barWidth = 40, barPadding = 5;
        
        // ladda in datan
        var temps = [];
        for(i = 0; i<jsonData.temperatures.length; i++) {
            temps.push(jsonData.temperatures[i].temp);
        }
        console.log(temps);
    });
    
};