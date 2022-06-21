import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserModel from "../database/userModel.js";
import validateData from "./modules/validateData.js";
dotenv.config({path: './.env'});

export default async function updateData(req, res) {
    const idUser = req.params.id;
    validateData(req, async (err, data) => {
        if(err) return res.writeHead(400, {'Content-Type': 'application/json'}).end(JSON.stringify({err}));
        
        const update = await UserModel.update({ ...data }, { where: { id: idUser } });

        // check successfuly update 
        if(update[0] === 0) return res.writeHead(500, {'Content-Type': 'application/json'}).end(JSON.stringify({err: `Fail update. The user may be missing in database. id user: ${idUser}`}));

        // update token
        const userData = await UserModel.findByPk(idUser);
        const token = jwt.sign(userData.dataValues, process.env.JWT_KEY);
        res.cookie('token_user', token);
        res.writeHead(200, {'Content-Type': 'application/json'}).end(JSON.stringify({message: 'update successfully'}));
        
    });
};