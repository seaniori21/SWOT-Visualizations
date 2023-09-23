d3.json('fourFactors.json').then(function (data) {
  const SumPositiveData = data.filter((item) => item.CATEGORY === "SUM(SO)");
  const PosLabels = Object.keys(SumPositiveData[0]).slice(10, 16);
  const positiveMax = d3.max(SumPositiveData, (d) => d3.max(PosLabels.map((label) => d[label])));


  const SumNegativeData = data.filter((item) => item.CATEGORY === "WT");
  const NegLabels = Object.keys(SumNegativeData[0]).slice(10, 16);
  const positiveMin = d3.min(SumNegativeData, (d) => d3.min(NegLabels.map((label) => d[label])));

  // Define the parameters
  const minValue = positiveMin;
  const maxValue = positiveMax;
  const numSimulations = 100000;
  const mean = (minValue + maxValue) / 2;
  const stdDev = (maxValue - minValue) / 6;

  // Perform the Monte Carlo simulation
  const simulationResults = [];
  for (let i = 0; i < numSimulations; i++) {
      const value = d3.randomNormal(mean, stdDev)();
      simulationResults.push(value);
  }

  // Create a histogram
  const histogram = d3.histogram()
      .thresholds(40)
      .domain([minValue, maxValue])
  (simulationResults);

  // Set up the SVG
  const svg = d3.select("#d10-container")
      .append("svg")
      .attr("width", 800)
      .attr("height", 400);

  // Define the scales
  const xScale = d3.scaleLinear()
      .domain([minValue, maxValue])
      .range([50, 750]);

  const yScale = d3.scaleLinear()
      .domain([0, d3.max(histogram, d => d.length)])
      .range([350, 50]);

  // Draw the bars
  svg.selectAll("rect")
      .data(histogram)
      .enter()
      .append("rect")
      .attr("x", d => xScale(d.x0))
      .attr("y", d => yScale(d.length))
      .attr("width", d => xScale(d.x1) - xScale(d.x0) - 1)
      .attr("height", d => 350 - yScale(d.length))
      .attr("fill", "steelblue");

  // Draw the x-axis
  svg.append("g")
      .attr("transform", "translate(0, 350)")
      .call(d3.axisBottom(xScale));

  // Draw the y-axis
  svg.append("g")
      .attr("transform", "translate(50, 0)")
      .call(d3.axisLeft(yScale));
      
});
