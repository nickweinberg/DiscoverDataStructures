(function(){

  var stack = [],
    xPos = 5;

  var push = function(){
    xPos += 25;
    var input = $('.stack-input').val();
    stack.push(input);
    updateViz();
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

    var items = svgContainer.selectAll('g').data(stack);

    var newItems = items.enter().append('g')
      .attr('transform', 'translate(' + vizConfig.xStart + ',' + vizConfig.yStart + ')');

    var circles = newItems.append('circle')
      .attr('r', vizConfig.r)
      .attr('stroke-width', 3)
      .attr('stroke', '#008cba');

    var text = newItems.append('text')
      .text(function(d){ return d; })
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .attr('y', vizConfig.r / 4);

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

}());
