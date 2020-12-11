const processInput = (input) =>
  input
    .split("\n")
    .map((jolts) => +jolts)
    .sort((a, b) => a - b);

const answer1 = (adapters) => {
  const differences = adapters.map((current, index, self) =>
    index === self.length - 1 ? 3 : self[index + 1] - current
  );
  return differences
    .reduce(
      ([ones, threes], current) =>
        current === 1 ? [ones + 1, threes] : [ones, threes + 1],
      [1, 0]
    )
    .reduce((total, current) => total * current, 1);
};

const answer2 = (adapters) =>
  [0, ...adapters]
    .map((current, index, self) => {
      let numChoices = 0;

      if (index === self.length - 1) {
        numChoices = 1;
      }
      if (
        self[index + 1] - current === 1 ||
        self[index + 1] - current === 2 ||
        self[index + 1] - current === 3
      ) {
        numChoices += 1;
      }
      if (self[index + 2] - current === 2 || self[index + 2] - current === 3) {
        numChoices += 1;
      }
      if (self[index + 3] - current === 3) {
        numChoices += 1;
      }

      return numChoices;
    })
    .reduce(
      ([total, currentMultiplier], current, index, self) => {
        const next = self[index + 1];
        const prev = self[index - 1];
        if (next == null) return total;
        if (current === 1) {
          return [total, 1];
        }
        if (next === 1) {
          return [total * (+(prev > 1 && currentMultiplier - 1) + current), 1];
        }
        return [total, +(prev > 1 && currentMultiplier) + current];
      },
      [1, 1]
    );

module.exports = { processInput, answer1, answer2 };
