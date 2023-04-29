import * as constants from "./constants"
import * as d3 from "d3"

export default function drawDonutChart(data) {
  const xScale = d3
    .scaleBand()
    .domain(data.map((d) => d.year))
    .range([0, constants.innerWidth])

  const colorScale = d3
    .scaleOrdinal()
    .domain(constants.formatsInfo.map((d) => d.id))
    .range(constants.formatsInfo.map((d) => d.color))

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

  const years = [1975, 1995, 2013]
  const formats = data.columns.filter((format) => format !== "year")

  years.forEach((year) => {
    const donutContainer = donutContainers
      .append("g")
      .attr(
        "transform",
        `translate(${xScale(year)},${constants.innerHeight / 2})`
      )

    const yearData = data.find((d) => d.year === year)
    const formattedData = []

    formats.forEach((format) => {
      formattedData.push({
        format,
        sales: yearData[format],
      })
    })

    const pieGenerator = d3.pie().value((d) => d.sales)
    const annotatedData = pieGenerator(formattedData)

    console.log(annotatedData)

    const arcGenerator = d3
      .arc()
      .startAngle((d) => d.startAngle)
      .endAngle((d) => d.endAngle)
      .innerRadius(60)
      .outerRadius(100)
      .padAngle(0.02)
      .cornerRadius(3)

    const arcs = donutContainer
      .selectAll(`.arc-${year}`)
      .data(annotatedData)
      // .join("path")
      // .attr("class", `arc-${year}`)
      // .attr("d", arcGenerator)
      // .attr("fill", (d) => colorScale(d.data.format))
      .join("g")
      .attr("class", `arc-${year}`)
    arcs
      .append("path")
      .attr("d", arcGenerator)
      .attr("fill", (d) => colorScale(d.data.format))
    arcs
      .append("text")
      .text((d) => {
        d["percentage"] = (d.endAngle - d.startAngle) / (2 * Math.PI)
        return d3.format(".0%")(d.percentage)
      })
      .attr("x", (d) => {
        d["centroid"] = arcGenerator
          .startAngle(d.startAngle)
          .endAngle(d.endAngle)
          .centroid()
        return d.centroid[0]
      })
      .attr("y", (d) => d.centroid[1])
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .attr("fill", "#f6fafc")
      .attr("fill-opacity", (d) => (d.percentage < 0.05 ? 0 : 1))
      .style("font-size", "16px")
      .style("font-weight", 500)

    donutContainer
      .append("text")
      .text(year)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .style("font-size", "24px")
      .style("font-weight", 500)
  })
}
