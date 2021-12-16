
const clientMiddleware = async (req, res, next) => {
  const user = req.profile;
  if (user.type !== 'client') {
    return res.status(400).json({
      message: 'User is not a client',
    });
  }

  next();
};
module.exports = clientMiddleware;
