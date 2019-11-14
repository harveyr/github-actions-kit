import * as core from '@actions/core'

const { GITHUB_REPOSITORY, GITHUB_SHA, GITHUB_WORKSPACE } = process.env

export function getWorkspace(): string {
  if (!GITHUB_WORKSPACE) {
    throw new Error('GITHUB_WORKSPACE is empty')
  }
  return GITHUB_WORKSPACE
}

export interface ParsedRepo {
  repo: string
  owner: string
}

export function getOwnerAndRepo(s?: string): ParsedRepo {
  if (!s) {
    if (!GITHUB_REPOSITORY) {
      throw new Error('GITHUB_REPOSITORY is empty')
    }
    s = GITHUB_REPOSITORY
  }
  const [owner, repo] = s.split('/')
  core.debug(`Found Github owner ${owner}, repo ${repo}`)
  return { owner, repo }
}

export function getSha(): string {
  if (!GITHUB_SHA) {
    throw new Error('GITHUB_SHA is empty')
  }
  return GITHUB_SHA
}
