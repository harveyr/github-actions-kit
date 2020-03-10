import * as core from '@actions/core'
import * as github from '@actions/github'
import * as checks from './checks'
import { getOwnerAndRepo, getSha } from './constants'
import { CheckRunAbridged } from './types'

interface CheckRunResponse {
  status: number
  data: {
    id: number
  }
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

  const postAnnotationCount = annotations ? annotations.length : 0
  const respAnnotationCount = data.output.annotations_count || 0

  core.info(
    `[${status}] Created check run ${data.id} with ${respAnnotationCount} annotations for ${owner}/${repo} at ${sha}`,
  )

  if (postAnnotationCount !== respAnnotationCount) {
    core.warning(
      `Posted ${postAnnotationCount} annotations but ${respAnnotationCount} were in the response. Full response: ${JSON.stringify(
        data,
      )}`,
    )
  }

  return {
    status,
    data: {
      id: data.id,
    },
  }
}
