const prompts = require("prompts");
const fs = require("fs");

const days = [...Array(fs.readdirSync(`${__dirname}/days`).length + 1)].map(
  (_, index) => index !== 0 && require(`./days/${index}`)
);

(async () =>
  Object.entries(
    await prompts([
      {
        type: "number",
        name: "day",
        message: "Which day would you like to run?",
        validate: (value) => value <= days.length - 1,
        initial: days.length - 1,
      },
      {
        type: "number",
        name: "answer",
        message: "Answer 1 or 2?",
        validate: (value) => value === 1 || value === 2,
        initial: days[days.length - 1].answer2 ? 2 : 1,
      },
    ])
  )
    .sort(([a], [b]) => (a < b ? 1 : -1))
    .map(([, value]) => value)
    .reduce(
      (funcs, currentValue, index, arr) =>
        index === 0
          ? [
              days[currentValue][`answer${arr[1]}`],
              days[currentValue].processInput,
            ]
          : console.log(
              funcs[0](
                funcs[1](
                  fs.readFileSync(`${__dirname}/inputs/${arr[0]}.txt`, "utf-8")
                )
              )
            ),
      []
    ))();
