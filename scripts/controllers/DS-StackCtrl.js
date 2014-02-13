app.controller('StackCtrl', function($scope){
  'use strict';

  var stack = [],
    xPos = 15;

  $scope.push = function(){
    xPos += 35;
    stack.push($scope.inputText);
    updateViz();
  };

  $scope.pop = function(){
    if(xPos > 15){
      xPos -= 35;
    }
    stack.pop();
    updateViz();
  };

  var svgHeight = 400;

  var svgContainer = d3.select('.visualization')
    .append('svg')
    .attr("width", '100%')
    .attr("height", svgHeight);

  var updateViz = function(){
    var vizConfig = {
      'r': 25,
      'xStart': 200,
      'yStart': 50,
      'yEnd': 150,
      'delay': 200,
      'duration': 600
    };

    // DATA JOIN: bind stack data to the visualization
    var items = svgContainer.selectAll('g').data(stack);

    // ENTER new SVG groups to the visualization
    var newItems = items.enter().append('g')
      .attr('transform', 'translate(' + vizConfig.xStart + ',' + vizConfig.yStart + ')');

    // ENTER new circles to the new SVG groups
    newItems.append('circle')
      .attr('r', vizConfig.r)
      .attr('stroke-width', 3)
      .attr('stroke', '#008cba');

    // ENTER new text (provided by user) to the new SVG groups
    newItems.append('text')
      .text(function(d){ return d; })
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .attr('y', vizConfig.r / 4);

    // Animate the new SVG groups
    newItems.transition()
      .delay(vizConfig.delay)
      .duration(vizConfig.duration)
      .ease('bounce')
      .attr('transform', 'translate(' + xPos + ',' + vizConfig.yEnd + ')');

    // EXIT: Animate and remove old SVG groups
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
