export const yyyyMMdd = (date: Date) => {
  const m = date.getMonth()
  const d = date.getDate()
  const mm = m >= 10 ? m : '0' + m
  const dd = d >= 10 ? d : '0' + m

  const yyyy = date.getFullYear()

  return [yyyy, mm, dd].map((v) => String(v)).join('-')
}
