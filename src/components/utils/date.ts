export const timeElapsed = (date: Date): string => {
  const diff_ms = new Date().getTime() - new Date(date).getTime()
  let days = Math.floor(diff_ms / (24 * 60 * 60 * 1000))

  const y = Math.floor(days / 365)
  const m = Math.floor((days - 365 * y) / 30)
  const d = days - 365 * y - 30 * m

  if (y > 0) {
    return `${y}y,${m}m`
  } else if (m > 0) {
    return `${m}mo,${d}d`
  }

  return `${d}d`
}
