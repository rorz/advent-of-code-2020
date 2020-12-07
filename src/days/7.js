const processInput = (input) =>
  input
    .split("\n")
    .map((line) =>
      line
        .split("contain")
        .map((part, index) =>
          index === 0
            ? part.trim().split(" ").slice(0, 2).join(" ")
            : part
                .split(", ")
                .map((condition) =>
                  condition
                    .trim()
                    .replace(".", "")
                    .split(" ")
                    .slice(0, 3)
                    .join(" ")
                )
        )
    );

const unique = (value, index, self) => self.indexOf(value) === index;

const uniqueContainerRules = (containers) =>
  containers.map(([rule]) => rule).filter(unique);

const findContainers = (rules, targets, carry = []) =>
  [
    rules.filter(
      ([, conditions]) =>
        !!targets.find((target) => conditions.includes(target))
    ),
  ].reduce(
    (next, self) =>
      self.length
        ? findContainers(rules, uniqueContainerRules(self), [
            ...carry,
            ...uniqueContainerRules(self),
          ])
        : carry,
    null
  );

const answer1 = (rules) =>
  findContainers(
    rules.map(([rule, conditions]) => [
      rule,
      conditions
        .map((condition) => condition.split(" ").slice(1, 3).join(" "))
        .filter((condition) => condition !== "other bags"),
    ]),
    ["shiny gold"]
  ).filter(unique).length;

const findNested = (rules, targets, carry = []) =>
  [
    targets
      .map((target) => rules.filter(([rule]) => rule === target))
      .flat()
      .map(([, conditions]) =>
        conditions
          .map((condition) =>
            [...new Array(Number(condition.split(" ")[0]))]
              .map(() => condition.split(" ").slice(1, 3).join(" "))
              .flat()
          )
          .flat()
      )
      .flat(),
  ].reduce(
    (next, self) =>
      self.length ? findNested(rules, self, [...carry, ...self]) : carry,
    null
  );

const answer2 = (rules) =>
  Object.values(
    findNested(
      rules.map(([rule, conditions]) => [
        rule,
        conditions.filter((condition) => condition !== "no other bags"),
      ]),
      ["shiny gold"]
    ).reduce(
      (totals, color) => ({
        ...totals,
        [`${color}`]: totals[color] ? totals[color] + 1 : 1,
      }),
      {}
    )
  ).reduce((total, count) => total + count, 0);

module.exports = { answer1, answer2, processInput };
