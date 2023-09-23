d3.json('fourFactors.json').then(function (data) {
    const SumPositiveData = data.filter((item) => item.CATEGORY === "SUM(SO)");
    const PosLabels = Object.keys(SumPositiveData[0]).slice(10, 16);
    const positiveMax = d3.max(SumPositiveData, (d) => d3.max(PosLabels.map((label) => d[label])));
    const positiveMin = d3.min(SumPositiveData, (d) => d3.min(PosLabels.map((label) => d[label])));


    const SumNegativeData = data.filter((item) => item.CATEGORY === "WT");
    const NegLabels = Object.keys(SumNegativeData[0]).slice(10, 16);
    const positiveMin2 = d3.min(SumNegativeData, (d) => d3.min(NegLabels.map((label) => d[label])));
    const positiveMax2 = d3.max(SumNegativeData, (d) => d3.max(NegLabels.map((label) => d[label])));

    // Define the parameters
    const minValue = positiveMin;
    const maxValue = positiveMax;

    const minValue2 = positiveMin2;
    const maxValue2 = positiveMax2;

    const numSimulations = 100000;
    const mean = (minValue + maxValue) / 2;
    const stdDev = (maxValue - minValue) / 6;

    // Perform the first Monte Carlo simulation
const simulationResults1 = [];
for (let i = 0; i < numSimulations; i++) {
    const value = d3.randomNormal((minValue + maxValue) / 2, (maxValue - minValue) / 6)();
    simulationResults1.push(value);
}

// Set up the SVG
const svg = d3.select("#d10-container")
.append("svg")
.attr("width", 1000)
.attr("height", 400);

// Create the first histogram
const histogram1 = d3.histogram()
    .thresholds(40)
    .domain([minValue, maxValue])
(simulationResults1);

// Perform the second Monte Carlo simulation
const simulationResults2 = [];
for (let i = 0; i < numSimulations; i++) {
    const value = d3.randomNormal((minValue2 + maxValue2) / 2, (maxValue2 - minValue2) / 6)();
    simulationResults2.push(value);
}

// Create the second histogram
const histogram2 = d3.histogram()
    .thresholds(40)
    .domain([minValue2, maxValue2])
(simulationResults2);

// Define the scales for the first histogram
const xScale1 = d3.scaleLinear()
    .domain([minValue, maxValue])
    .range([50, 1000]);

    // Draw the x-axis
  svg.append("g")
  .attr("transform", "translate(0, 350)")
  .call(d3.axisBottom(xScale1));

const yScale1 = d3.scaleLinear()
    .domain([0, d3.max(histogram1, d => d.length)])
    .range([350, 50]);
// Draw the y-axis
svg.append("g")
.attr("transform", "translate(50, 0)")
.call(d3.axisLeft(yScale1));
// Define the scales for the second histogram
const xScale2 = d3.scaleLinear()
    .domain([minValue2, maxValue2])
    .range([50, 600]);

const yScale2 = d3.scaleLinear()
    .domain([0, d3.max(histogram2, d => d.length)])
    .range([350, 50]);
        

// Draw the bars for the first histogram
svg.selectAll(".bar1")
    .data(histogram1)
    .enter()
    .append("rect")
    .attr("class", "bar1")
    .attr("x", d => xScale1(d.x0))
    .attr("y", d => yScale1(d.length))
    .attr("width", d => xScale1(d.x1) - xScale1(d.x0) - 1)
    .attr("height", d => 350 - yScale1(d.length))
    .attr("fill", "blue")
    .on("mouseover", function (event, d) {
        // Highlight the bar on mouseover
        d3.select(this).attr('opacity', 0.5);
        
        // Show value as a tooltip
        const tooltip = chart.append("g")
          .attr("class", "tooltip")
          .style("pointer-events", "none");
        
        tooltip.append("text")
          .attr("x", xScale(d.x0) + xScale.bandwidth() / 2)
          .attr("y", yScale(d.length) - 10)
          .attr("text-anchor", "middle")
          .text(d.length);
    })
    .on("mouseout", function (event, d) {
        // Restore the original fill color on mouseout
        d3.select(this).attr('opacity', 1);
        
        // Remove the tooltip
        chart.select(".tooltip").remove()
    });

// Draw the bars for the second histogram
svg.selectAll(".bar2")
    .data(histogram2)
    .enter()
    .append("rect")
    .attr("class", "bar2")
    .attr("x", d => xScale2(d.x0))
    .attr("y", d => yScale2(d.length))
    .attr("width", d => xScale2(d.x1) - xScale2(d.x0) - 1)
    .attr("height", d => 350 - yScale2(d.length))
    .attr("fill", "red")
    .on("mouseover", function (event, d) {
        // Highlight the bar on mouseover
        d3.select(this).attr('opacity', 0.5);
        
        // Show value as a tooltip
        const tooltip = chart.append("g")
          .attr("class", "tooltip")
          .style("pointer-events", "none");
        
        tooltip.append("text")
          .attr("x", xScale(d.label) + xScale.bandwidth() / 2)
          .attr("y", yScale(d.value) - 10)
          .attr("text-anchor", "middle")
          .text(d.value);
    })
    .on("mouseout", function (event, d) {
        // Restore the original fill color on mouseout
        d3.select(this).attr('opacity', 1);
        
        // Remove the tooltip
        chart.select(".tooltip").remove()
    });


const colors = ["blue", "red", "yellow"];
const legend = svg
    .append("g")
    .attr("class", "legend-textl")
    .attr("transform", `translate(${800}, ${30})`);

const legendItem = legend
    .selectAll(".legend-item")
    .data(["Positive", "Negative"])
    .enter()
    .append("g")
    .attr("class", "legend-item")
    .attr("transform", (d, i) => `translate(0, ${i * 20})`); // Adjust the vertical spacing here

legendItem
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 10)
    .attr("height", 10)
    .attr("fill", (d, i) => colors[i % colors.length]);

legendItem
    .append("text")
    .attr("x", 20)
    .attr("y", 10)
    .text((d) => d);


});
