const { parseSnippet } = require("@/parse-snippet")

const context = (msg, cb) => describe(msg, cb)

const trimLeft = lines => {
  let str = ""
  for (let line of lines.split("\n")) {
    str = str + line.trimLeft() + "\n"
  }

  return str.trimRight()
}

describe("parseSnippet", () => {
  context("a complete snippet", () => {
    it("write the text as is", () => {
      const snippet = "{ a one line snippet }"

      const result = parseSnippet(snippet)

      expect(result).toBe(snippet)
    })
  })

  context("not a complete snippet", () => {
    it("prepends comments", () => {
      const snipToPrependComment = 
        trimLeft(
          `ignore this line
          entry: "...",
          output: "..."`)

      const result = parseSnippet(snipToPrependComment, [2,3])

      expect(result).toEqual(
        trimLeft(
          `// ...

          entry: "...",
          output: "..."`)
      )
    })


    it("appends snippet", () => {
      const snippetToAppend = trimLeft(
        `entry: "...",
        output: "..."
        ignore this line`
      )

      const result = parseSnippet(snippetToAppend, [1, 2])

      expect(result).toEqual(
        trimLeft(
          `entry: "...",
          output: "..."

          // ...
         `)
      )
    })
  })

  context("a multiline block", () => {
    it("prepends and appends comments", () => {
      const snippet = trimLeft(
        `ignore this line
        {
          "output": "/dist/main.js"
        }
        ignore this line`)

      const result = parseSnippet(snippet, [2,3,4])

      expect(result).toBe(
          trimLeft(
          `// ...

          {
            "output": "/dist/main.js"
          }

          // ...`)
      )
    })
  })

  context("multiple seperate blocks", () => {
    it("prepends and appends comment before and after", () => {
      const snippet = trimLeft(
        `{
          "entry": "/src/index.js",

          "something": "ignore",

          "output": "/dist/main.js"
        }`)
      const result = parseSnippet(snippet, [1,2,6,7])

      expect(result).toBe(trimLeft(
        `{
          "entry": "/src/index.js",

          // ...

          "output": "/dist/main.js"
        }`)
      )
    })
  })
})

