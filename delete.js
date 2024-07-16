#!/usr/bin/env node

const { Command } = require("commander");
const { readFile, writeFile } = require("./utils");

const program = new Command();

program
  .argument("<index>")
  .action(async (index) => {
    try {
      const data = await readFile("expenses.json");
      if (typeof data[index] === "undefined") throw new Error("item not found");
      const deletedData = data[index];
      data.splice(index, 1);
      await writeFile("expenses.json", data);
      console.log(`deleted ${JSON.stringify(deletedData)}`);
    } catch (error) {
      console.error("Error:", error);
    }
  });

program.parse();
