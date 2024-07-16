const fs = require("fs/promises");

const readFile = async (URL) => {
  const data = await fs.readFile(URL, "utf-8");
  return JSON.parse(data);
};

const writeFile = async (URL, data) => {
  await fs.writeFile(URL, JSON.stringify(data));
};

module.exports = { readFile, writeFile };
