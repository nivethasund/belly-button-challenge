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
  
  // The first step is to input all IDs into the dropdown menu
  let selector = d3.select("#selDataset")

  for (let i=0; i<names.length; i++){
    selector.append("option").text(names[i]).property("value", names[i]);
  };

  selector.on("change", optionChanged);

});

// Creating the function event that will be triggered when the selection is made

function optionChanged() {

  // To create the bar chart, we would need to retrieve the sample data that is unique to the ID selected
  let selection = d3.select("#selDataset")
  let dataset = selection.property("value")

  let samples_data; // initializing sample data
  let wfreq_data; // We'll need this for the gauge chart

  // The following for loop runs a conditional that matches the data we need to the id selected
  for (let i=0; i<samples.length; i++){
    if (dataset == samples[i].id){
      samples_data = samples[i];
      wfreq_data = samples[i].wfreq;
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
    margin: {
        l: 100,
        r: 100,
        t: 0,
        b: 50,
    },
    height: 500,
    width: 600,
  };

  Plotly.newPlot("bar", barChart, layout_bar); // Using Plotly to showcase the bar chart under the "bar" div in our html file

  //------------------------------------------------------------------------------------------------------------------------//
  // Creating a Bubble Chart
  //------------------------------------------------------------------------------------------------------------------------//
  
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

  Plotly.newPlot("bubble", bubbleChart, layout_bubble);

  //------------------------------------------------------------------------------------------------------------------------//
  // Adding a Demographics Element
  //------------------------------------------------------------------------------------------------------------------------//
 
  let demographic_data;

  for (let i=0; i<metadata.length; i++){
    if (dataset == metadata[i].id){
      demographic_data = metadata[i];
    };
  };

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
  // Adding a Gauge Chart
  //------------------------------------------------------------------------------------------------------------------------//
  
  let gaugeChart =[{
    domain: { x: [0, 1], y: [0, 1] },
    type : "indicator",
    mode : "gauge+number",
    value : wfreq_data,
    title : {text:"Belly Button Washing Frequency"},
    gauge : {
      axis : {range:[0, 9]}
    },
    steps: [
      { range: [0, 1], color: "rgb(0, 0, 255)" },
      { range: [1, 2], color: "rgb(0, 64, 255)" },
      { range: [2, 3], color: "rgb(0, 128, 255)" },
      { range: [3, 4], color: "rgb(0, 192, 255)" },
      { range: [4, 5], color: "rgb(0, 255, 255)" },
      { range: [5, 6], color: "rgb(128, 255, 128)" },
      { range: [6, 7], color: "rgb(255, 255, 0)" },
      { range: [7, 8], color: "rgb(255, 192, 0)" },
      { range: [8, 9], color: "rgb(255, 128, 0)" },
    ]
  }];

  Plotly.newPlot("gauge", gaugeChart);

};