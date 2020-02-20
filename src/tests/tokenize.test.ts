import { tokenize } from '../tokenize'

test('tokenize', () => {
  expect(tokenize('')).toEqual([])
  expect(tokenize(undefined)).toEqual([])
  expect(tokenize('  asdf 1234   bingo  inbog  ')).toEqual([
    'asdf',
    '1234',
    'bingo',
    'inbog',
  ])
})
