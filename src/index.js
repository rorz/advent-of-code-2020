const prompts = require("prompts");
const fs = require("fs");

(async () => {
  const response = await prompts([
    {
      type: "number",
      name: "day",
      message: "Which day would you like to run?",
      // validate: value => value < TOTAL
    },
    {
      type: "number",
      name: "answer",
      message: "Answer 1 or 2?",
      validate: (value) => value === 1 || value === 2,
    },
  ]);
  const day = require(`./days/${response.day}`);
  const input = fs.readFileSync(
    `${__dirname}/inputs/${response.answer}.txt`,
    "utf-8"
  );
  const processedInput = day.processInput(input);
  console.log(processedInput);
  console.log(
    response.answer === 1
      ? day.answer1(processedInput)
      : day.answer2(processedInput)
  );
})();
