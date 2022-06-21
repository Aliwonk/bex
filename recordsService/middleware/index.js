import jwt from 'jsonwebtoken';
import { AdminModel } from '../database/recordModel.js';

export default async function checkAuth(req, res, next) {
    const { token_admin } = req.cookies;

    // check token
    if(!token_admin) return res.writeHead(401, {'Content-Type': 'application/json'}).end(JSON.stringify({err: 'Unauthorized'}));

    const decodeToken = jwt.verify(token_admin, process.env.JWT_KEY);
    const checkAdmin = await AdminModel.findOne({ where: { login: decodeToken.login, password: decodeToken.password }});
    if(!checkAdmin) return res.writeHead(401, {'Content-Type': 'application/json'}).end(JSON.stringify({err: 'Unauthorized'}));

    next();
};