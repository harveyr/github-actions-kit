import * as core from '@actions/core'
import * as github from '@actions/github'

const { GITHUB_REPOSITORY, GITHUB_WORKSPACE } = process.env

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
  const context = github.context
  const { eventName, payload } = context

  if (eventName === 'push') {
    return context.sha
  }
  if (eventName === 'pull_request') {
    const pr = payload.pull_request
    if (!pr) {
      core.error(`Unexpected payload: ${JSON.stringify(payload)}`)
      throw new Error(`Got event type ${eventName} but no PR found in payload`)
    }
    const sha = pr.head.sha
    if (!sha) {
      throw new Error(`payload.pull_request.head.sha is ${sha}`)
    }
    return sha as string
  }

  core.warning(`Unhandled getSha() case. Returning ${context.sha}.`)
  return context.sha
}
