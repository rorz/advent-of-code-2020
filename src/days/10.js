const processInput = (input) =>
  input
    .split("\n")
    .map((jolts) => +jolts)
    .sort((a, b) => a - b);

const answer1 = (adapters) =>
  adapters
    .map((current, index, self) =>
      index === self.length - 1 ? 3 : self[index + 1] - current
    )
    .reduce(
      ([ones, threes], current) =>
        current === 1 ? [ones + 1, threes] : [ones, threes + 1],
      [1, 0]
    )
    .reduce((total, current) => total * current, 1);

const options = { 1: [1, 2, 3], 2: [2, 3], 3: [3] };
const containsOption = (current, search, searchIndex) =>
  searchIndex > 0 && options[searchIndex].includes(search - current);

const answer2 = (adapters) =>
  [0, ...adapters]
    .map((current, index, self) =>
      self
        .slice(index, index + 4)
        .reduce(
          (total, search, searchIndex) =>
            total + +containsOption(current, search, searchIndex),
          0
        )
    )
    .reduce(
      ([total, currentMultiplier], current, index, self) =>
        self[index + 1] == null
          ? total
          : [
              total *
                (current !== 1 && self[index + 1] === 1
                  ? +(self[index - 1] > 1 && currentMultiplier - 1) + current
                  : 1),
              current === 1 || self[index + 1] === 1
                ? 1
                : +(self[index - 1] > 1 && currentMultiplier) + current,
            ],
      [1, 1]
    );

module.exports = { processInput, answer1, answer2 };
