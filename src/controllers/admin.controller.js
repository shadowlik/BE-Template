
class AdminController {
  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @return {Promise<void>}
   */
  static async bestProfession(req, res) {
    const {start, end} = req.query;
    const {ReportService} = req.app.get('services');

    const bestRaw = await ReportService.bestProfession(start, end);

    if (!bestRaw || bestRaw.length === 0) {
      return res.status(404).json('404 Not found');
    }

    const profession = bestRaw[0]['Contract.Contractor.profession'];

    res.json({
      profession,
    });
  }

  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @return {Promise<void>}
   */
  static async bestClients(req, res) {
    const {start, end, limit = 2} = req.query;
    const {ReportService} = req.app.get('services');

    const bestRaw = await ReportService.bestClients(start, end, limit);

    const results = (bestRaw || []).map((raw) => ({
      id: raw['Contract.Client.id'],
      paid: raw.totalPaid,
      fullName:
       `${raw['Contract.Client.firstName']} ${raw['Contract.Client.lastName']}`,
    }));

    res.json(results);
  }
}

module.exports = AdminController;

