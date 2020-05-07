function drawChart() {
    // Importera data från extern csv fil
    
    //d3.csv("lineData.csv").get(function(error,data) {
        //console.log(data);
        
    //});

    //d3 ES6 V5 SYNTAX
    //d3.csv("lineData.csv").then((data) => {
        //console.log(data);     
    //});

    // d3.v5 erbjuder .then metoden och promises
    d3.csv("lineData.csv").then(function(data) {
        var temps = [], months = [];

        // ladda in datan
        for(i = 0; i < data.length; i++) {
            months.push(data[i].Month);
            temps.push(data[i].Temp);
        }
        console.log(months);
        console.log(temps);
    });
}