class ContractController {
  static async getById(req, res) {
    const {ContractService} = req.app.get('services');
    const {id: userId} = req.profile;

    const {id} = req.params;

    const contract = await ContractService.getUserContractById(id, userId);
    if (!contract) return res.status(404).end();
    res.json(contract);
  }

  static async getContracts(req, res) {
    const {ContractService} = req.app.get('services');
    const {id: userId} = req.profile;
    const {status} = req.query;

    let statusFilter;
    if (status) statusFilter = status.split(',');

    const contracts =
      await ContractService
          .getUserContracts(userId, statusFilter);

    res.json(contracts);
  }
}

module.exports = ContractController;
