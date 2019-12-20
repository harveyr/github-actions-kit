import * as core from '@actions/core'

export type GetInputFn = (key: string, opt?: core.InputOptions) => string

interface GetInputOpt extends core.InputOptions {
  getInput?: GetInputFn
  allowAltFormat?: boolean
}

/**
 * Return the result of `core.getInput` with some safe guards.
 *
 * In particular, for a key like "some_input", it checks whether data was
 * accidentally supplied for "some-input" instead.
 *
 * I personally would _never_ break CI for my entire team by making this
 * mistake. But maybe someone else would. ;)
 */
export function getInputSafe(key: string, opt: GetInputOpt = {}): string {
  function getInput(key: string): string {
    // Allow for dependency injection to make testing easy:
    const getFunc: GetInputFn = opt.getInput ? opt.getInput : core.getInput
    const getOpt: core.InputOptions = { required: opt.required }
    return getFunc.apply(null, [key, getOpt])
  }

  const result = getInput(key)
  if (result) {
    return result
  }

  if (opt.required) {
    throw new Error(`"${key}" is a required input`)
  }

  let altKey = ''
  if (key.includes('-')) {
    altKey = key.replace('-', '_')
  } else if (key.includes('_')) {
    altKey = key.replace('_', '-')
  }
  if (!altKey) {
    return ''
  }

  const altResult = getInput(altKey)
  if (altResult) {
    if (opt.allowAltFormat) {
      // Maybe we want to allow either format to work.
      return altResult
    }
    throw new Error(
      `No data for input "${key}" but got data for input "${altKey}". Failing out of caution.`,
    )
  }

  return ''
}
