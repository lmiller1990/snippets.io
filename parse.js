const fs = require("fs")
const path = require("path")
const simpleGit = require("simple-git/promise")(__dirname)

const {removeContinuousDupEntries} = require("./utils")

fs.readFile("./JAPANESE.md", "utf8", async (err, data) => {
  const status = await simpleGit.status()

  if (err)
    throw err

  const lines = data.split("\n")
  let output = ""

  for (let i = 0; i <  lines.length; i++) {
    const line = lines[i]

    if (line.substr(0, 3) === "//#") {
      const {branch, file, lineNumbers} = getSnippetDetails(line)

      try {
        const text = await show(branch, file)
        const snippet = createSnippet(text, lineNumbers)
        output = output + snippet
        await writeFile(`snippet${i}.md`, snippet)
      } catch (e) { 
        console.log(e)
      }


    } else {
      output = output + line + "\n"
    }
  }
  writeFile("OUTPUT.md", output)
})

function writeFile(filename, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path.join(__dirname, "output", filename), content, (err, res) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

function show(branch, file) {
  return simpleGit.show([`${branch}:${file}`])
}

function getSnippetDetails(line) {
  const details = line.substr(4).split(":")
  return {
    branch: details[0],
    file: details[1],
    lineNumbers: details[2] ? processLineNums(details[2]) : null
  }
}

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

function createSnippet(text, lineNums) {
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
  // console.log(snippetLines)

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
  createSnippet,
}
