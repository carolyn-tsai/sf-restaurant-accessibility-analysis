
// Trace1 for the Wheel Chair Data
var trace1 = {
    x: data.map(row => row.neighborhood),
    y: data.map(row => row.wc_count),
    text: data.map(row => row.wc_count),
    name: "Wheel Chair",
    type: "bar"
};
  
// Trace 2 for the Dog Count Data
var trace2 = {
    x: data.map(row => row.neighborhood),
    y: data.map(row => row.dog_count),
    text: data.map(row => row.dog_count),
    name: "Dog Friendly",
    type: "bar"
};

// Trace 2 for the both Data
var trace3 = {
    x: data.map(row => row.neighborhood),
    y: data.map(row => row.both_count),
    text: data.map(row => row.both_count),
    name: "Both",
    type: "bar"
};
  
// Combining both traces
var data = [trace1, trace2, trace3];
  
// Apply the group barmode to the layout
var layout = {
    title: "Restaurants in San Francisco",
    barmode: "group",
    autosize: false,
    width: 1000,
    height: 700,
    margin: {
      l: 50,
      r: 50,
      b: 200,
      t: 100,
      pad: 4
    }
};
  
// Render the plot to the div tag with id "plotly-graph"
Plotly.newPlot("plotly-graph", data, layout);
  