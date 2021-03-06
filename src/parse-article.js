const {
  getSnippetDetails, 
  parseSnippet
} = require("./parse-snippet")
const simpleGit = require("simple-git/promise")(process.cwd())

function show(branch, hash, file) {
  const filename = file.split("?")[0]
  if (hash) {
    return simpleGit.show([`${hash}:${filename}`])
  }
  return simpleGit.show([`${branch}:${filename}`])
}

async function processArticle(article) {
  const lines = article.split("\n")
  let output = ""

  for (let i = 0; i <  lines.length; i++) {
    const line = lines[i]

    if (line.substr(0, 3) === "//#") {
      const {branch, file, hash, lineNumbers, fileExt} = getSnippetDetails(line)

      try {
        const text = await show(branch, hash, file)
        const snippet = parseSnippet(text, lineNumbers)
        output = output + "```" + fileExt + "\n" + snippet + "\n```\n"
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
