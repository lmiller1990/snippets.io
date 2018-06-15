const { removeContinuousDupEntries } = require("./utils")

function snippetToArray(text, lineNums) {
  let snippetLines = []
  let allLines = text.split("\n")

  // in the case there are no line numbers
  // the user wants to use the entire file as a snippet
  if (!lineNums) {
    return text.split("\n")
  }

  // else we should add comments for the lines the user did not specify
  for (let i = 0; i < allLines.length; i++) {
    if (lineNums.includes(i+1)) {
      snippetLines.push(allLines[i])
    } else {
      // should throw in a comment
      // except if the last line is a carriage return
      snippetLines.push("// ...")
    } 
  }

  return removeContinuousDupEntries(snippetLines)
}

module.exports = { snippetToArray }
