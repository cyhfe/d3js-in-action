import * as d3 from "d3"
import { innerHeight, innerWidth } from "./drawHistogram"
let xScale
let yScale

const binGenerator = d3.bin().value((d) => d.salary)

function createScales(data) {
  const bins = binGenerator(data)

  const minSalary = bins[0].x0
  const maxSalary = bins[bins.length - 1].x1
  xScale = d3
    .scaleLinear()
    .domain([minSalary, maxSalary])
    .range([0, innerWidth])
  const binsMaxLength = d3.max(bins, (d) => d.length)
  yScale = d3
    .scaleLinear()
    .domain([0, binsMaxLength])
    .range([innerHeight, 0])
    .nice()
}

export { xScale, yScale, binGenerator, createScales }
