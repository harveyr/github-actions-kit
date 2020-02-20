import { tokenize } from '../tokenize'

test('tokenize', () => {
  const result = tokenize('  asdf 1234   bingo  inbog  ')
  expect(result).toEqual(['asdf', '1234', 'bingo', 'inbog'])
})
