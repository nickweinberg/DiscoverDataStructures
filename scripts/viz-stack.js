(function(){
  var svgWidth = 400;
  var svgHeight = 400;


  var svgContainer = d3.select('.visualization')
                       .append('svg')
                       .attr("width", svgWidth)
                       .attr("height", svgHeight);


  var updateViz = function(data){
    var items = svgContainer.selectAll('circle')
                            .data(data, String);

    items.enter().append('circle');

    items.exit().remove();
  };

  updateViz([1,2,3]);

}());
