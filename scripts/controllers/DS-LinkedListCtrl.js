angular.module('DiscoverDataStructsApp').controller('LinkedListCtrl', function($scope, VizConfigService){
	
  'use strict';

  /* LinkedList Methods To Show Off
  ** Add    (Adds a node to the end of list.) 
  ** Find   (Returns true if node with that data is found.)
  ** Remove (Removes a node with that data.)
  */

  var vizConfig             = VizConfigService.getConfig(),
      xPos                  = -30,
      linkedList = [],
      svgHeight;

  $scope.find = function() {


  };

  // Function for adding a node
  $scope.add = function(){
    xPos += 100;
    linkedList.push($scope.addText);
    updateViz();
  };

  svgHeight = 400;

  var svgContainer = d3.select('.visualization')
    .append('svg')
    .attr('width', '100%')
    .attr('height', svgHeight);

  var updateViz = function() {

    // Override a few of the default values
    vizConfig.xSpawnStart = -50;
    vizConfig.ySpawnStart = 150;
    vizConfig.yEnd        = 150;
    vizConfig.r           = 30;
    
    // DATA JOIN: bind linkedList data to the visualization
    var items = svgContainer.selectAll('g').data(linkedList);

    // ENTER new SVG groups to the visualization
    var newItems = items.enter().append('g')
      .attr('transform', 'translate(' + vizConfig.xSpawnStart + ',' + vizConfig.ySpawnStart + ')')

    // ENTER new circles to the new SVG groups
    newItems.append('circle')
      .attr('r', vizConfig.r)
      .attr('stroke-width', 3)
      .attr('stroke', vizConfig.strokeColor);

    // ENTER new text (provided by user) to the new SVG groups
    newItems.append('text')
      .text(function(d) { return d; })
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .attr('y', vizConfig.r / 4)


    // select all the circles
    var allNodes = d3.selectAll('circle');
    
    // Pop off the last one so we don't animate it.
    allNodes[0].pop();
    
    // if there is more than one node
    if (allNodes[0].length > 0) {
      // for each node in turn flash
      allNodes.each(function(d, index) {
        var currentNode = index;
        // flash white
        d3.select(this).transition()
          .delay(index * 100)
          .duration((vizConfig.duration / allNodes[0].length) / 2)
          .attr('r', function() {
            // small radius bump and BIG if it's last node in list
            if (currentNode >= allNodes[0].length - 1) {
              return vizConfig.r * 2; 
            } else {
              return vizConfig.r + 5  
            }
          })
          .attr('fill','white')
          // back to black
          .each('end', function() {
            d3.select(this).transition()
              .delay((index * 50) )
              .duration((vizConfig.duration / allNodes[0].length) / 2)
              .attr('fill', 'black')
              .attr('r', vizConfig.r);
          });
      });
    }

    // Animate the new SVG groups
    newItems.transition()
      .delay(allNodes.length * 100)
      .duration(vizConfig.duration)
      .ease('linear')
      .each('end', function(d) {
        d3.select(this).transition()
        .attr('transform', 'translate(' + xPos + ',' + vizConfig.ySpawnStart + ')')
      });
    

    // EXIT: Animate and remove old SVG groups
    var deadItems = items.exit();
    deadItems.transition()
      .delay(vizConfig.delay)
      .duration(vizConfig.duration)
      .ease('bounce')
      .attr('transform', 'translate(' + vizConfig.xStart + ',' + vizConfig.yStart + ')')
      .each('end', function() {
        deadItems.transition()
          .delay(vizConfig.delay)
          .remove();
      });
  };

});
