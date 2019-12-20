import { GetInputFn, getInputSafe } from '../input'

test('getInputSafe: empty string', () => {
  const getInput = jest.fn()

  const result = getInputSafe('disco', { getInput })
  expect(result).toEqual('')
  expect(getInput.mock.calls.length).toEqual(1)
})

test('getInputSafe: basic return value', () => {
  const getInput = jest.fn() as jest.MockedFunction<GetInputFn>
  getInput.mockReturnValueOnce('got something!')

  const result = getInputSafe('disco', { getInput })
  expect(result).toEqual('got something!')
  expect(getInput.mock.calls.length).toEqual(1)
})

test('getInputSafe: fails when value required but not found', () => {
  const getInput = jest.fn() as jest.MockedFunction<GetInputFn>
  expect(() => {
    getInputSafe('disco', { getInput, required: true })
  }).toThrow('"disco" is a required input')
})

test('getInputSafe: fail if alt key found', () => {
  const getInput = jest.fn() as jest.MockedFunction<GetInputFn>

  // Fail if alt key found
  getInput.mockReturnValueOnce('').mockReturnValueOnce('not nothing')
  expect(() => {
    getInputSafe('disco_heaven', { getInput, required: false })
  }).toThrow(
    'No data for input "disco_heaven" but got data for input "disco-heaven". Failing out of caution.',
  )

  // Same result for the other key pattern
  getInput.mockReturnValueOnce('').mockReturnValueOnce('not nothing')
  expect(() => {
    getInputSafe('disco-heaven', { getInput, required: false })
  }).toThrow(
    'No data for input "disco-heaven" but got data for input "disco_heaven". Failing out of caution.',
  )
})

test('getInputSafe: return alt result when allowAltFormat provided', () => {
  const getInput = jest.fn() as jest.MockedFunction<GetInputFn>

  getInput.mockReturnValueOnce('').mockReturnValueOnce('not nothing')
  expect(
    getInputSafe('disco-heaven', {
      getInput,
      required: false,
      allowAltFormat: true,
    }),
  ).toEqual('not nothing')
})
