const processInput = (input) =>
  input.split("\n").map((number) => Number(number));

const answer1 = (numbers) =>
  numbers
    .map((figure, fIndex) => [
      figure,
      numbers.find(
        (comparison, cIndex) =>
          fIndex !== cIndex && figure + comparison === 2020
      ),
    ])
    .filter(([, comparison]) => !!comparison)
    .slice(0, 1)
    .flat()
    .reduce((total, number) => total * number, 1);

const answer2 = (numbers) =>
  numbers
    .map((f1, f1Index) =>
      numbers
        .map((f2, f2Index) =>
          numbers.map((f3, f3Index) =>
            f1Index !== f2Index && f2Index !== f3Index && f3Index !== f1Index
              ? [f1, f2, f3]
              : null
          )
        )
        .flat()
    )
    .flat()
    .filter((value) => !!value)
    .find(([f1, f2, f3]) => f1 + f2 + f3 === 2020)
    .reduce((total, figure) => total * figure, 1);

module.exports = { answer1, answer2, processInput };
