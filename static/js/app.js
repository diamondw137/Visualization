function buildMetadata(sample) {
  var MetaData = `/metadata/${sample}`;
  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  d3.json(MetaData).then(function (bio_data) {
    // Use d3 to select the panel with id of `#sample-metadata`
    var bio_sample = d3.select("#sample-metadata");
    // Use `.html("") to clear any existing metadata
    bio_sample.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    Object.entries(bio_data).forEach(function ([key, value]) {
      var row = bio_sample.append("p");
      row.text(`${key}: ${value}`);
    });
  });
}


// Hint: Inside the loop, you will need to use d3 to append new
// tags for each key-value in the metadata.

// BONUS: Build the Gauge Chart
// buildGauge(data.WFREQ);

function buildCharts(sample) {
  var plots = `/samples/${sample}`;
  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json(plots).then(function (bubblesdata) {
    var labels = bubblesdata.otu_labels;
    var y_values = bubblesdata.sample_values;
    var x_values = bubblesdata.otu_ids;
    var marker_size = bubblesdata.sample_values;
    var marker_color = bubblesdata.otu_ids;

    // @TODO: Build a Bubble Chart using the sample data 
    d3.json(plots).then(function (bubblesdata) {
      var trace1 = {
        x: x_values,
        y: y_values,
        text: labels,
        mode: "markers",
        title: "Belly Button Biodiversity",
        marker: {
          color: marker_color,
          size: marker_size,
        }
      };

      var bubbles_chart = [trace1];

      Plotly.newPlot("bubble", bubbles_chart);

      // @TODO: Build a Pie Chart
      // HINT: You will need to use slice() to grab the top 10 sample_values,
      // otu_ids, and labels (10 each).
      d3.json(plots).then(function(pie_data) {
        var pie_text = pie_data.otu_labels.slice(0,10)
        var pie_values = pie_data.sample_values.slice(0,10)
        var pie_labels = pie_data.otu_ids.slice(0,10)
        var trace2 = [{
          values: pie_values,
          labels: pie_labels,
          hovertext: pie_text,
          type: "pie"
        }];

        Plotly.newPlot('pie', trace2);
      });
    });
  });
}

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
