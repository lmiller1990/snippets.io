const { removeContinuousDupEntries } = require("../utils")


describe('removeContinuousDupEntries', () => {
  it('merges any continuous entries into a single one', () => {
    const arrWithDups = ["a", "b", "b", "c", "b", "b"]

    const result = removeContinuousDupEntries(arrWithDups)

    expect(result).toEqual(["a", "b", "c", "b"])
  })
})
