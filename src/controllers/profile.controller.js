
class ProfileController {
    static async listProfiles(req, res) {
        const {ProfileService} = req.app.get('services');
        const profiles = await ProfileService.list();
        res.json(profiles);
    }
}
  
  module.exports = ProfileController;
  
  