import * as checks from './checks'
import { getOwnerAndRepo, getSha } from './constants'
import { CheckRunAbridged } from './types'

// TODO: Use the TS import once this is fixed: https://github.com/actions/toolkit/issues/199
// import * as github from '@actions/github'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const github = require('@actions/github')

export async function postCheckRun(data: CheckRunAbridged): Promise<unknown> {
  const { owner, repo } = getOwnerAndRepo()
  const { githubToken, name, conclusion, summary, text, annotations } = data

  if (!githubToken) {
    throw new Error('No Github token provided')
  }
  const client = new github.GitHub(githubToken)

  return client.checks.create({
    name,
    conclusion,
    // eslint-disable-next-line @typescript-eslint/camelcase
    head_sha: getSha(),
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
}
