function drawHistogram() {
    // läs in extern json data (d3v5)
    d3.json('basketPlayers.json').then(function(jsonData) {
    
    var width = 600, height = 300, margin = 30;
    var chartWidth = width - (margin*2);
    var chartHeight = height - (margin*2);
    var barWidth = 40, barPadding = 5;
    
    // ladda in datan
    var heights = [], names = [];
    for(i = 0; i<jsonData.basketplayers.length; i++) {
        heights.push(jsonData.basketplayers[i].size);
        names.push(jsonData.basketplayers[i].name);
    }
    console.log(names);
    console.log(heights);

    // TODO: skapa klasser (eng. bins) enligt längder (170-179 osv)
    var klasser = ["170-179", "180-189", "190-199", "200-209", "210-219", "220-229", "230-239"];
    // Ändra y-axeln till frekvenser (hur många är 170 - 179)
    var frekvenser = []; // spara antalet spelare av en viss längd här
    var klassStorlek = 10; // binsize 160-169
    var klass = 170; // variabel håller koll på vilken klass vi är i (börjar med minsta)
    var antalKlasser = klasser.length // hur många kategorier har vi

    // räkna antalet spelare i varje längdklass
    for (i = 0; i < antalKlasser; i++) {
        var frekvens = 0; // iterand som räknar hur många som hör till en klass
        for (j=0; j < heights.length; j++) {
            // kolla om längden hör till nuvarande klassen
            if(heights[j] >= klass && heights[j] < klass+klassStorlek) {
                frekvens++;
            }
        }
        klass += klassStorlek;
        frekvenser.push(frekvens);
    }

    console.log(klasser);
    console.log(frekvenser);

    // skapa ritunderlag
    var canvas = d3.select('body').append('svg')
        .attr('width', width)
        .attr('height', height);

    // skapa x och y skalor
    
    var xScale = d3.scaleBand()
        .domain(klasser)
        .range([0, chartWidth]);

    var yScale = d3.scaleLinear()
        .domain([d3.max(frekvenser), 0])
        .range([0, chartHeight]);

    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    var histogramGroup = canvas.append('g')
        .attr("transform","translate("+ margin + "," + margin + ")");

    histogramGroup.selectAll('staplar').data(frekvenser)
        .enter().append('rect')
        .attr('x', function(d, i) { return i * (chartWidth / antalKlasser) + barWidth/2})
        .attr('y', function(d, i) { return yScale(d) })
        .attr('width', barWidth)
                                                // Vi börjar tvärtom: vi börjar med
                                                // grafens höjd och tar bort den data
                                                // som är "rest" för den fulla höjden
                                                // t.ex. 300 - Markkanen (203) = 97 vilket resulterar i 203
        .attr('height', function(d, i) { return chartHeight - yScale(d) });

        histogramGroup.append('g').call(xAxis).attr("transform","translate(0,"+ chartHeight +")");
        histogramGroup.append('g').call(yAxis);
    });
};