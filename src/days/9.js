const PREAMBLE_LENGTH = 25;

const processInput = (input) => input.split("\n").map((num) => +num);

/* 1 */
const sumExists = (target, options) =>
  options.some((option) =>
    options.find(
      (comparison) => option !== comparison && option + comparison === target
    )
  );

const findNonSum = (source, targets, index = 0) =>
  sumExists(targets[index], source.slice(index, index + PREAMBLE_LENGTH))
    ? findNonSum(source, targets, index + 1)
    : targets[index];

const answer1 = (source) =>
  findNonSum(source, source.slice(PREAMBLE_LENGTH, source.length));

/* 2 */
const sumSides = (set) => Math.min(...set) + Math.max(...set);

const findContiguousSum = (source, startIndex, endIndex = source.length) =>
  endIndex > startIndex &&
  ((source
    .slice(startIndex, endIndex)
    .reduce((total, current) => total + current, 0) === 542529149 &&
    sumSides(source.slice(startIndex, endIndex))) ||
    findContiguousSum(source, startIndex, endIndex - 1));

const answer2 = (source) =>
  source.map((_, index) => findContiguousSum(source, index)).find((val) => val);

module.exports = { answer1, answer2, processInput };
