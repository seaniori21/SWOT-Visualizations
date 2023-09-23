// Load the data from a JSON file
d3.json('fourFactors.json').then(function (data) {

    // Extract the relevant values from the data
    const SumNegativeData = data.filter((item) => item.CATEGORY === "WT");
    const values = Object.values(SumNegativeData[0]).slice(-6);
    var NegativeTotal = d3.sum(values);

    const SumPositiveData = data.filter((item) => item.CATEGORY === "SUM(SO)");
    const values1 = Object.values(SumPositiveData[0]).slice(-6);
    const PositiveTotal = d3.sum(values1);

    const differential = PositiveTotal + NegativeTotal;
    console.log(differential, PositiveTotal, NegativeTotal);

        // Chart dimensions
    const width = 700;
    const height = 500;
    const margin = { top: 40, right: 20, bottom: 150, left: 200 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // SVG container
    const svg = d3
    .select("#d9-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

    // Group for bars
    const chart = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

    NegativeTotal = Math.abs(NegativeTotal);

    const xLabels = [PositiveTotal, NegativeTotal, differential];
    const xDomain = ["PositiveTotal", "NegativeTotal", "Differential"];
    // X scale
    const xScale = d3
    .scaleBand()
    .domain(xDomain) // Use indices as the domain
    .range([0, innerWidth])
    .paddingInner(0.2)
    .paddingOuter(0.2);

    // Y scale
    const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(xLabels)])
    .range([innerHeight, 0]);

    const colors = ["blue", "red", "yellow"];
    // Draw bars
    chart
    .selectAll(".bar")
    .data(xDomain)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d) => xScale(d))
    .attr("y", (d) => yScale(xLabels[xDomain.indexOf(d)]))
    .attr("width", xScale.bandwidth())
    .attr("height", (d) => innerHeight - yScale(xLabels[xDomain.indexOf(d)]))
    .attr("fill", (d, i) => colors[i % colors.length])
    .on("mouseover", function (event, d) {
        // Highlight the bar on mouseover
        d3.select(this).attr('opacity', 0.5);
        
        // Show value as a tooltip
        const tooltip = chart.append("g")
          .attr("class", "tooltip")
          .style("pointer-events", "none");
        
        tooltip.append("text")
          .attr("x", xScale(d) + xScale.bandwidth() / 2)
          .attr("y", yScale(xLabels[xDomain.indexOf(d)]) - 10)
          .attr("text-anchor", "middle")
          .text(xLabels[xDomain.indexOf(d)]);
    })
    .on("mouseout", function (event, d) {
        // Restore the original fill color on mouseout
        d3.select(this).attr('opacity', 1);
        
        // Remove the tooltip
        chart.select(".tooltip").remove()
    });

    // X axis
    const xAxis = d3.axisBottom(xScale).tickFormat((d) => d);
    chart
    .append("g")
    .attr("class", "xAxis-text-large")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(xAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-0.8em")
    .attr("dy", "-0.15em")
    .attr("transform", "rotate(-45)");

    // Y axis
    const yAxis = d3.axisLeft(yScale);
    chart.append("g").attr("class", "y-axis").call(yAxis);

    // Chart title
    svg
    .append("text")
    .attr("class", "chartTitle")
    .attr("x", width / 2 + 100)
    .attr("y", margin.top / 2)
    .attr("text-anchor", "middle")
    .text("Totals"); 

    // Add y-axis label
    svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2 +80)
    .attr("y", margin.left / 2)
    .attr("text-anchor", "middle")
    .text("Value");


});
  
  