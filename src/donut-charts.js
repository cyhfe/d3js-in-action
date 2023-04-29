import * as constants from "./constants"
import * as d3 from "d3"
export default function drawDonutChart(data) {
  const svg = d3
    .select("#donut")
    .append("svg")
    .attr("viewBox", `0,0,${constants.width},${constants.height}`)

  const donutContainers = svg
    .append("g")
    .attr(
      "transform",
      `translate(${constants.margin.left},${constants.margin.top})`
    )

  const years = [1975, 1995, 2019]
  const formats = data.columns.filter((format) => format !== "year")

  years.forEach((year) => {
    const donutContainer = donutContainers
      .append("g")
      .attr(
        "transform",
        `translate(${constants.margin.left},${constants.innerHeight / 2})`
      )
  })
}
