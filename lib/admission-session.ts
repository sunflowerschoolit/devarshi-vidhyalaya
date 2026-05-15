export function getAdmissionSessionLabel(date = new Date()): string {
  const currentYear = date.getFullYear()
  const month = date.getMonth()

  // April onward shows current-next academic session; Jan-Mar shows previous-current.
  const startYear = month >= 3 ? currentYear : currentYear - 1
  const endYearShort = String((startYear + 1) % 100).padStart(2, '0')

  return `${startYear}-${endYearShort}`
}
