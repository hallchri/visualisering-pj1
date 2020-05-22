function drawForce() {
    d3.json('nodes.json', function(jsonData) {

        var width = 400, height = 400;

        var canvas = d3.select('body').append('svg')
            .attr('width', width)
            .attr('height', height);

        

        // skapa noder (cirklar) med namn
        var node = canvas.append('g').selectAll('nodes').data(jsonData.nodes)
            .enter().append('ellipse')
            .attr('cx', 100)
            .attr('cy', 100)
            .attr('rx', 20)
            .attr('ry', 15)
            .attr('stroke', 'black')
            .attr('fill', 'lightgrey');
        
    });
}