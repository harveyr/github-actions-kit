/**
 * These are largely copied from Gtihub's typings. We can use those typings
 * directly once this is resolved: https://github.com/actions/toolkit/issues/199
 */

export type ChecksCreateParamsActions = {
  description: string
  identifier: string
  label: string
}

export type CheckRunConclusion =
  | 'success'
  | 'failure'
  | 'neutral'
  | 'cancelled'
  | 'timed_out'
  | 'action_required'

export type ChecksCreateParams = {
  actions?: ChecksCreateParamsActions[]
  completed_at?: string
  conclusion?: CheckRunConclusion
  details_url?: string
  external_id?: string
  head_sha: string
  name: string
  output?: ChecksCreateParamsOutput
  owner: string
  repo: string
  started_at?: string
  status?: 'queued' | 'in_progress' | 'completed'
}

export type ChecksCreateParamsOutput = {
  annotations?: ChecksCreateParamsOutputAnnotations[]
  images?: ChecksCreateParamsOutputImages[]
  summary: string
  text?: string
  title: string
}

export type ChecksCreateSuiteParams = {
  head_sha: string
  owner: string
  repo: string
}

export interface ChecksCreateParamsOutputAnnotations {
  annotation_level: AnnotationLevel
  end_column?: number
  end_line: number
  message: string
  path: string
  raw_details?: string
  start_column?: number
  start_line: number
  title?: string
}

export type ChecksCreateParamsOutputImages = {
  alt: string
  caption?: string
  image_url: string
}

export type AnnotationLevel = 'notice' | 'warning' | 'failure'

/**
 * ESLint-compatible interface for check run annotations. This prevents you from
 * having to disable the camelcase rule in your repo.
 */
export interface CheckRunAnnotation {
  level: AnnotationLevel
  startLine: number
  endLine?: number
  startColumn?: number
  endColumn?: number
  message: string
  path: string
  title?: string
}

/**
 * These are custom types:
 */

export interface CheckRunAbridged {
  githubToken: string
  name: string
  conclusion: CheckRunConclusion
  summary?: string
  text?: string
  annotations?: CheckRunAnnotation[]
}
