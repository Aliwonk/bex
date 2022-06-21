import Sequelize from 'sequelize';
import dataBase from "./index.js";


const UserModel = dataBase.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },

    name: {
        type: Sequelize.STRING
    },

    surname: {
        type: Sequelize.STRING
    },

    gender: {
        type: Sequelize.STRING
    },

    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },

    phone: {
        type: Sequelize.BIGINT
    },
   
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },

    img: {
        type: Sequelize.STRING
    }
});

export default UserModel;