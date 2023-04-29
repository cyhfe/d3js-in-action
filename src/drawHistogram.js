import * as d3 from "d3"
import { xScale, yScale, binGenerator } from "./scales"

// Colors
const slateGray = "#305252"
const gray = "#606464"
const white = "#faffff"
const womenColor = "#826C7F"
const menColor = "#FA7E61"

const margin = { top: 40, right: 30, bottom: 50, left: 40 }
const width = 1000
const height = 500
export const innerWidth = width - margin.left - margin.right
export const innerHeight = height - margin.top - margin.bottom

export default function drawHistogram(data) {
  // Append the SVG container
  const svg = d3
    .select("#histogram")
    .append("svg")
    .attr("viewBox", `0, 0, ${width}, ${height}`)

  // Append the group that will contain the inner chart
  const innerChart = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)

  const bins = binGenerator(data)
  innerChart
    .selectAll("rect")
    .data(bins)
    .join("rect")
    .attr("x", (d) => xScale(d.x0))
    .attr("y", (d) => yScale(d.length))
    .attr("width", (d) => xScale(d.x1) - xScale(d.x0))
    .attr("height", (d) => innerHeight - yScale(d.length))
    .attr("fill", slateGray)
    .attr("stroke", white)
    .attr("stroke-width", 2)

  const bottomAxis = d3.axisBottom(xScale)
  innerChart
    .append("g")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(bottomAxis)
  svg
    .append("text")
    .text("Yearly salary (USD)")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height - 5)

  const leftAxis = d3.axisLeft(yScale)
  innerChart.append("g").call(leftAxis)
  svg.append("text").text("Frequency").attr("x", 5).attr("y", 20)
}
