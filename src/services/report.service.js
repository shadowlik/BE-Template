const sequelize = require('sequelize');
// TODO: maybe do by dependency injection
const {Profile, Job, Contract} = require('../models');
const {Op} = require('sequelize');

class ReportService {
  static async bestProfession(start, end, limit = 1) {
    // TODO: Transform this to a centralized function later
    let dateQuery = {};
    const startQuery = start ? {[Op.gte]: new Date(start)} : {};
    const endQuery = end ? {[Op.lte]: new Date(end)} : {};
    if (start || end) {
      dateQuery = {
        paymentDate: {
          ...startQuery,
          ...endQuery,
        },
      };
    }

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
        ...dateQuery,
      },
    });
  }

  static async bestClients(start, end, limit = 2) {
    // TODO: Transform this to a centralized function
    let dateQuery = {};
    const startQuery = start ? {[Op.gte]: new Date(start)} : {};
    const endQuery = end ? {[Op.lte]: new Date(end)} : {};
    if (start || end) {
      dateQuery = {
        paymentDate: {
          ...startQuery,
          ...endQuery,
        },
      };
    }

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
        ...dateQuery,
      },
    });
  }
}

module.exports = ReportService;
