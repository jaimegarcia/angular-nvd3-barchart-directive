angular.module('nvd3BarChartDirective', [])
  /**
   *  Directive for creating a Discrete Bar Chart
   *  HTML USE: Agregar en Jade lo siguiente
   *  <div id="<chartId>" nvd3-discrete-bar-chart datajson="'<file.json>'"></div>

   *  @chartId {string} Unique Chart Id
   *  @datajson {json}  JSON with graphica Data: Format: {x:,y:}
   *
   */
  .directive('nvd3DiscreteBarChart', function(){
    return {
      restrict: 'A',
      scope: {
        datajson: '='
      },
      link: function (scope, elem, attrs) {

        nv.addGraph(function() {
          var chart = nv.models.discreteBarChart()
              .x(function(d) { return d[d3.keys(d)[0]]; })//d.label
              .y(function(d) { return d[d3.keys(d)[1]]; })//d.value
              .staggerLabels(true)
              .tooltips(false)
              .showValues(true)
              .transitionDuration(250);

          //Load Json
          d3.json(scope.datajson, function(error, data) {

            //Nest Json to datum format
            var dataNested = d3.nest()
              .key(function(d) { return "discrete barchart"; })
              .entries(data);

            d3.select("#"+elem[0].id).append("svg")
              .datum(dataNested)
              .call(chart);

            nv.utils.windowResize(chart.update);

            return chart;
          });
        });
      }
    }
  });


