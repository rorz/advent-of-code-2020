const processInput = (input) =>
  input.split("\n").map((seatNumber) => seatNumber.trim());

const ROW_LEN = 7;
const COL_LEN = 3;
const MAX_COL = 7;

const getNumber = (code, upperChar, lowerChar) =>
  parseInt(Number(code.split(upperChar).join(1).split(lowerChar).join(0)), 2);

const expandSeatCode = (seatCode) => [
  getNumber(seatCode.slice(0, ROW_LEN), "B", "F"),
  getNumber(seatCode.slice(-COL_LEN), "R", "L"),
];

const getSeatId = (row, col) => row * 8 + col;

const answer1 = (seatCodes) =>
  seatCodes
    .map((seatCode) => getSeatId(...expandSeatCode(seatCode)))
    .sort((a, b) => b - a)[0];

const answer2 = (seatCodes) =>
  [
    seatCodes
      .map((seatCode) => expandSeatCode(seatCode))
      // https://stackoverflow.com/a/35998676/1180964
      .sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]))
      .find(
        ([, colIndex], index, array) =>
          !(
            colIndex === MAX_COL ||
            (colIndex !== MAX_COL && array[index + 1][1] === colIndex + 1)
          )
      ),
  ].map(([rowIndex, colIndex]) => getSeatId(rowIndex, colIndex + 1))[0];

module.exports = { answer1, answer2, processInput };
