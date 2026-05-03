// Node.js program to create a symlink
const { symlink } = require("fs");

// Specify the relative path to the external file
const externalFilePath = "../public/location.txt"; // Adjust the path as needed

// Specify the path where you want to create the symlink (within your project)
const symlinkPath = "./components/index.js"; // Adjust the path as needed

// Create the symlink
symlink(externalFilePath, symlinkPath, "file", (err) => {
  if (err) {
    console.error("Error creating symlink:", err);
  } else {
    console.log("Symlink created successfully.");
  }
});
