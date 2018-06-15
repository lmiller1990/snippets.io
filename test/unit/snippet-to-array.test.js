const { snippetToArray } = require("@/snippet-to-array")

const context = (msg, cb) => describe(msg, cb)

const trimLeft = lines => {
  let str = ""
  for (let line of lines.split("\n")) {
    str = str + line.trimLeft() + "\n"
  }

  return str.trimRight()
}

describe("snippetToArray", () => {
  context("no line numbers specified", () => {
    it("parses a snippet to an array", () => {
      const text = trimLeft(
        `const val = "1"
        return val
        `)

      const actual = snippetToArray(text)

      expect(actual).toEqual(['const val = "1"', "return val"])
    })
  })

  context("line numbers are specified", () => {
    it("returns array with specified numbers and // ... in place of other lines", () => {
      const text = trimLeft(
        `const val = "1"
         // this line will not be included
        return val
        `)

      const actual = snippetToArray(text, [1, 3])

      expect(actual).toEqual(['const val = "1"', "// ...", "return val"])
    })
  })
})
