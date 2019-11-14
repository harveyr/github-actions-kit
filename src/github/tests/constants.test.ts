import { getOwnerAndRepo } from '../constants'

test('parse repo', () => {
  const { owner, repo } = getOwnerAndRepo('harveyr/my-repo')
  expect(owner).toEqual('harveyr')
  expect(repo).toEqual('my-repo')
})
