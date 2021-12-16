const {Op} = require('sequelize');
const {Job, Contract} = require('../models');

class JobService {
  /**
     *
     * @param {*} id
     * @param {*} ClientId
     * @return {Promise}
     */
  static async getById(id, ClientId) {
    return await Job.findOne({
      include: [{
        model: Contract,
        where: {ClientId},
      }],
      where: {id},
    });
  }

  /**
     *
     * @param {*} id
     * @return {Promise}
     */
  static async payJob(id) {
    return await Job.update({paid: true}, {where: {id}});
  }

  /**
     *
     * @param {number} ClientId
     * @param {boolean} paid
     * @param {string[]} status
     * @return {Promise}
     */
  static async getJobs(
      ClientId, paid = [false, null], status = ['in_progress']) {
    return await Job.findAll({
      where: {
        paid: {[Op.or]: paid},
      },
      include: [{
        model: Contract,
        where: {ClientId, status},
      }],
    });
  }
}

module.exports = JobService;
