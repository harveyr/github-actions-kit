import * as core from '@actions/core'
import * as github from '@actions/github'
import * as checks from './checks'
import { getOwnerAndRepo, getSha } from './constants'
import { CheckRunAbridged } from './types'

interface CheckRunResponse {
  status: number
  // TODO: Use proper type once Octokit is fixed.
  // See https://github.com/actions/toolkit/issues/335.
  // Hopefully they'll cut a release any day now.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
}

export async function postCheckRun(
  postData: CheckRunAbridged,
): Promise<CheckRunResponse> {
  const { owner, repo } = getOwnerAndRepo()
  const { githubToken, name, conclusion, summary, text, annotations } = postData

  if (!githubToken) {
    throw new Error('No Github token provided')
  }
  const client = new github.GitHub(githubToken)

  const annotationsCount = annotations ? annotations.length : 0

  core.info(`Posting ${annotationsCount}`)
  const sha = getSha()

  const resp = await client.checks.create({
    name,
    conclusion,
    // eslint-disable-next-line @typescript-eslint/camelcase
    head_sha: sha,
    owner,
    repo,
    output: {
      title: name,
      summary: summary ? summary : 'Output',
      text,
      annotations: annotations
        ? annotations.map(checks.convertAnnotation)
        : undefined,
    },
  })
  const { status, data } = resp
  if (status > 299) {
    core.error(`Failed to create check run: ${resp}`)
    throw new Error(`Failed to post check run [${status}]`)
  }

  core.info(
    `[${status}] Created check run ${data.id} for ${owner}/${repo} at ${sha}`,
  )
  return { status, data }
}
