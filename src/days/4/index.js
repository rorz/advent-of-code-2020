const fs = require("fs");

const input = fs.readFileSync(`${__dirname}/input.txt`, "utf-8");
const passports = input.split("\n\n");

const requiredFields = [
  "byr",
  "iyr",
  "eyr",
  "hgt",
  "hcl",
  "ecl",
  "pid",
  // "cid"
];

const answer1 = () =>
  passports.reduce(
    (count, passport) =>
      count +
      +(
        requiredFields.filter((requiredField) =>
          passport
            .split(/(\s+)/)
            .map((pair) => pair.split(":")[0])
            .includes(requiredField)
        ).length === requiredFields.length
      ),
    0
  );

const fieldIsValid = ([field, value]) =>
  field &&
  {
    byr: () => /(19[2-8][0-9]|199[0-9]|200[0-2])/.test(+value),
    iyr: () => /(201[0-9]|2020)/.test(+value),
    eyr: () => /(202[0-9]|2030)/.test(+value),
    hgt: () =>
      /(59|6[0-9]|7[0-6]in)/.test(value) ||
      /(1[5-8][0-9]|19[0-3]cm)/.test(value),
    hcl: () => /(#[0-9a-fA-F]{6})/.test(value),
    ecl: () => /(amb|blu|brn|gry|grn|hzl|oth)/.test(value),
    pid: () => /^\d{9}$/.test(value),
  }[field]();

const answer2 = () =>
  passports.reduce(
    (count, passport) =>
      count +
      +(
        requiredFields.filter((requiredField) =>
          fieldIsValid(
            (
              passport
                .split(/(\s+)/)
                .find((pair) => pair.split(":")[0] === requiredField) || ":"
            ).split(":")
          )
        ).length === requiredFields.length
      ),
    0
  );

module.exports = {
  answer1,
  answer2,
};
