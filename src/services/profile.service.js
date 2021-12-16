const {Profile} = require('../models');

class ProfileService {
  static list() {
    return Profile.findAll();
  }
  /**
     * Get Profile by id
     *
     * @param {Number} id
     * @return {Promise}
     */
  static getById(id) {
    return Profile.findOne({where: {id}});
  }

  /**
     *
     * @param {*} id
     * @param {*} amount
     * @return {Promise}
     */
  static async withdrawalBalance(id, amount) {
    const normalizedAmount = Number(amount);

    const user = await Profile.findOne({where: {id}});

    const updatedUser = await Profile.update({
      balance: user.balance - normalizedAmount,
    },
    {
      where: {id},
      returning: true,
      plain: true,
    });

    return updatedUser;
  }

  /**
     *
     * @param {*} id
     * @param {*} amount
     * @return {Promise}
     */
  static async deposit(id, amount) {
    const user = await Profile.findOne({where: {id}});
    const newBalance = user.balance + Number(amount);

    return Profile.update({balance: newBalance}, {where: {id}});
  }
}

module.exports = ProfileService;
