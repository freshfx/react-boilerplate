const childProcess = require('child_process')
const chalk = require('chalk')

const firstLine = str => str.split('\n')[0]

const exec = command => new Promise((resolve, reject) => {
  childProcess.exec(command, (err, stdout) => {
    if (err) {
      return reject(err)
    }
    return resolve(firstLine(stdout))
  })
})

const getRemote = async () => {
  try {
    const remote = await exec('git rev-parse --abbrev-ref --symbolic-full-name @{u}')
    return remote
  } catch (error) {
    return null
  }
}

const run = async () => {
  await exec('git fetch')
  const remote = await getRemote()
  if (!remote) {
    return
  }
  const count = await exec(`git rev-list HEAD..${remote} --count`)
  const commitsBehind = parseInt(count, 10)
  if (commitsBehind > 0) {
    throw new Error(`Your branch is behind '${remote}' by ${commitsBehind} commits.`)
  }
}

run()
  .then(() => {
    process.exit(0)
  })
  .catch(error => {
    process.stdout.write(chalk.red(` ✘ ${error.message}\n`))
    process.exit(1)
  })
