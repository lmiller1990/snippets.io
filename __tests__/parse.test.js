const { createSnippet } = require("../parse")

const context = (msg, cb) => describe(msg, cb)

const snippet =
`require("webpack")

module.exports = {
  entry: "./dist/main.js",
  output: "./dist/output.js"

}`

const snipToPrependComment = 
`ignore this line
entry: "...",
output: "..."`

const snippetToAppend = 
`entry: "...",
output: "..."
ignore this line`

describe("createSnippet", () => {
  context("not a complete snippet", () => {
    it("prepends comments", () => {
      const result = createSnippet(snipToPrependComment, [2,3])

      expect(result).toEqual(
`// ...

entry: "...",
output: "..."`
      )
    })

    it("appends snippet", () => {
      const result = createSnippet(snippetToAppend, [1, 2])

      expect(result).toEqual(
`entry: "...",
output: "..."

// ...`
      )
    })
  })
})


