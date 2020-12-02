const input = require("./input-1.js");

const answer1 = () => {
  let numberPair = [0, 0];
  input.forEach((figure, fIndex) => {
    input.forEach((comparison, cIndex) => {
      if (fIndex !== cIndex && figure + comparison === 2020) {
        numberPair = [figure, comparison];
      }
    });
  });
  return numberPair[0] * numberPair[1];
};

const answer2 = () => {
  let numberTriplet = [0, 0, 0];
  input.forEach((figure1, f1Index) => {
    input.forEach((figure2, f2Index) => {
      input.forEach((figure3, f3Index) => {
        if (f1Index !== f2Index && f1Index !== f3Index && f2Index !== f3Index) {
          if (figure1 + figure2 + figure3 === 2020) {
            numberTriplet = [figure1, figure2, figure3];
          }
        }
      });
    });
  });
  return numberTriplet[0] * numberTriplet[1] * numberTriplet[2];
};

module.exports = { answer1, answer2 };
