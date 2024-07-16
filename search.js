#!/usr/bin/env node

const { Command } = require("commander");
const { readFile } = require("./utils");

const program = new Command();

program.argument("<filter>").action(async (filter) => {
  try {
    const dateRegex = /^(0[1-9]|[12]\d|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
    const onlyLettersRegex = /^[a-zA-Z]+$/;
    const data = await readFile("expenses.json");

    let foundData = false;

    if (dateRegex.test(filter)) {
      const filteredData = data.filter((item) => item.date === filter);

      if (filteredData.length > 0) {
        foundData = true;
        console.log("expense on this date => ", JSON.stringify(filteredData));
      }
    }

    if (onlyLettersRegex.test(filter)) {
      const filteredData = data.filter((item) => item.category === filter);

      if (filteredData.length > 0) {
        foundData = true;
        console.log(
          "expense on this category => ",
          JSON.stringify(filteredData)
        );
      }
    }

    if (!foundData)
      throw new Error("Enter correct search format date or category");
  } catch (error) {
    console.error("Error:", error.message);
  }
});

program.parse();
