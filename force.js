function drawForce() {
    d3.json('nodes.json', function(jsonData) {

        var width = 400, height = 400;

        var  gravityCenterX = width/2, gravityCenterY = height/2;

        var canvas = d3.select('body').append('svg')
            .attr('width', width)
            .attr('height', height);

        

        // skapa noder (cirklar) med namn
        var node = canvas.append('g').selectAll('nodes').data(jsonData.nodes)
            .enter().append('ellipse')
            .attr('cx', 100)
            .attr('cy', 100)
            .attr('rx', 40)
            .attr('ry', 20)
            .attr('stroke', 'black')
            .attr('fill', 'lightgrey')
            .on('mouseover', overHandler)
            .on('mouseout', outHandler);
        
        var labels = canvas.append('g').selectAll('labels').data(jsonData.nodes)
            .enter().append('text')
            .attr('text-anchor', 'middle')
            .attr('x', 100)
            .attr('y', 100)
            .text(function(data) { return data.name});

        // definiera en kraft (gravity)
        var simulation = d3.forceSimulation()
            // manybody simulerar gravity (pull together) eller electrostatic charge (repulsion)
            .force("charge", d3.forceManyBody().strength(-30) )
            //centreringskraften skuffar alla noder mot mitten
            .force("center", d3.forceCenter(gravityCenterX, gravityCenterY) )

        // vi måste starta vår simulation och köra den on("tick")
        simulation.nodes(jsonData.nodes).on("tick", tickHandler);

        //vad ska göras varje tick när vi animerar?
        function tickHandler() {
            // x och y för ellipserna ska ändra i och med kraften
            node
                .attr('cx', function(data) { return data.x })
                .attr('cy', function(data) { return data.y })

            labels
                .attr('x', function(data) { return data.x })
                .attr('y', function(data) { return data.y + 5 })
        };

        function overHandler() {
            d3.select(this).append("title").text(function(d) { return d.name })
                .attr('class','ellipse-title');
        };

        function outHandler() {
            d3.select('.ellipse-title').remove();
        };

    });
}