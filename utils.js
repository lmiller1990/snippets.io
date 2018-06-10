function removeContinuousDupEntries(arr) {
  const noDups = []

  for (let i = 0; i < arr.length; i++) {
    const curr = arr[i]

    if (arr[i+1] !== curr) {
      noDups.push(curr)
    }
  }

  return noDups
}

module.exports = { removeContinuousDupEntries }

