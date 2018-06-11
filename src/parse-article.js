const parseSnippet = require("./parse-snippet")
const simpleGit = require("simple-git/promise")(__dirname)

function show(branch, file) {
  return simpleGit.show([`${branch}:${file}`])
}

async function processArticle(article) {
  const lines = article.split("\n")
  let output = ""

  for (let i = 0; i <  lines.length; i++) {
    const line = lines[i]

    if (line.substr(0, 3) === "//#") {
      const {branch, file, lineNumbers} = parseSnippet(line)

      try {
        const text = await show(branch, file)
        const snippet = parseSnippet(text, lineNumbers)
        output = output + snippet
        await writeFile(`snippet${i}.md`, snippet)
      } catch (e) { 
        console.log(e)
      }


    } else {
      output = output + line + "\n"
    }
  }
}

module.exports = processArticle
