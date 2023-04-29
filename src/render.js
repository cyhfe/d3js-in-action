import * as d3 from "d3"
import drawHistogram from "./drawHistogram"
const getRandomSalary = (salary) => {
  const lowerLimit = +salary.slice(1, salary.indexOf(" -")).replace(",", "")
  const upperLimit = +salary.slice(salary.indexOf(" $") + 2).replace(",", "")

  return Math.floor(Math.random() * (upperLimit - lowerLimit) + lowerLimit)
}

export default async function render() {
  const data = await d3.csv("data/data.csv", (d) => {
    if (d.pay_annual_USD !== "$240,000 or more") {
      return {
        ...d,
        salary: getRandomSalary(d.pay_annual_USD),
      }
    }
  })

  drawHistogram(data)
}
