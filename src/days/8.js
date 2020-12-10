const processInput = (input) => input.split("\n");

const answer1 = (instructions) => {
  let accumulator = 0;
  let currentIndex = 0;
  const processedIndices = [];
  while (!processedIndices.includes(currentIndex)) {
    processedIndices.push(currentIndex);
    const value = instructions[currentIndex];
    const [type, modifier] = value.split(" ");
    accumulator += type === "acc" ? +modifier : 0;
    currentIndex += type === "jmp" ? +modifier : 1;
  }
  return accumulator;
};

const splitIndex = (set, index) =>
  index !== set.length && set[index].split(" ");
const transposeCondition = (split, match, negative) =>
  +(split && split[0] === match ? +split[1] : negative);

const replaceInstruction = (targetIndex) => (instruction, index) =>
  index === targetIndex
    ? instruction.replace(
        instruction.substr(0, 3),
        instruction.substr(0, 3) === "jmp" ? "nop" : "jmp"
      )
    : instruction;
const createVariants = (source) => (targetIndex) =>
  source.slice().map(replaceInstruction(targetIndex));

const getOperator = (instruction) => instruction.substr(0, 3);
const isJumpOrNoop = (instruction) =>
  getOperator(instruction) === "jmp" || getOperator(instruction) === "nop";

const answer2 = (instructions) =>
  instructions
    .map((instruction, index) => isJumpOrNoop(instruction) && index)
    .filter((val) => !!val)
    .map(createVariants(instructions))
    .map((variant) =>
      variant.reduce(
        ([nextIndex, accumulator], _, index, self) => [
          nextIndex +
            +(
              nextIndex !== self.length &&
              transposeCondition(splitIndex(self, nextIndex), "jmp", 1)
            ),
          accumulator +
            +(
              nextIndex !== self.length &&
              transposeCondition(splitIndex(self, nextIndex), "acc", 0)
            ),
        ],
        [0, 0]
      )
    )
    .find(([finalIndex]) => finalIndex === instructions.length)[1];

module.exports = { answer1, answer2, processInput };
