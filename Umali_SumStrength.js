// Load the data from a JSON file
d3.json('fourFactors.json').then(function (data) {

    const SumOpportunityData = data.filter((item) => item.CATEGORY === "SUM(S)");
    console.log(SumOpportunityData);
  
    // Chart dimensions
    const width = 400;
    const height = 400;
    const margin = { top: 40, right: 20, bottom: 150, left: 70 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
  
    // SVG container
    const svg = d3
      .select("#d6-container")
      .append("svg")
      .attr("width", width)
      .attr("height", height);
  
    // Group for bars
    const chart = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
    const xLabels = Object.keys(SumOpportunityData[0]).slice(10, 16);
    console.log(xLabels);
  
  
    // X scale
    const xScale = d3
      .scaleBand()
      .domain(xLabels)
      .range([0, innerWidth])
      .paddingInner(0.2)
      .paddingOuter(0.2);
  
      // X axis
    const xAxis = d3.axisBottom(xScale);
    chart
      .append("g")
      .attr("class", "xAxis-text")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-0.8em")
      .attr("dy", "-0.15em")
      .attr("transform", "rotate(-45)");
  
    // Y scale
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(SumOpportunityData, (d) => d3.max(xLabels.map((label) => d[label])))])
      .range([innerHeight, 0]);
      
    // Y axis
    const yAxis = d3.axisLeft(yScale);
    chart.append("g").attr("class", "y-axis").call(yAxis);
  
    // Color scale for groups
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
  
    // Chart title
    svg
      .append("text")
      .attr("class", "chartTitle")
      .attr("x", width / 2)
      .attr("y", margin.top / 2)
      .attr("text-anchor", "middle")
      .text("SUM Strength");
  
  // Draw bars for each group
  const barWidth = xScale.bandwidth() * 2.5;
  chart
    .selectAll(".bar")
    .data(SumOpportunityData)
    .enter()
    .append("g")
    .selectAll("rect")
    .data((d) =>
      xLabels.map((label) => ({
        label,
        value: d[label]
      }))
    )
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d) => xScale(d.label))
    .attr("y", (d) => yScale(d.value))
    .attr("width", xScale.bandwidth())
    .attr("height", (d) => innerHeight - yScale(d.value))
    .attr("fill", (d) => colorScale(d.label))  
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
});
  
  