// TODO: maybe do by dependency injection
const {Contract} = require('../models/contract.model');

class ContractService {
  /**
     * Get Contract by id
     *
     * @param {Number} id - Contract ID
     */
  static async getById(id) {
    return await Contract.findOne({where: {id}});
  }

  /**
     * Get User Contract by id
     *
     * @param {number} id - Contract ID
     * @param {number} ClientId - User ID
     * @return {Promise}
     */
  static async getUserContractById(id, ClientId) {
    return await Contract.findOne({where: {id, ClientId}});
  }

  /**
     * Get User Contracts
     *
     * @param {number} ClientId - User ID
     * @param {string[]} status - status ['new', 'in_progress', 'terminated']
     * @return {Promise}
     */
  static async getUserContracts(ClientId, status = ['new', 'in_progress']) {
    return await Contract.findAll({where: {ClientId, status}});
  }
}

module.exports = ContractService;
