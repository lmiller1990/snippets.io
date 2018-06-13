const simpleGit = require("simple-git/promise")(__dirname)
const { removeContinuousDupEntries } = require("./utils")

function processLineNums(lines) {
  const numbers = []
  const csv = lines.split(",")
  for (val of csv) {
    if (!val.includes("-")) {
      numbers.push(parseInt(val))
    } else {
      // case of 3-6
      const [start, end] = val.split("-")

      for (let i = start; i <= end; i++) {
        numbers.push(parseInt(i))
      }
    }
  }

  return numbers
}

function getSnippetDetails(line) {
  const details = line.substr(4).split(":")
  return {
    branch: details[0],
    file: details[1],
    lineNumbers: details[2] ? processLineNums(details[2]) : null
  }
}

function parseSnippet(text, lineNums) {
  if (!lineNums) {
    return text
  }

  let snippetLines = []
  let allLines = text.split("\n")

  if (allLines[allLines.length-1].length === 0) {
    allLines = allLines.slice(0, allLines.length-1)
  }

  for (let i = 0; i < allLines.length; i++) {
    if (lineNums.includes(i+1)) {
      snippetLines.push(allLines[i])
    } else {
      // should throw in a comment
      // except if the last line is a carriage return
      snippetLines.push("// ...")
    } 
  }

  snippetLines = removeContinuousDupEntries(snippetLines)

  let snippet = ""

  for (let i = 0; i < snippetLines.length; i++) {
    const line = snippetLines[i]

    if (line !== "// ...") {
      snippet = snippet + line

      if (i+1 < snippetLines.length) {
        snippet += "\n"
      }
    } else {
      const prewhitespace = /(\s*)/.exec(snippetLines[i-1])[1].length
      const indent = new Array(prewhitespace).fill(" ").join("")
      snippet = snippet + "\n" + indent + line + "\n\n"
    }
  }

  return snippet.trim()
}

module.exports = { 
  getSnippetDetails,
  parseSnippet
}
