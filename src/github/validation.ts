import { AnnotationLevel } from './types'

export function isAnnotationLevel(level: string): level is AnnotationLevel {
  const validLevels: AnnotationLevel[] = ['notice', 'warning', 'failure']
  return validLevels.includes(level as AnnotationLevel)
}
