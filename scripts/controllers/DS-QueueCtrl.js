angular.module('DiscoverDataStructsApp').controller('QueueCtrl', function($scope){
  'use strict';

  var queue = [],
    xPos = 15;

  $scope.enqueue = function(){
    xPos += 25;
    queue.push($scope.inputText);
    updateViz();
  };

  $scope.dequeue = function(){
    if(xPos > 15){
      xPos -= 25;
    }
    queue.shift();
    updateViz();
  };

  var svgHeight = 400;

  var svgContainer = d3.select('.visualization')
    .append('svg')
    .attr("width", '100%')
    .attr("height", svgHeight);

  var updateViz = function(){
    var vizConfig = {
      'r': 20,
      'xStart': 200,
      'yStart': 50,
      'yEnd': 150,
      'delay': 200,
      'duration': 600
    };

    var items = svgContainer.selectAll('g').data(queue);

    var newItems = items.enter().append('g')
      .attr('transform', 'translate(' + vizConfig.xStart + ',' + vizConfig.yStart + ')');

    var newCircles = newItems.append('circle')
      .attr('r', vizConfig.r)
      .attr('stroke-width', 3)
      .attr('stroke', '#008cba');

    var newValText = newItems.append('text')
      .text(function(d){ return d; })
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .attr('y', vizConfig.r / 4);

    var newPointerText = newItems.append('text')
      .attr('class', 'pointerText')
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .attr('y', vizConfig.r * 2);

    // Update pointerText to correctly label the head and tail of the queue
    var pointerText = items.select('.pointerText')
      .text(function(d, i){
        var pointerName = '';
        if(i === 0){
          pointerName += ' [head]';
        }
        if(i === queue.length - 1){
          pointerName += ' [tail]';
        }
        return pointerName;
      });

    newItems.transition()
      .delay(vizConfig.delay)
      .duration(vizConfig.duration)
      .ease('bounce')
      .attr('transform', 'translate(' + xPos + ',' + vizConfig.yEnd + ')');

    var deadItems = items.exit();
    deadItems.transition()
      .delay(vizConfig.delay)
      .duration(vizConfig.duration)
      .ease('bounce')
      .attr('transform', 'translate(' + vizConfig.xStart + ',' + vizConfig.yStart + ')')
      .each('end', function(){
        deadItems.transition()
          .delay(vizConfig.delay)
          .remove();
      });
  };

});
