import * as exec from '@actions/exec'
import { ExecOptions } from '@actions/exec/lib/interfaces'

interface CommandOutput {
  stdout: string
  stderr: string
}

/**
 * Run a shell command and capture the output. Removes some of the boilerplate
 * from using `exec.exec`.
 */
export async function execAndCapture(
  command: string,
  args: string[],
  opt: ExecOptions = {},
): Promise<CommandOutput> {
  let stdout = ''
  let stderr = ''

  opt = {
    ...opt,
    listeners: {
      stdout: (data: Buffer): void => {
        stdout += data.toString()
      },
      stderr: (data: Buffer): void => {
        stderr += data.toString()
      },
    },
  }

  await exec.exec(command, args, opt)
  stdout = stdout.trim()
  stderr = stderr.trim()

  return { stdout, stderr }
}
