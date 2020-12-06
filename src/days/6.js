const processInput = (input) => input.split("\n\n");

const sumGroups = (g) => g.reduce((total, count) => total + count, 0);

const answer1 = (groups) =>
  sumGroups(
    groups.map((group) =>
      group
        .split("\n")
        .map((answer) => [...answer])
        .reduce(
          (total, answer, index, arr) =>
            index === 0
              ? total + answer.length
              : total +
                answer.filter(
                  (char) => !arr.slice(0, index).flat().includes(char)
                ).length,

          0
        )
    )
  );

const answer2 = (groups) =>
  sumGroups(
    groups.map((group) =>
      group
        .split("\n")
        .map((answer) => [...answer])
        .reduce(
          (total, answer, index, arr) =>
            index === 0
              ? total +
                answer.filter((char) =>
                  arr
                    .slice(1, arr.length)
                    .every((comparisonAnswer) =>
                      comparisonAnswer.includes(char)
                    )
                ).length
              : total,
          0
        )
    )
  );

module.exports = { answer1, answer2, processInput };
