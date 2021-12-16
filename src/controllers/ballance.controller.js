class BalanceController {
  static async deposit(req, res) {
    const {ProfileService, JobService} = req.app.get('services');
    const user = req.profile;

    const {amount = 0} = req.body;

    const normalizedAmount = Number(amount);

    const jobs = await JobService.getJobs(user.id);

    // Get total price of all ongoing jobs
    const totalPrice = jobs.reduce((pV, cV) => pV + cV.price, 0);

    const depositPerc = normalizedAmount / totalPrice > 0.25;

    if (depositPerc) {
      return res.status(400).json({
        message: `You can't deposit more than ${0.25 * totalPrice}`,
      });
    }

    await ProfileService.deposit(user.id, normalizedAmount);

    res.json({
      message: 'Ok',
    });
  }
}

module.exports = BalanceController;
