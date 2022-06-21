import UserModel from '../database/userModel.js';

export default async function deleteUser(req, res) {
    const idUser = req.params.id;

    const delUser = await UserModel.destroy({ where: { id: idUser }});
    if(delUser === 0) return res.writeHead(500, {'Content-Type': 'applicaiton/json'}).end(JSON.stringify({err: 'Faild delete user'}));
    res.writeHead(200, {'Content-Type': 'application/json'}).end(JSON.stringify({message: 'Delete successfuly'}));

};