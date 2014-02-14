app.controller('StackCtrl', function($scope, VizConfigService){
  'use strict';

  var vizConfig = VizConfigService.getConfig();
  var xPos      = vizConfig.xPosStart;
  var stack     = [];

  $scope.push = function(){
    xPos += vizConfig.xPosIncrement;
    stack.push($scope.inputText);
    updateViz();
  };

  $scope.pop = function(){
    if(xPos > vizConfig.xPosStart){
      xPos -= vizConfig.xPosIncrement;
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
    // DATA JOIN: bind stack data to the visualization
    var items = svgContainer.selectAll('g').data(stack);

    // ENTER new SVG groups to the visualization
    var newItems = items.enter().append('g')
      .attr('transform', 'translate(' + vizConfig.xSpawnStart + ',' +
        vizConfig.ySpawnStart + ')');

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
      .attr('transform', 'translate(' + vizConfig.xSpawnStart + ',' +
        vizConfig.ySpawnStart + ')')
      .each('end', function(){
        deadItems.transition()
          .delay(vizConfig.delay)
          .remove();
      });
  };

});
