const processInput = (text) => text.split("\n");

const breakoutLine = (line) => ({
  targetCharacter: line.split(":")[0].split(" ")[1],
  characters: line.split(":")[1].trim().split(""),
  bounds: line.split(":")[0].split(" ")[0].split("-"),
});

const lineFilter = (line, processor) => processor(breakoutLine(line));

const answer1 = (passwords) =>
  passwords.filter((line) =>
    lineFilter(
      line,
      ({ targetCharacter, characters, bounds }) =>
        characters.filter((character) => character === targetCharacter)
          .length >= bounds[0] &&
        characters.filter((character) => character === targetCharacter)
          .length <= bounds[1]
    )
  ).length;

const answer2 = (passwords) =>
  passwords.filter((line) =>
    lineFilter(
      line,
      ({ targetCharacter, characters, bounds }) =>
        // Bitwise XOR in JS - https://stackoverflow.com/a/4540481/1180964
        !!(
          (characters[bounds[0] - 1] === targetCharacter) ^
          (characters[bounds[1] - 1] === targetCharacter)
        )
    )
  ).length;

module.exports = { answer1, answer2, processInput };
