// Assigning the JSON link to a constant
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and console log it
const dataPromise = d3.json(url);
console.log("Data Promise:", dataPromise);

// Retrieving data required
d3.json(url).then(function(data) {
  console.log(data); // Logging data in the console to study the JSON file
  
  // Extracting objects from the JSON data into readable arrays/dictionaries
  names = data.names;
  metadata = data.metadata;
  samples = data.samples;
  
  // The first step is to input all IDs into the dropdown menu. The following for loop will help append those values to as options
  let selector = d3.select("#selDataset")

  for (let i=0; i<names.length; i++){
    selector.append("option").text(names[i]).property("value", names[i]);
  };

  const defaultDatasetID = 940; // Setting a default id for charts to appear
  optionChanged(defaultDatasetID)

  // This function will enable us to view the charts
  selector.on("change", optionChanged);

});

// Creating the function event that will be triggered when the selection is made

function optionChanged() {

  // To create the bar chart, we would need to retrieve the sample data that is unique to the ID selected
  let selection = d3.select("#selDataset")
  let dataset = selection.property("value")

  let samples_data; // initializing sample data

  // The following for loop runs a conditional that matches the data we need to the id selected
  for (let i=0; i<samples.length; i++){
    if (dataset == samples[i].id){
      samples_data = samples[i];
    };
  };

  //------------------------------------------------------------------------------------------------------------------------//
  // Creating a Horizontal Bar Chart
  //------------------------------------------------------------------------------------------------------------------------//

  // Once the data is found, we want to begin isolating the x axis and y axis values to create the horizontal bar chart
  let x = samples_data.sample_values.slice(0,10).reverse();
  let y = samples_data.otu_ids.slice(0,10).reverse().map((id) => `OTU ${id}`);
  let text = samples_data.otu_labels.slice(0,10).reverse();

  let barChart = [{
    x : x,
    y : y,
    text : text,
    type :"bar",
    orientation :"h"
  }];

  let layout_bar = {
    height: '100%',
    width: '100%',
  };

  Plotly.newPlot("bar", barChart, layout_bar); // Using Plotly to showcase the bar chart under the "bar" div in our html file

  //------------------------------------------------------------------------------------------------------------------------//
  // Creating a Bubble Chart
  //------------------------------------------------------------------------------------------------------------------------//
  
  // Since we already have our sample data, we extract the necessary values for our bubble chart
  let x_axis = samples_data.otu_ids;
  let y_axis = samples_data.sample_values;
  let markers = samples_data.sample_values;
  let colors = samples_data.otu_ids;
  let labels = samples_data.otu_labels;

  let bubbleChart = [{
    x : x_axis,
    y : y_axis,
    mode : "markers",
    marker :{
      size : markers,
      color : colors
    },
    text : labels
  }];

  let layout_bubble = {
    xaxis:{
      title: {text: "OTU ID",}
    },
    showlegend: false,
    height: 600,
    width: 1200
  };

  Plotly.newPlot("bubble", bubbleChart, layout_bubble); // Using Plotly to showcase the bubble chart under the "bubble" div in our html file

  //------------------------------------------------------------------------------------------------------------------------//
  // Adding a Demographics Element
  //------------------------------------------------------------------------------------------------------------------------//
 
  // Similar to how we extracted sample data, we would need to do the same for the demographics info box
  let demographic_data;
  let wfreq_data; // We'll need this for the gauge chart

  for (let i=0; i<metadata.length; i++){
    if (dataset == metadata[i].id){
      demographic_data = metadata[i];
      wfreq_data = metadata[i].wfreq;
    };
  };

  // Adding the necessary html to showcase demographics for the selected id
  d3.select(".panel-body").html(
    `<p> <b>id</b> : ${demographic_data.id}<br>
    <b>ethnicity</b> : ${demographic_data.ethnicity}<br>
    <b>gender</b> : ${demographic_data.gender}<br>
    <b>age</b> : ${demographic_data.age}<br>
    <b>location</b> : ${demographic_data.location}<br>
    <b>bbtype</b> : ${demographic_data.bbtype}<br>
    <b>wfreq</b> : ${demographic_data.wfreq}</p>`
  );

  //------------------------------------------------------------------------------------------------------------------------//
  // Adding a Gauge Chart - BONUS
  //------------------------------------------------------------------------------------------------------------------------//
  
  // console.log(wfreq_data);

  let gaugeChart = [{
    value : wfreq_data,
    domain: {x: [0, 1], y: [0, 1]},
    title: {
        text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
    },
    type: "indicator",
    mode: "gauge+number",
    gauge: {
        axis: {range: [0, 9]},
        bar: { color: "black" },
        steps: [
            {range: [0, 1], color: "rgba(255, 255, 255, 0)", text:"0-1"},
            {range: [1, 2], color: "rgba(232, 226, 202, .5)", text:"1-2"},
            {range: [2, 3], color: "rgba(210, 206, 145, .5)", text:"2-3"},
            {range: [3, 4], color: "rgba(202, 209, 95, .5)", text:"3-4"},
            {range: [4, 5], color: "rgba(184, 205, 68, .5)", text:"4-5"},
            {range: [5, 6], color: "rgba(170, 202, 42, .5)", text:"5-6"},
            {range: [6, 7], color: "rgba(142, 178, 35 , .5)", text:"6-7"},
            {range: [7, 8], color: "rgba(110, 154, 22, .5)", text:"7-8"},
            {range: [8, 9], color: "rgba(50, 143, 10, 0.5)", text:"8-9"}
        ]
    }
}];

// Set up the Layout
let layout_gauge = {
    width: '40%', 
    height: '40%',
    margin: {t: 0, b:0, l:100, r:100, pad:4}
};

  Plotly.newPlot("gauge", gaugeChart, layout_gauge);

};
