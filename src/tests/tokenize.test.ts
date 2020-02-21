import { tokenize } from '../tokenize'

test('tokenize', () => {
  expect(tokenize('')).toEqual([])
  expect(tokenize(undefined)).toEqual([])
  expect(tokenize('  asdf 123\n 456  bingo\ninbog\n  ')).toEqual([
    'asdf',
    '123',
    '456',
    'bingo',
    'inbog',
  ])
})
