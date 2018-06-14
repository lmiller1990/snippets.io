const exec = require('child_process').exec

const context = (msg, cb) => describe(msg, cb)

describe("integration tests", () => {
  context("snippet by a commit hash", () => {
    it('works', () => {
      exec(
        "node parse.js resources/articles/article-with-line-numbers-snippet" , 
        (err, stdout, stderr) => {
          if (err) console.log(err)
          if (stderr) console.log(stderr)

          console.log(stdout)
        })
    })
  })
})
