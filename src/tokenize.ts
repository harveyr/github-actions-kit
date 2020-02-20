/**
 * Split a whitespace-delimited string into tokens.
 */
export function tokenize(s: string): string[] {
  return s
    .split(' ')
    .map(s => {
      return s.trim()
    })
    .filter(s => {
      return Boolean(s)
    })
}
