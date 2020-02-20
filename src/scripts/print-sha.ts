import * as github from '../github'

function main(): void {
  console.log('GITHUB_SHA: %s', process.env.GITHUB_SHA)
  console.log('github.context.sha: %s', github.getSha())
}

if (require.main === module) {
  main()
}
