// Import from the top level to test the `export * as` syntax.
import { markdown } from '../'

test('markdown', () => {
  expect(markdown.codeBlock('  asdf')).toEqual('```\n  asdf\n```')
})
