/**
 * Split a whitespace-delimited string into tokens.
 */
export function tokenize(s?: string): string[] {
  if (!s) {
    return []
  }

  const tokens: string[] = []

  for (let line of s.split('\n')) {
    line = line.trim()
    for (let lineToken of line.split(' ')) {
      lineToken = lineToken.trim()
      if (lineToken) {
        tokens.push(lineToken)
      }
    }
  }

  return tokens
}
