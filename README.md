# belly-button-challenge
## Module 14 Challenge Files

In this repo, you'll find the following -
- The index.html file containing code that compiles/houses .js scripts.
- The samples.json file which shows the output from the URL used.
- The static folder containing the path to our app.js script.
- The Images folder containing screenshots of the charts created in the app.js file.

-----
## Belly Buttons Galore!!

With this assignment, we dive into the various microbial species that invade our navels! We use JSON data from a given URL and input the data into visual and interactive charts to help us derive data insights. In this exercise, 
- I've collected unique IDs and created a dropdown element, making my app interactive for users.
- When a selection is made, a user will see
  - A horizontal bar chart showing the top ten OTU IDs with the most samples for a given selection.
  - A bubble chart showing the number of samples per OTU ID, each bubble size proportionate to the sample values.
  - A demographics table showing the general information of the individual who was selected.
  - BONUS: A gauge chart showing the washing frequency of the selected individual.

-----
#### _Sources_

- [Dropdown Selectors with D3](https://gist.github.com/rpruim/fd50d23933c63f3113a2bb8576b5b34a) The code I referred to is from lines 80-87
- [Data Loading with D3](https://www.tutorialsteacher.com/d3js/loading-data-from-file-in-d3js)
- [Plotly Javascript Open Source](https://plotly.com/graphing-libraries/) for plotting charts
