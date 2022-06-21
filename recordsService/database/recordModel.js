import Sequelize from 'sequelize';
import dataBase from './index.js';

const AdminModel = dataBase.define('admin', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true
    },

    login: {
        type: Sequelize.STRING
    },

    password: {
        type: Sequelize.STRING
    }
});

const RecordModel = dataBase.define('record', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },

    caption: {
        type: Sequelize.STRING,
        allowNull: false
    },

    description: {
        type: Sequelize.STRING,
        allowNull: false
    }

});

export {
    AdminModel,
    RecordModel
}