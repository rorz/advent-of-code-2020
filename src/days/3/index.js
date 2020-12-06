const fs = require("fs");

const text = fs.readFileSync(`${__dirname}/input.txt`, "utf-8");
const treeInput = text.split("\n");

const answer1 = () =>
  treeInput
    .map((row, _, arr) => [...Array(arr.length)].map(() => row).join(""))
    .reduce(
      (total, currentRow, rowIndex) =>
        total + +(currentRow[rowIndex * 3] === "#"),
      0
    );

const answer2 = () =>
  [1, 3, 5, 7, 0.5]
    .map((deltaCol) =>
      treeInput
        .map((row, _, arr) =>
          [...Array(Math.ceil((arr.length / row.length) * deltaCol))]
            .map(() => row)
            .join("")
        )
        .reduce(
          (total, currentRow, rowIndex) =>
            total + +(currentRow[rowIndex * deltaCol] === "#"),
          0
        )
    )
    .reduce((total, currentCollisions) => total * currentCollisions, 1);

module.exports = { answer1, answer2 };
