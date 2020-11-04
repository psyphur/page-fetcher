const args = process.argv.slice(2);
const URL = args[0];
const DL_PATH =  args[1];

module.exports = {
  URL,
  DL_PATH,
}