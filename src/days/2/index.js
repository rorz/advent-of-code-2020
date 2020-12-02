const fs = require("fs");

const text = fs.readFileSync(`${__dirname}/input-1.txt`, "utf-8");
const passwords = text.split("\n");

const answer1 = () => {
  //
  const validPasswords = passwords.filter((line) => {
    const [rule, password] = line.split(":");
    const [bounds, targetCharacter] = rule.split(" ");
    const [min, max] = bounds.split("-");
    const characters = password.trim().split("");

    const numberOfTargetCharacters = characters.filter(
      (character) => character === targetCharacter
    ).length;

    console.log(numberOfTargetCharacters, min, max, targetCharacter);

    return numberOfTargetCharacters >= min && numberOfTargetCharacters <= max;
  }).length;

  return validPasswords;
};

const answer2 = () => {
  //
  const validPasswords = passwords.filter((line) => {
    const [rule, password] = line.split(":");
    const [bounds, targetCharacter] = rule.split(" ");
    const [posA, posB] = bounds.split("-");
    const characters = password.trim().split("");

    // Bitwise XOR in JS - https://stackoverflow.com/a/4540481/1180964
    // NICE
    return !!(
      (characters[posA - 1] === targetCharacter) ^
      (characters[posB - 1] === targetCharacter)
    );
  }).length;

  return validPasswords;
};

module.exports = { answer1, answer2 };
