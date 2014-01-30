(function(){

  var svgContainer = d3.select('visualization').append('svg');

  var updateViz = function(data){
    var items = svgContainer.selectAll('.item').data(data);
  };

}());
