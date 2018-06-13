const fs = require("fs")
const path = require("path")
const util = require("util")

const processArticle = require("./src/parse-article")

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

async function main() {
  const filename = process.argv[2]
  try {
    const data = await readFile(path.join(__dirname, filename), "utf8")

    const output = await processArticle(data)

    writeFile(path.join(__dirname, "resources", "GUIDE_PARSED.md"), output)
  } catch (err) {
    throw err
  }
}

main()
  /*
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


*/

