const exec = require("child_process").exec
const path = require("path")
const fs = require("fs")

const context = (msg, cb) => describe(msg, cb)

const expected = fs.readFileSync(path.join(__dirname, "..", "..", "resources", "articles", "article-with-hash-and-line-numbers", "expected-output.md"), "utf8")

describe("integration tests", () => {
  it("outputs the correct markdown", (done) => {
    expect.assertions(1)
    exec("node src/index.js resources/articles/article-with-hash-and-line-numbers/article.md",
      (err, stdout, stderr) => {
        if (err) {
          console.log(err)
          return
        }
        if (stderr) {
          console.log(stderr)
          return
        }

        const actual = fs.readFileSync(path.join(__dirname, "..", "..", "resources", "articles", "article-with-hash-and-line-numbers", "actual.md"), "utf8")

        expect(actual).toBe(expected)
        done()
      })
  })
})
