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

const answer2 = (instructions) =>
  instructions
    .map((instruction) => instruction.substr(0, 3))
    .map((instruction, index) =>
      instruction === "jmp" || instruction === "nop" ? index : null
    )
    .filter((val) => !!val)
    .map((targetIndex) =>
      instructions
        .slice()
        .map((instruction, index) =>
          index === targetIndex
            ? instruction.replace(
                instruction.substr(0, 3),
                instruction.substr(0, 3) === "jmp" ? "nop" : "jmp"
              )
            : instruction
        )
    )
    .map((variant) =>
      variant.reduce(
        ([nextInstructionIndex, accumulator], _, index, self) =>
          nextInstructionIndex === self.length
            ? [nextInstructionIndex, accumulator]
            : nextInstructionIndex > self.length ||
              accumulator === null ||
              index === self.length - 1
            ? [null, null]
            : [
                nextInstructionIndex +
                  (self[nextInstructionIndex].split(" ")[0] === "jmp"
                    ? +self[nextInstructionIndex].split(" ")[1]
                    : 1),
                accumulator +
                  (self[nextInstructionIndex].split(" ")[0] === "acc"
                    ? +self[nextInstructionIndex].split(" ")[1]
                    : 0),
              ],
        [0, 0]
      )
    )
    .filter(([, value]) => !!value)[0][1];

module.exports = { answer1, answer2, processInput };
