import { RecordModel } from '../database/recordModel.js';

export default async function deleteRecord(req, res) {
    const idRecord = req.params.id;

    // delete record
    const deleteRecord = await RecordModel.destroy({ where: { id: idRecord } });

    // check update record
    console.log(deleteRecord);
    if(deleteRecord === 0) return res.writeHead(500, {'Content-Type': 'application/json'}).end(JSON.stringify({err: 'Error delete record'}));
    
    res.writeHead(200, {'Content-Type': 'application/json'}).end(JSON.stringify({message: 'Delete successfuly'}));
};