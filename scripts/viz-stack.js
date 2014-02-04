(function(){

  var stack = [],
    xPos = 5;

  var push = function(){
    xPos += 25;
    var input = $('.stack-input').val();
    stack.push(input);
    updateViz();
    // TODO: animate pushed item landing on the page out of no where
    // before it gets added to the rest of the circles in the viz
  };
  $('.add-btn').click(push);

  var pop = function(){
    if(xPos > 5){
      xPos -= 25;
    }
    stack.pop();
    updateViz();
  };
  $('.remove-btn').click(pop);

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
    var circles = svgContainer.selectAll('circle').data(stack);
    var newCircles = circles.enter().append('circle')
         .attr('cx', vizConfig.xStart)
         .attr('cy', vizConfig.yStart)
         .attr('r', vizConfig.r)
         .attr('stroke-width', 3)
         .attr('stroke', '#008cba');
    newCircles.transition()
              .delay(vizConfig.delay)
              .duration(vizConfig.duration)
              .attr('cx', xPos)
              .attr('cy', vizConfig.yEnd);
    circles.exit().remove(); // TODO: animate removal?

    var text = svgContainer.selectAll('text').data(stack);
    var newText = text.enter().append('text')
         .text(function(d){ return d; })
         .attr('text-anchor', 'middle')
         .attr('fill', 'white')
         .attr('x', vizConfig.xStart)
         .attr('y', vizConfig.yStart + (vizConfig.r / 4));
    newText.transition()
         .delay(vizConfig.delay)
         .delay(vizConfig.duration)
         .attr('x', xPos)
         .attr('y', vizConfig.yEnd + (vizConfig.r / 4));
    text.exit().remove();
  };

}());
