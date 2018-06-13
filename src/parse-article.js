const {
  getSnippetDetails, 
  parseSnippet
} = require("./parse-snippet")
const simpleGit = require("simple-git/promise")(__dirname)

function show(branch, file) {
  const filename = file.split("?")[0]
  return simpleGit.show([`${branch}:${filename}`])
}

async function processArticle(article) {
  const lines = article.split("\n")
  let output = ""

  for (let i = 0; i <  lines.length; i++) {
    const line = lines[i]

    if (line.substr(0, 3) === "//#") {
      const {branch, file, lineNumbers} = getSnippetDetails(line)

      try {
        console.log(branch, file, lineNumbers)
        const text = await show(branch, file)
        console.log("text", text)
        const snippet = parseSnippet(text, lineNumbers)
        output = output + snippet
      } catch (e) { 
        console.log("Error", e)
      }
    } else {
      output = output + line + "\n"
    }
  }

  return output
}

module.exports = processArticle
