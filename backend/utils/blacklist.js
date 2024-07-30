const blacklist = new Set();

const add = (token) => {
  blacklist.add(token);
};

const isBlacklisted = (token) => {
  return blacklist.has(token);
};

module.exports = {
  add,
  isBlacklisted
};
