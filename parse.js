const fs = require("fs")
const path = require("path")
const simpleGit = require("simple-git/promise")(__dirname)

fs.readFile("./JAPANESE.md", "utf8", async (err, data) => {
  const status = await simpleGit.status()

  if (err)
    throw err

  const lines = data.split("\n")
  let output = ""

  for (let i = 0; i <  lines.length; i++) {
    const line = lines[i]

    if (line.substr(0, 3) === "//#") {
      console.log("Parsing", line)
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
  console.log(numbers)

  return numbers
}

function createSnippet(text, lineNums) {
  let linesToPrependComments = []
  let linesToAppendComments = []
  let snippet = ""

  if (!lineNums) {
    lineNums = text.split("\n").map((_, idx) => idx+1)
  }

  const allLines = text.split("\n")

  for (let i = 0; i < allLines.length; i++) {
    if (i === 0 && lineNums[0] !== 1) {
      snippet = snippet + "// ...\n\n"
    }

    if (lineNums.includes(i+1)) {
      snippet = snippet + allLines[i]

      // dont add newline to the end
      if (lineNums.indexOf(i+1) !== lineNums.length-1) {
        snippet = snippet + "\n"
      }

      // append comment if last line of 
      // snippet is not final line of entire file
      if (i+1 === lineNums.length && 
        lineNums[lineNums.length-1] !== allLines.length) {
  snippet = snippet + "\n\n// ..."
      }

    }
  }

  let indent = 100

    /*for (let i = 0; i < desiredLines.length; i++) {
    const line = desiredLines[i]
    const currLineIndent = /(\s*)/.exec(line)[1].length 
    indent = Math.min(indent, currLineIndent)
  }*/

  return snippet
}


module.exports = { createSnippet }
