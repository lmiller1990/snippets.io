const fs = require("fs")
const path = require("path")
const simpleGit = require("simple-git/promise")(__dirname)

fs.readFile("./GUIDE.md", "utf8", async (err, lines) => {
  const status = await simpleGit.status()

  if (err)
    throw err

  for (line of lines.split("\n")) {
    if (line.substr(0, 3) === "//#") {
      const {branch, file, lineNumbers} = getSnippetDetails(line)

      try {
        const text = await show(branch, file)
        const snippet = createSnippet(text, lineNumbers)
        console.log(snippet)

      } catch (e) { 
        console.log(e)
      }


    }
  }
})

function show(branch, file) {
  return simpleGit.show([`${branch}:${file}`])
}

function getSnippetDetails(line) {
  const details = line.substr(4).split(":")
  return {
    branch: details[0],
    file: details[1],
    lineNumbers: processLineNums(details[2])
  }
}

function processLineNums(lines) {
  const numbers = []
  const csv = lines.split(",")
  for (val of csv) {
    if (!val.includes("-")) {
      numbers.push(parseInt(val))
    }
  }

  return numbers
}

function createSnippet(text, lineNums) {
  const desiredLines = []

  const allLines = text.split("\n")

  for (let i = 0; i < allLines.length; i++) {
    const currentLine = allLines[i]
    const currentNo = i + 1

    if (lineNums.includes(currentNo)) {
      desiredLines.push(currentLine)
    }
  }

  return desiredLines
}
