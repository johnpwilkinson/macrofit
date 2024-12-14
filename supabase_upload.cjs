const { parse } = require("json2csv");
const fs = require("fs");
const updatedJsonFilePath = "/Users/jp/Documents/PG/488/JSONs/exercises.json";
fs.readFile(updatedJsonFilePath, "utf-8", (err, data) => {
  if (err) {
    console.error("Error reading updated JSON file:", err);
    return;
  }

  const exercises = JSON.parse(data);

  // Convert JSON to CSV
  const csv = parse(exercises);

  // Write CSV to file
  fs.writeFileSync("exercises.csv", csv);
});
