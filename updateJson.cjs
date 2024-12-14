const fs = require("fs");
const path = require("path");

// Path to the original JSON file
const jsonFilePath =
  "/Users/jp/Documents/code/exercisedb/free-exercise-db/dist/exercises.json"; // Update this to the correct path
const gifsDir =
  "/Users/jp/Documents/code/exercisedb/free-exercise-db/exercises/gifs"; // Update this to the correct path
const updatedJsonFilePath = "/Users/jp/Documents/pg/488/JSONs/exercises.json"; // Path for the new JSON file

// Read the JSON file
fs.readFile(jsonFilePath, "utf-8", (err, data) => {
  if (err) {
    console.error("Error reading JSON file:", err);
    return;
  }

  // Parse the JSON
  let exercises = JSON.parse(data);

  // Modify each exercise object
  exercises = exercises.map((exercise) => {
    const gifPath = `${exercise.id}.gif`; // Set the GIF path
    return {
      ...exercise,
      image: [gifPath], // Change the images key to image and set the GIF path
      images: undefined, // Remove the original images key
    };
  });

  // Write the updated JSON to a new file
  fs.writeFile(
    updatedJsonFilePath,
    JSON.stringify(exercises, null, 2),
    "utf-8",
    (err) => {
      if (err) {
        console.error("Error writing updated JSON file:", err);
      } else {
        console.log("Created updated JSON file with GIF paths successfully!");
      }
    }
  );
});
