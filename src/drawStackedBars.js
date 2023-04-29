import * as constants from "./constants"
import * as d3 from "d3"

export default function drawStackedBars(data) {
  const svg = d3
    .select("#bars")
    .append("svg")
    .attr("viewBox", [0, 0, constants.width, constants.height])

  const innerChart = svg
    .append("g")
    .attr(
      "transform",
      `translate(${constants.margin.left}, ${constants.margin.top})`
    )

  const stackGenerator = d3
    .stack()
    .keys(data.columns.filter((d) => d !== "year"))
    .order(d3.stackOrderNone)
    .offset(d3.stackOffsetExpand)

  const annotatedData = stackGenerator(data)

  console.log(annotatedData)

  const minLowerBoundaries = []
  const maxUpperBoundaries = []
  annotatedData.forEach((series) => {
    minLowerBoundaries.push(d3.min(series, (d) => d[0]))
    maxUpperBoundaries.push(d3.max(series, (d) => d[1]))
  })

  const minDomain = d3.min(minLowerBoundaries)
  const maxDomain = d3.max(maxUpperBoundaries)

  console.log(minDomain, maxDomain)

  const xScale = d3
    .scaleBand()
    .domain(data.map((d) => d.year))
    .range([0, constants.innerWidth])
    .padding(0.2)
  const yScale = d3
    .scaleLinear()
    .domain([minDomain, maxDomain])
    .range([constants.innerHeight, 0])

  const colorScale = d3
    .scaleOrdinal()
    .domain(constants.formatsInfo.map((f) => f.id))
    .range(constants.formatsInfo.map((f) => f.color))
  annotatedData.forEach((serie) => {
    innerChart
      .selectAll(`.bar-${serie.key}`)
      .data(serie)
      .join("rect")
      .attr("class", (d) => `bar-${serie.key}`)
      .attr("x", (d) => xScale(d.data.year))
      .attr("y", (d) => yScale(d[1]))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => yScale(d[0]) - yScale(d[1]))
      .attr("fill", colorScale(serie.key))
  })

  const leftAxis = d3.axisLeft(yScale)

  innerChart.append("g").call(leftAxis)

  const bottomAxis = d3
    .axisBottom(xScale)
    .tickValues(d3.range(1975, 2020, 5))
    .tickSizeOuter(0)
  innerChart
    .append("g")
    .attr("transform", `translate(0, ${constants.innerHeight})`)
    .call(bottomAxis)
}
