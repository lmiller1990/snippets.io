#! /usr/bin/env node

const fs = require("fs")
const path = require("path")
const util = require("util")

const parseArticle = require("./parse-article")

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

async function main() {
  const file = process.argv[2]
  const filename = path.basename(file)
  const outputPath = file.replace(filename, "actual.md")
  try {
    const data = await readFile(file, "utf8")
    const output = await parseArticle(data)

    await writeFile(outputPath, output)
  } catch (err) {
    throw err
  }
}

main()
