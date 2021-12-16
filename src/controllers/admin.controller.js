
class AdminController {
  static async bestProfession(req, res) {
    const {start, end} = req.query;
    const {ReportService} = req.app.get('services');

    const bestRaw = await ReportService.bestProfession();
    const profession = bestRaw[0]['Contract.Contractor.profession'];

    res.json({
      profession,
    });
  }

  static async bestClients(req, res) {
    const {start, end, limit = 2} = req.query;
    const {ReportService} = req.app.get('services');

    const bestRaw = await ReportService.bestClients();

    const results = bestRaw.map((raw) => ({
      id: raw['Contract.Client.id'],
      paid: raw.totalPaid,
      fullName:
       `${raw['Contract.Client.firstName']} ${raw['Contract.Client.lastName']}`,
    }));

    res.json(results);
  }
}

module.exports = AdminController;

