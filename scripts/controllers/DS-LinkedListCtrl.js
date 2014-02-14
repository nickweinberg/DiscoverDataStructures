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
      .attr('transform', 'translate(' + vizConfig.xStart + ',' + vizConfig.yStart + ')');

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

    // Animate the new SVG groups
    newItems.transition()
      .delay(vizConfig.delay)
      .duration(vizConfig.duration)
      .ease('linear')
      // Should animate from left to right over each element
      // Pausing at each one * Checking if it can go there *.
      .each('end', function() {
        // select all nodes
        var allNodes = d3.selectAll('g');

        var makeNodeBlink = function (currentNode, index) {
          d3.select(currentNode).transition()
            // blink white
            .duration(100)
            .delay( 75 * index) // interval goes up by index for cascading effect
            .attr('fill', 'white')
            .each('end', function() {
              // back to black
              d3.select(currentNode).transition()
                .duration(100)
                .attr('fill', 'black');
            });
        };
        
        // make each one blink in turn
        allNodes.each(function(d, index) {
          makeNodeBlink(this, index);
        });
        
      })
      .attr('transform', 'translate(' + xPos + ',' + vizConfig.yEnd + ')');
      /*
      .each('end', function(d) {
        // callback to fall down into correct spot
        d3.select(this).transition()
          .delay(vizConfig.delay)
          .duration(vizConfig.duration)
          .ease('bounce')
          .attr('transform', 'translate(' + xPos  + ',' + vizConfig.yEnd + ')');
      });
      */


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
