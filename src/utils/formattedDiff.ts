export default function getFormattedDiff(start: Date, end: Date): string {
  let diffMs = end.getTime() - start.getTime()
  if (diffMs < 0) diffMs = -diffMs // handle negative diff if needed

  const seconds = Math.floor(diffMs / 1000) % 60
  const minutes = Math.floor(diffMs / (1000 * 60)) % 60
  const hours = Math.floor(diffMs / (1000 * 60 * 60)) % 24
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  const parts = []
  if (days) parts.push(`${days} day${days !== 1 ? 's' : ''}`)
  if (hours) parts.push(`${hours} hour${hours !== 1 ? 's' : ''}`)
  if (minutes) parts.push(`${minutes} minute${minutes !== 1 ? 's' : ''}`)
  if (seconds) parts.push(`${seconds} second${seconds !== 1 ? 's' : ''}`)

  return parts.join(', ')
}
