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

  var svgWidth = 400;
  var svgHeight = 400;

  var svgContainer = d3.select('.visualization')
                       .append('svg')
                       .attr("width", svgWidth)
                       .attr("height", svgHeight);

  var updateViz = function(){
    var vizConfig = {
      'yPos': 50,
      'r': 20
    };
    var items = svgContainer.selectAll('circle').data(stack);
    var enter = items.enter();
    enter.append('circle')
         .attr('cx', xPos)
         .attr('cy', vizConfig.yPos)
         .attr('r', vizConfig.r)
         .attr('stroke-width', 3)
         .attr('stroke', '#008cba');
    var exit = items.exit();
    exit.remove();  // TODO: animate removal?

    items = svgContainer.selectAll('text').data(stack);
    enter = items.enter();
    enter.append('text')
         .text(function(d){ return d; })
         .attr('text-anchor', 'middle')
         .attr('x', xPos)
         .attr('y', vizConfig.yPos + (vizConfig.r / 4))
         .attr('fill', 'white');
    exit = items.exit();
    exit.remove();
  };

}());
