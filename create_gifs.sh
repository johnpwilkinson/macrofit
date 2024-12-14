#!/bin/bash

# Define the base directory where the exercise folders are located
BASE_DIR="/Users/jp/Documents/code/exercisedb/free-exercise-db/exercises"

# Create a directory for the GIFs if it doesn't exist
GIF_DIR="$BASE_DIR/gifs"
mkdir -p "$GIF_DIR"

# Loop through each exercise folder
for exercise_folder in "$BASE_DIR"/*/; do
  # Get the exercise name from the folder path
  exercise_name=$(basename "$exercise_folder")

  # Define the paths to the images
  img1="$exercise_folder/0.jpg"
  img2="$exercise_folder/1.jpg"

  # Define the output GIF file path
  gif_output="$GIF_DIR/$exercise_name.gif"

  # Check if both images exist before creating the GIF
  if [[ -f "$img1" && -f "$img2" ]]; then
    # Use ImageMagick to create the GIF
    convert -delay 100 -loop 0 "$img1" "$img2" "$gif_output"
    echo "Created GIF: $gif_output"
  else
    echo "Images not found for exercise: $exercise_name"
  fi
done
