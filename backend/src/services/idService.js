const { customAlphabet } = require("nanoid");
const alphabet =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const nanoid = customAlphabet(alphabet, 7);

function generateSlug(len = 7) {
  return nanoid(len);
}

module.exports = { generateSlug };