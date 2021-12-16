const sequelize = require('sequelize');
const {Profile, Job, Contract} = require('../models');

class ReportService {
  static async bestProfession(start, end, limit = 1) {
    return Job.findAll({
      include: [
        {
          model: Contract,
          include: [
            {
              model: Profile,
              as: 'Contractor',
              required: true,
            },
          ],
        },
      ],
      attributes: [
        'price',
        [sequelize.fn('sum', sequelize.col('price')), 'totalPaid'],
      ],
      group: 'Contract.Contractor.profession',
      order: [
        [sequelize.col('totalPaid'), 'DESC'],
      ],
      limit,
      raw: true,
      where: {
        paid: true,
      },
    });
  }
  static async bestClients(start, end, limit = 2) {
    return Job.findAll({
      include: [
        {
          model: Contract,
          include: [
            {
              model: Profile,
              as: 'Client',
              required: true,
            },
          ],
        },
      ],
      attributes: [
        'price',
        [sequelize.fn('sum', sequelize.col('price')), 'totalPaid'],
      ],
      group: 'Contract.Client.id',
      order: [
        [sequelize.col('totalPaid'), 'DESC'],
      ],
      limit,
      raw: true,
      where: {
        paid: true,
      },
    });
  }
}

module.exports = ReportService;
