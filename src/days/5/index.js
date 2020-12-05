const fs = require("fs");

const input = fs.readFileSync(`${__dirname}/input.txt`, "utf-8");
const seatCodes = input.split("\n").map((seatNumber) => seatNumber.trim());

// const getNumber = (code, limit, upperChar) =>
//   [...code].reduce(
//     ([floor, ceil], char, index) => {
//       const isUpper = char === upperChar;
//       if (index === code.length - 1) {
//         return isUpper ? ceil : floor;
//       }
//       return isUpper
//         ? [floor + Math.ceil((ceil - floor) / 2), ceil]
//         : [floor, floor + Math.ceil((ceil - floor) / 2)];
//     },
//     [0, limit]
//   );

const getNumber = (code, upperChar, lowerChar) =>
  parseInt(Number(code.split(upperChar).join(1).split(lowerChar).join(0)), 2);

const answer1 = () => {
  const seatIds = seatCodes.map((seatCode) => {
    const rowCode = seatCode.slice(0, 7);
    const colCode = seatCode.slice(7, 10);
    const rowNumber = getNumber(rowCode, "B", "F");
    const colNumber = getNumber(colCode, "R", "L");
    const seatId = rowNumber * 8 + colNumber;
    return seatId;
  });

  // return seatIds;s
  return seatIds.sort((a, b) => b - a)[0];
};

// const padBinary = (string, maxLength) => string.padStart(maxLength, "0");

// const answer2 = () => {
//   // Max column = 119
//   const allSeatCodes = [...Array(120)]
//     .map((_, rowNumber) =>
//       [...Array(8)].map(
//         (__, colNumber) =>
//           `${padBinary(rowNumber.toString(2), 7)
//             .split("0")
//             .join("F")
//             .split("1")
//             .join("B")}${padBinary(colNumber.toString(2), 3)
//             .split("0")
//             .join("L")
//             .split("1")
//             .join("R")}`
//       )
//     )
//     .flat();
//   // return seatCodes.filter((seatCode) => allSeatCodes.includes(seatCode)).length;
//   return seatCodes.length;
// };

const answer2 = () => {
  const seatNumbers = seatCodes.map((seatCode) => {
    const rowCode = seatCode.slice(0, 7);
    const colCode = seatCode.slice(7, 10);
    const rowNumber = getNumber(rowCode, "B", "F");
    const colNumber = getNumber(colCode, "R", "L");
    return [rowNumber, colNumber];
  });

  const lowestRow = seatNumbers.sort((a, b) => a[0] - b[0])[0][0];
  const highestRow = seatNumbers.sort((a, b) => b[0] - a[0]);

  const allSeatNumbers = [...Array(120)]
    .map((_, rowIndex) =>
      [...Array(8)].map((__, colIndex) => [rowIndex, colIndex])
    )
    .flat()
    .filter(([rowIndex]) => rowIndex > lowestRow); //FIXME:

  const missingSeatNumber = allSeatNumbers.find(
    ([rowIndex, colIndex]) =>
      !seatNumbers.find(([rI, cI]) => rowIndex === rI && colIndex === cI)
  );

  return missingSeatNumber[0] * 8 + missingSeatNumber[1];
  // return seatIds.sort((a, b) => b - a)[0];
};

module.exports = { answer1, answer2 };
