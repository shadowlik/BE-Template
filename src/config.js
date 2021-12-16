module.exports = {
  log: !process.env.NODE_ENV || process.env.NODE_ENV === 'dev',
};
