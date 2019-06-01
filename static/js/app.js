function buildMetadata(sample) {
  var url = `/metadata/${sample}`;
  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    d3.json(url).then(function(sample) {
    console.log(sample);

    // Use d3 to select the panel with id of `#sample-metadata`
      var table = d3.select("#sample-metadata");
      console.log(metadata);
      // Use `.html("") to clear any existing metadata
      table.html("");

      // Use `Object.entries` to add each key and value pair to the panel
      Object.entries(sample).forEach(function([key, value]) {
        var row = table.append("p");
        row.text(`${key}: ${value}`);
      });

    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
};

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json(url).then(function(data){
    console.log(data);

  // need data 
  var labels= data["otu_label"];
  var y_values= data["sample_values"];
  var x_values= data.["otu_id"];
  var marker= data["sample_values"];

    // @TODO: Build a Bubble Chart using the sample data 
    // var trace 
  var url = `/samples/${sample}`;
  d3.json(url).then(function(data){
    var trace1 = {
      labels = data["otu_label"],
      y_values=data["sample_values"],
      x_values= data["otu_id"],
      marker= data["sample_values"],
      ids: data["otu_id"],
      text: data["otu_label"],
      mode: "markers",
      type: "bubble"
      color: labels,
      size: marker,

  }
  var data = trace1
});
var layout = {
  title: "Belly Button Biodiversity",
  xaxis: {title: "OTU IDs"}
};

Plotly.newPlot("bubble", data, layout);

};
    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
    var trace2 = {
      labels = data["otu_label"].splice(0,10),
      y_values=data["sample_values"].splice(0,10),
      x_values= data["otu_id"].splice(0,10)
    };


function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
