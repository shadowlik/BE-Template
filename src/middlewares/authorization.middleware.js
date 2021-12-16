
const authorizationMiddleware = async (req, res, next) => {
  const {ProfileService} = req.app.get('services');
  const profile = await ProfileService.getById(req.get('profile_id') || 0);
  if (!profile) return res.status(401).send('401 Unauthorized');

  req.profile = profile;
  next();
};
module.exports = authorizationMiddleware;
