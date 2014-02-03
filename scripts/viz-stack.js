(function(){
  var stack = [];

  var push = function(){
    var input = ''; // TODO; get string from input text field
    stack.push(input);
    updateViz();
    // TODO: animate pushed item landing on the page out of no where
    // before it gets added to the rest of the circles in the viz
  };

  var pop = function(){
    stack.pop();
    updateViz();
    // TODO: animate popped item being set aside
  };


  var svgWidth = 400;
  var svgHeight = 400;

  var svgContainer = d3.select('.visualization')
                       .append('svg')
                       .attr("width", svgWidth)
                       .attr("height", svgHeight);

  var updateViz = function(){
    var items = svgContainer.selectAll('circle')
                            .data(stack, String);

    items.enter().append('circle');

    items.exit().remove();
  };

}());
