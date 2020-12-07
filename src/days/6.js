const processInput = (input) => input.split("\n\n");

const processGroups = (reducer) => (groups) =>
  groups
    .map((group) =>
      group
        .split("\n")
        .map((answer) => [...answer])
        .reduce(reducer, 0)
    )
    .reduce((total, count) => total + count, 0);

const answer1 = processGroups(
  (total, answer, index, arr) =>
    total +
    (index === 0
      ? answer.length
      : answer.filter((char) => !arr.slice(0, index).flat().includes(char))
          .length)
);

const answer2 = processGroups(
  (total, answer, index, arr) =>
    total +
    +(
      index === 0 &&
      answer.filter((char) =>
        arr
          .slice(1, arr.length)
          .every((comparisonAnswer) => comparisonAnswer.includes(char))
      ).length
    )
);

module.exports = { answer1, answer2, processInput };
