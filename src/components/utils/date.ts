export const timeElapsed = (date: Date): string => {
  const timeMap: { [key: string]: number } = {
    ms: 1000,
    sec: 60,
    min: 60,
    h: 24,
    d: 365.25 / 12,
    mo: 12,
  }

  // Get unit
  let unit = 'ms'
  let timeDiff = new Date().getTime() - new Date(date).getTime()
  for (let key in timeMap) {
    if (timeDiff > timeMap[key]) {
      unit = key
      timeDiff /= timeMap[key]
    }
  }

  // Round result
  const whole = Math.floor(timeDiff)

  // Check remainder
  const unitNames = Object.keys(timeMap)
  const unitIndex = unitNames.findIndex((key) => key === unit)
  if (unitIndex > 1 && timeDiff > whole) {
    const remUnit = unitNames[unitIndex - 1]
    const remainder = (timeDiff - whole) * timeMap[remUnit]
    return `${whole}${unit},${Math.round(remainder)}${remUnit}`
  }

  return `${whole}${unit}`
}
