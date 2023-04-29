import * as d3 from "d3"
import drawDonutChart from "./donut-charts"

export default async function render() {
  const data = await d3.csv("data/data.csv", d3.autoType)
  drawDonutChart(data)
}
