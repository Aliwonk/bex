import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import UserModel from '../database/userModel.js';
import validateData from './modules/validateData.js';
dotenv.config({path: './.env'});

export default async function authUser(req, res) {
    const { password } = req.body;

    validateData(req, 'auth', async (err, data) => {
        if(err) return res.writeHead(400, {'Content-Type': 'application/json'}).end(JSON.stringify({err}));

        // check email
        const checkEmail = await UserModel.findOne({ where: { email: data.email } });
        if(!checkEmail) return res.writeHead(404, {'Content-Type': 'application/json'}).end(JSON.stringify({err: 'User not found'}));


        // check password
        const hashPassword = checkEmail.dataValues.password;
        const checkPassword = bcrypt.compareSync(password, hashPassword);
        if(!checkPassword) return res.writeHead(400, {'Content-Type': 'application/json'}).end(JSON.stringify({err: 'Incorrect password'}));


        // send successfuly response
        const jwtKey = process.env.JWT_KEY;
        const token = jwt.sign(checkEmail.dataValues, jwtKey, { algorithm: 'HS256' }, { expiresIn: Math.floor(Date.now() / 1000) + (60 * 60) });
        res.cookie('token_user', token);
        delete checkEmail.dataValues.password;
        res.writeHead(200, {'Content-Type': 'application/json'}).end(JSON.stringify({message: 'Login successful', data: checkEmail.dataValues}));

    });

};