import React, { useEffect } from 'react';
import * as d3 from 'd3';

const Visualization = () => {
    useEffect(() => {
        d3.json('../data/tree.json').then(data => {
            const width = 1000;
            const height = 1000;
            
            var tip = d3.tip()
                .attr('class', 'd3-tip')
                .offset([-10, 0])
                .style('background', 'white')
                .html(d => `<strong>${d.title}</strong><br><small>${d.description}</small>`);
            
            var simulation = d3.forceSimulation(data.nodes)
                .force('link', d3.forceLink(data.edges)
                    .id(d => d.id)
                    .distance(d => d.type === 0 ? 50 : 100))
                .force('charge', d3.forceManyBody().strength(0))
                .force('center', d3.forceCenter(width / 2, height / 2))
                .force('collide', d3.forceCollide().radius(15));
        
            var svg = d3.select('svg')
                .attr('width', width)
                .attr('height', height)
                .call(tip);
        
            var link = svg.selectAll('.link')
                .data(data.edges)
                .enter().append('line')
                .attr('class', 'link')
                .style('stroke', 'black'); 
        
            var color = d3.scaleOrdinal(d3.schemeCategory10);
            var selectedNodes = new Set();
            selectedNodes.add(data.nodes[0].id);
        
            var nodes = svg.selectAll('.node')
                .data(data.nodes)
                .enter().append('circle')
                .attr('class', 'node')
                .attr('r', 10)
                .attr('stroke', d => color(d.id.substring(0, 3)))
                .attr('stroke-width', 5)
                .attr('fill', d => d.id === data.nodes[0].id ? 'gold' : 'transparent')
                .on('mouseover', tip.show)
                .on('mouseout', tip.hide)
                .on('click', function(d) {
                    if (d.id !== data.nodes[0].id) {
                        var linked = data.edges.some(e =>
                            selectedNodes.has(e.source.id) && e.target.id === d.id ||
                            selectedNodes.has(e.target.id) && e.source.id === d.id
                        );
                        if (linked) {
                            selectedNodes.add(d.id);
                            d3.select(this).attr('fill', 'gold');       
                        }
                    }
                });
        
            // var nodeLabels = svg.selectAll('.node-label')
            //     .data(data.nodes)
            //     .enter().append('text')
            //     .attr('class', 'node-label')
            //     .attr('dx', 0)
            //     .attr('dy', '-1em')
            //     .style('text-anchor', 'middle')
            //     .style('font-size', '.8rem')
            //     .text(d => d.title);
        
            simulation.on('tick', () => {
                link.attr('x1', d => d.source.x)
                    .attr('y1', d => d.source.y)
                    .attr('x2', d => d.target.x)
                    .attr('y2', d => d.target.y);
        
                nodes.attr('cx', d => d.x)
                    .attr('cy', d => d.y);
        
                // nodeLabels.attr('x', d => d.x)
                //     .attr('y', d => d.y);
            });
        
            // statically position all the nodes
            data.nodes[0].fx = width / 2;
            data.nodes[0].fy = height / 2;
            var fixedNodeValues = [
                {radius: 50, num: 5},
                {radius: 100, num: 10},
                {radius: 150, num: 10},
                {radius: 200, num: 10}
            ];
            let nodeIndex = 1;
            let lastAngleStep = 0;
            for(let n in fixedNodeValues) {
                let angleStep = 2 * Math.PI / fixedNodeValues[n].num;
                let num = fixedNodeValues[n].num
                let radius = fixedNodeValues[n].radius;
                for(let i = 0; i < num; i++) {
                    data.nodes[nodeIndex + i].fx = width / 2 + radius * Math.cos(i * angleStep - lastAngleStep / 4);
                    data.nodes[nodeIndex + i].fy = height / 2 + radius * Math.sin(i * angleStep - lastAngleStep / 4);
                }
                nodeIndex += num;
                console.log(fixedNodeValues[+n + 1]);
                if(fixedNodeValues[+n + 1] && num < fixedNodeValues[+n + 1].num) lastAngleStep = angleStep;
            }
            
        });
    }, []);

    return (
        <div id="skilltree"></div>
    );
}

export default Visualization;