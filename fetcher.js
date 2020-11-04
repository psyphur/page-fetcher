const request = require('request');
const fs = require('fs');
const rl = require('./userInput');
const { URL, DL_PATH } = require('./constants');

request(URL, (err, res, body) => {
  const FILE_SIZE = res.headers["content-length"];

  if (res.statusCode !== 200) {
    console.log("Error: ", res.statusCode);
    process.exit();
  }

  const writeFile = () => {
    fs.writeFile(DL_PATH, body, (err) => {
      if (err) throw err;
      console.log(`Downloaded and saved ${FILE_SIZE} bytes to ${DL_PATH}`);
      process.exit();
    });
  };

  fs.access(DL_PATH, (err) => {
    if (!err) {
      rl.question("File already exists. Overwrite? (Y/N) ", (ans) => {
        switch (ans) {
        case "Y":
          writeFile();
          break;
        case "N":
          console.log("Did not overwrite.");
          process.exit();
        default:
          console.log("Invalid input. File was not saved.");
          process.exit();
        }
      });
    } else {
      writeFile();
    }
  });
});