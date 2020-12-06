const fs = require("fs");

const text = fs.readFileSync(`${__dirname}/input.txt`, "utf-8");
const numbers = text.split("\n").map((number) => Number(number));

const answer1 = () =>
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

const answer2 = () =>
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

// {
//   let numberTriplet = [0, 0, 0];
//   input.forEach((figure1, f1Index) => {
//     input.forEach((figure2, f2Index) => {
//       input.forEach((figure3, f3Index) => {
//         if (f1Index !== f2Index && f1Index !== f3Index && f2Index !== f3Index) {
//           if (figure1 + figure2 + figure3 === 2020) {
//             numberTriplet = [figure1, figure2, figure3];
//           }
//         }
//       });
//     });
//   });
//   return numberTriplet[0] * numberTriplet[1] * numberTriplet[2];
// };

module.exports = { answer1, answer2 };
