import {
  CheckRunAnnotation,
  ChecksCreateParamsOutputAnnotations,
} from './types'

/**
 * Converts an annotation object from our internal interface to what the Github API expects.
 * @param d
 */
export function convertAnnotation(
  d: CheckRunAnnotation,
): ChecksCreateParamsOutputAnnotations {
  const {
    title,
    level,
    message,
    path,
    startLine,
    endLine,
    startColumn,
    endColumn,
  } = d
  return {
    title,
    // eslint-disable-next-line @typescript-eslint/camelcase
    annotation_level: level,
    // eslint-disable-next-line @typescript-eslint/camelcase
    start_line: startLine,
    // eslint-disable-next-line @typescript-eslint/camelcase
    end_line: endLine ? endLine : startLine,
    // eslint-disable-next-line @typescript-eslint/camelcase
    start_column: startColumn,
    // eslint-disable-next-line @typescript-eslint/camelcase
    end_column: endColumn,
    message,
    path,
  }
}
