class JobController {
  static async getJobs(req, res) {
    const {JobService} = req.app.get('services');
    const {id: userId} = req.profile;

    const Jobs = await JobService.getJobs(userId);

    res.json(Jobs);
  }

  static async payJob(req, res) {
    const {JobService, ProfileService} = req.app.get('services');
    const user = req.profile;
    const {job_id: jobId} = req.params;

    const job = await JobService.getById(jobId, user.id);

    // Job not found or not an user job
    if (!job) return res.status(404).json({message: 'Job not found'});

    // Job was already paid, no need to pain again
    if (job.paid) {
      return res.status(400).json({
        message: 'Job already paid',
      });
    }

    if (user.balance < job.price) {
      return res.status(400).json({
        message: 'Not enough balance', balance: user.balance,
      });
    }

    // TODO: Do a rollback if something fails, maybe something with transactions
    await Promise.all(
        [ProfileService.withdrawalBalance(user.id, job.price),
          JobService.payJob(job.id)],
    );

    res.json({
      message: `Job ${job.id} paid`,
    });
  }
}

module.exports = JobController;
