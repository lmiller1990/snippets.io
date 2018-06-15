const fs = require("fs")
const { removeContinuousDupEntries } = require("./utils")

Array.prototype.last = function() {
  return this[this.length]
}

function snippetToArray(text, lineNums) {
  let snippetLines = []
  let allLines = text.split("\n")

  // in the case there are no line numbers
  // the user wants to use the entire file as a snippet
  if (!lineNums) {
    return allLines
  }

  // else we should add comments for the lines the user did not specify
  for (let i = 0; i < allLines.length; i++) {
    if (lineNums.includes(i+1)) {
      snippetLines.push(allLines[i])
    } else {
      // should throw in a comment
      // except if the last line is a carriage return
      if (i+1 !== allLines.length) {
        snippetLines.push("// ...")
      }
    } 
  }

  return removeContinuousDupEntries(snippetLines)
}

module.exports = { snippetToArray }
