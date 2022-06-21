import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserModel from '../database/userModel.js';
dotenv.config({path: './.env'});

export default async function checkAuth(req, res, next) {
    
    const { token_user } = req.cookies;
    if(token_user) {
        const userData = jwt.verify(token_user, process.env.JWT_KEY);
        const { email } = userData;
    

        // get data from database
        const checkIdUser = await UserModel.findByPk(userData.id);

        if(!checkIdUser) return res.writeHead(401, {'Content-Type': 'application/json'}).end(JSON.stringify({err: 'Unauthorized'}));
        
        // check email
        const emailFromDB = checkIdUser.dataValues.email;
        if(email === emailFromDB) return next();
        
        res.writeHead(401, {'Content-Type': 'application/json'}).end(JSON.stringify({err: 'Unauthorized'}));
    
    }else {
        res.writeHead(401, {'Content-Type': 'application/json'}).end(JSON.stringify({err: 'Unauthorized'}));
    };

};