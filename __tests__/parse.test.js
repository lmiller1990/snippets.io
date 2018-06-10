const { createSnippet } = require("../parse")

const context = (msg, cb) => describe(msg, cb)

describe("createSnippet", () => {
  context("a complete snippet", () => {
    it("write the text as is", () => {
      const snippet = "{ a one line snippet }"

      const result = createSnippet(snippet)

      expect(result).toBe(snippet)
    })
  })

  context("not a complete snippet", () => {

    it("prepends comments", () => {
      const snipToPrependComment = 
`ignore this line
entry: "...",
output: "..."`

      const result = createSnippet(snipToPrependComment, [2,3])

      expect(result).toEqual(
`// ...

entry: "...",
output: "..."`
      )
    })


    const snippetToAppend = 
`entry: "...",
output: "..."
ignore this line`

    it("appends snippet", () => {
      const result = createSnippet(snippetToAppend, [1, 2])

      expect(result).toEqual(
`entry: "...",
output: "..."

// ...`
      )
    })
  })

  context("a multiline block", () => {
    it("prepends and appends comments", () => {
      const snippet = 
`ignore this line
{
  "output": "/dist/main.js"
}
ignore this line`

      const result = createSnippet(snippet, [2,3,4])

      expect(result).toBe(
`// ...

{
  "output": "/dist/main.js"
}

// ...`
      )
    })
  })

  context("multiple seperate blocks", () => {
    it("prepends and appends comment before and after", () => {
      const snippet =
`{
  "entry": "/src/index.js",

  "something": "ignore",

  "output": "/dist/main.js"
}`
      const result = createSnippet(snippet, [1,2,6,7])

      expect(result).toBe(
`{
  "entry": "/src/index.js",

  // ...

  "output": "/dist/main.js"
}`
      )
    })
  })
})

