angular.module('DiscoverDataStructsApp').controller('LinkedListCtrl', function($scope){
	
  'use strict';

  /* LinkedList Methods To Show Off
  ** Add    (Adds a node to the end of list.) 
  ** Find   (Returns true if node with that data is found.)
  ** Remove (Removes a node with that data.)
  */

  // Just gonna use an array of data instead of an actual LinkedList
  var linkedList = [],
      xPos = 5,
      svgHeight;

  // Function for adding a node
  // ex. while (current.next != null)
  //       current.next = current
  $scope.add = function(){
    xPos += 25;
    linkedList.push($scope.inputText);
    updateViz();
  };

  svgHeight = 400;

  var svgContainer = d3.select('.visualization')
    .append('svg')
    .attr('width', '100%')
    .attr('height', svgHeight);

  var updateViz = function() {
    var vizConfig = {
      'r'       : 20,
      'xStart'  : 30,
      'yStart'  : 100, // Starts right above first element
      'yEnd'    : 150, 
      'delay'   : 200,
      'duration': 600
    };

    // DATA JOIN: bind linkedList data to the visualization
    var items = svgContainer.selectAll('g').data(linkedList);

    // ENTER new SVG groups to the visualization
    var newItems = items.enter().append('g')
      .attr('transform', 'translate(' + vizConfig.xStart + ',' + vizConfig.yStart + ')')

    // ENTER new circles to the new SVG groups
    newItems.append('circle')
      .attr('r', vizConfig.r)
      .attr('stroke-width', 3)
      .attr('stroke', '#008cba');

    // ENTER new text (provided by user) to the new SVG groups
    newItems.append('text')
      .text(function(d) { return d; })
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .attr('y', vizConfig.r / 4) // Why divide by 4

    var allNodes = d3.selectAll('g');
    
    if (allNodes[0].length > 1) {
      // for each node in turn flash
      allNodes.each(function(d, index) {
        // flash white
        d3.select(this).transition()
          .ease('linear')
          .delay(index * 100)
          .duration((vizConfig.duration / allNodes[0].length) / 2)
          .attr('fill','white')
          // back to black
          .each('end', function() {
            d3.select(this).transition()
              .delay((index * 50) )
              .duration((vizConfig.duration / allNodes[0].length) / 2)
              .attr('fill', 'black');
          });
      });
    }
    // Animate the new SVG groups
    newItems.transition()
      .delay(allNodes.length * 100)
      .duration(vizConfig.duration)
      .ease('linear')
      // Should animate from left to right over each element
      // Pausing at each one * Checking if it can go there *.
      .attr('transform', 'translate(' + xPos + ',' + vizConfig.yStart + ')')
      .each('end', function(d) {
        // callback to fall down into correct spot
        d3.select(this).transition()
          .duration(vizConfig.duration)
          .ease('bounce')
          .attr('transform', 'translate(' + xPos  + ',' + vizConfig.yEnd + ')');

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
