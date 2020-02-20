import * as github from '../github'

function main(): void {
  console.log('SHA: %s', github.getSha())
}

if (require.main === module) {
  main()
}
