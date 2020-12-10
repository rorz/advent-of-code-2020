const processInput = (input) => input.split("\n").map((num) => +num);
const PREAMBLE_LENGTH = 25;
const TARGET_SUM = 542529149;

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

const contiguousSumExists = (source, startIndex, endIndex) =>
  source
    .slice(startIndex, endIndex)
    .reduce((total, current) => total + current, 0) === TARGET_SUM;

const findContiguousSum = (source, startIndex, endIndex = source.length) => {
  if (endIndex === startIndex + 1) {
    return false;
  }
  if (contiguousSumExists(source, startIndex, endIndex)) {
    const range = source.slice(startIndex, endIndex);
    console.log(source[startIndex], source[endIndex - 1]);
    return Math.min(...range) + Math.max(...range);
  }
  // console.log(startIndex, endIndex);
  // const nextStart = startIndex + +(endIndex === startIndex + 1);
  // const nextEnd = endIndex === startIndex + 1 ? source.length : endIndex - 1;
  return findContiguousSum(source, startIndex, endIndex - 1);
};

const answer2 = (source) =>
  source.map((_, index) => findContiguousSum(source, index)).find((val) => val);

module.exports = { answer1, answer2, processInput };
