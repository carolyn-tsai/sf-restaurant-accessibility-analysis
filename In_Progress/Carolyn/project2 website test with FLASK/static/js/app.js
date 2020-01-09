// Create functions for word cloud visualization
// Create function for dog friendly restaurants
function dog_word_viz() {

    // Call json dog data using d3
    d3.json("/dog_restaurants_word_cloud").then(function(info) {
        
        //Anychart function for rendering the image
        anychart.onDocumentReady(function() {
          
          // Get data into correct format. For AnyChart, data must be in {"x" : name, "value" : value} format.
          var data = info;
          var list = []
          Object.entries(data).forEach(([key, value]) => {
              var dictionary = {}
              dictionary["x"] = key;
              dictionary["value"] = value;
              list.push(dictionary)
          });
      
          // Define all attributes for the word cloud
          var chart = anychart.tagCloud(list);
          var title = chart.title();
          title.text("Dog Friendly Restaurants");
          title.fontSize(25);
          title.enabled(true);
          chart.angles([0, -30, -60, 30, 60, 90]);

          // create and configure a color scale.
          var customColorScale = anychart.scales.linearColor();
          customColorScale.colors(["yellow", "red"]);
      
          // set the color scale as the color scale of the chart
          chart.colorScale(customColorScale);
      
          // add a color range
          chart.colorRange().enabled(true);
          chart.container("container");
          chart.draw();
        });
    });
};
        
// Create function for wheelchair accessible restuarants
function wc_word_viz() {

    // Call json dog data using d3
    d3.json("/wc_restaurants_word_cloud").then(function(info) {

        //Anychart function for rendering the image
        anychart.onDocumentReady(function() {

          // Get data into correct format. For AnyChart, data must be in {"x" : name, "value" : value} format.  
          var data = info;
          var list = []
          Object.entries(data).forEach(([key, value]) => {
              var dictionary = {}
              dictionary["x"] = key;
              dictionary["value"] = value;
              list.push(dictionary)
          });

          // Define all attributes for the word cloud          
          var chart = anychart.tagCloud(list);
          var title = chart.title();
          title.text("Wheelchair Accessible Restaurants");
          title.fontSize(25);
          title.enabled(true);
          chart.angles([0, -30, -60, 30, 60, 90]);
          
          // create and configure a color scale.
          var customColorScale = anychart.scales.linearColor();
          customColorScale.colors(["purple", "blue"]);
      
          // set the color scale as the color scale of the chart
          chart.colorScale(customColorScale);
      
          // add a color range
          chart.colorRange().enabled(true);
          chart.container("container");
          chart.draw();
        });
    });
};

// Create function for restaurants that are both dog friendly and wheelchair accessible
function both_word_viz() {

    // Call json dog data using d3
    d3.json("/both_restaurants_word_cloud").then(function(info) {

        //Anychart function for rendering the image
        anychart.onDocumentReady(function() {
          
          // Get data into correct format. For AnyChart, data must be in {"x" : name, "value" : value} format.  
          var data = info;
          var list = []
          Object.entries(data).forEach(([key, value]) => {
              var dictionary = {}
              dictionary["x"] = key;
              dictionary["value"] = value;
              list.push(dictionary)
          });

          // Define all attributes for the word cloud          
          var chart = anychart.tagCloud(list);
          var title = chart.title();
          title.text("Dog Friendly and Wheelchair Accessible Restaurants");
          title.fontSize(25);
          title.enabled(true);      
          chart.angles([0, -30, -60, 30, 60, 90]);
          
          // create and configure a color scale.
          var customColorScale = anychart.scales.linearColor();
          customColorScale.colors(["orange", "green"]);
      
          // set the color scale as the color scale of the chart
          chart.colorScale(customColorScale);
      
          // add a color range
          chart.colorRange().enabled(true);
          chart.container("container");
          chart.draw();
        });
    });
};


        
