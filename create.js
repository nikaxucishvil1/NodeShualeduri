#!/usr/bin/env node

const { Command } = require("commander");
const { readFile, writeFile } = require("./utils");

const program = new Command();

program
  .argument("<total>")
  .argument("<category>")
  .argument("<date>")
  .action(async (total, category, date) => {
    try {
      const dateRegex = /^(0[1-9]|[12]\d|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
      if (isNaN(Number(total))) throw new Error("enter correct total number");
      if (total < 1) throw new Error("enter correct total number");
      if (typeof category !== "string")
        throw new Error("enter correct category message");
      if (!dateRegex.test(date))
        throw new Error("enter correct date DD-MM-YYYY");

      const data = await readFile("expenses.json");
      const newData = { total: total, category: category, date: date };
      const pushData = [...data, newData];
      await writeFile("expenses.json", pushData);
      console.log("added new expense");
    } catch (error) {
      console.error("Error:", error.message);
    }
  });

program.parse();
