import jwt from 'jsonwebtoken';
import { AdminModel } from '../database/recordModel.js';

export default async function auth(req, res) {
    const { login, password } = req.body;

    // check data on empty
    if(login === '' || password === '') return res.writeHead(404, {'Content-Type': 'application/json'}).end(JSON.stringify({err: 'Empty data'}));
    
    // checking data for compliance
    const adminData = await AdminModel.findOne({ where: { login, password } });
    if(!adminData) return res.writeHead(400, {'Content-Type': 'application/json'}).end(JSON.stringify({err: 'Incorrect login or password'}))

    // creating token for middleware
    const token = jwt.sign(adminData.dataValues, process.env.JWT_KEY);
    res.cookie('token_admin', token);

    // send successfuly response
    res.writeHead(200, {'Content-Type': 'application/json'}).end(JSON.stringify({message: 'Authorization successful'}));

};