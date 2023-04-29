import * as d3 from "d3"
import { xScale, yScale, binGenerator } from "./scales"
import { innerHeight } from "./drawHistogram"
const filters = [
  { id: "all", label: "All", isActive: true },
  { id: "Female", label: "Women", isActive: false },
  { id: "Male", label: "Men", isActive: false },
]

const populateFilters = (data) => {
  d3.select("#filters")
    .selectAll(".filter")
    .data(filters)
    .join("button")
    .attr("class", (d) => `filter ${d.isActive ? "active" : ""}`)
    .text((d) => d.label)
    .on("click", (e, d) => {
      console.log("DOM event", e)
      console.log("Attached datum", d)

      if (!d.isActive) {
        filters.forEach((f) => (f.isActive = f.id === d.id ? true : false))
        d3.selectAll(".filter").classed("active", (filter) =>
          filter.id === d.id ? true : false
        )

        updateHistogram(d.id, data)
      }
    })
}

function updateHistogram(filterId, data) {
  let updatedData =
    filterId === "all"
      ? data
      : data.filter((respondent) => respondent.gender === filterId)
  console.log(data, updatedData)
  // Update the bins
  const updatedBins = binGenerator(updatedData)
  console.log(updatedBins)
  // Update the histogram
  d3.selectAll("#histogram rect")
    .data(updatedBins)
    .transition()
    .duration(500)
    .ease(d3.easeCubicOut)
    .attr("y", (d) => yScale(d.length))
    .attr("height", (d) => innerHeight - yScale(d.length))
}

export default populateFilters
