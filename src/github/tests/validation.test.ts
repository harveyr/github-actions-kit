import { isAnnotationLevel } from '../validation'

test('isAnnotationLevel', () => {
  expect(isAnnotationLevel('notice')).toEqual(true)
  expect(isAnnotationLevel('warning')).toEqual(true)
  expect(isAnnotationLevel('failure')).toEqual(true)
  expect(isAnnotationLevel('something-else')).toEqual(false)
})
