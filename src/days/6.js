const processInput = (input) => input.split("\n\n");

const processGroups = (reducer) => (groups) =>
  groups
    .map((group) =>
      group
        .split("\n")
        .map((answer) => [...answer])
        .map(reducer)
        .reduce((total, count) => total + count)
    )
    .reduce((total, count) => total + count);

const answer1 = processGroups((answer, index, arr) =>
  index === 0
    ? answer.length
    : answer.filter((char) => !arr.slice(0, index).flat().includes(char)).length
);

const answer2 = processGroups(
  (answer, index, arr) =>
    +(
      index === 0 &&
      answer.filter((char) =>
        arr
          .slice(1, arr.length)
          .every((comparison) => comparison.includes(char))
      ).length
    )
);

module.exports = { answer1, answer2, processInput };
