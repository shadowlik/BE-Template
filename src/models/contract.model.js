const Sequelize = require('sequelize');
const {sequelize} = require('../conn');

class Contract extends Sequelize.Model {}
Contract.init(
    {
      terms: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('new', 'in_progress', 'terminated'),
      },
    },
    {
      sequelize,
      modelName: 'Contract',
    },
);

exports.Contract = Contract;
