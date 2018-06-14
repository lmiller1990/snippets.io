const exec = require("child_process").exec
const path = require("path")
const fs = require("fs")

const markdownWithHashSnippet =  ''

const context = (msg, cb) => describe(msg, cb)

const expected = fs.readFileSync(path.join(__dirname, "..", "..", "resources", "articles", "article-with-line-numbers-snippet", "expected-output.md"), "utf8")

describe("integration tests", () => {
  context("snippet by a commit hash", () => {
    it("outputs the correct markdown", (done) => {
      expect.assertions(1)
      exec("node src/index.js ../resources/articles/article-with-line-numbers-snippet/article.md",
        (err, stdout, stderr) => {
          if (err) {
            console.log(err)
            return
          }
          if (stderr) {
            console.log(stderr)
            return
          }

          const actual = fs.readFileSync(path.join(__dirname, "..", "..", "resources", "articles", "article-with-line-numbers-snippet", "actual.md"), "utf8")

          expect(actual).toBe(expected)
          done()
        })
    })
  })
})
