const authMiddleware = require('./authorization.middleware');
const clientMiddlware = require('./client.middleware');

module.exports = {
  authMiddleware,
  clientMiddlware,
};
