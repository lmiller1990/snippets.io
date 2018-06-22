const simpleGit = require("simple-git/promise")(__dirname)
const { removeContinuousDupEntries } = require("./utils")
const { snippetToArray } = require("./snippet-to-array")

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
    fileExt: getFileExt(details[1]),
    lineNumbers: details[2] ? processLineNums(details[2]) : null,
    hash: getHash(details)
  }
}


function getHash(details) {
  const str = details.join("")
  if (!str.includes("?")) {
    return null
  }

  return str.split("?")[1]
}

function getFileExt(file) {
  // ignore hash param if present
  let arr = file.split("?")[0]

  arr = arr.split(".")
  return arr[arr.length-1]
}

function parseSnippet(text, lineNums) {
  const snippetLines = snippetToArray(text, lineNums)

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
