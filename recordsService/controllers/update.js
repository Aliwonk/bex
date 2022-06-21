import { RecordModel } from '../database/recordModel.js';

export default async function updateRecord(req, res) {
    const idRecord = req.params.id;

    // update data
    const updateData = await RecordModel.update({ ...req.body }, { where: { id: idRecord } });

    // check update record
    if(updateData[0] === 0) return res.writeHead(500, {'Content-Type': 'application/json'}).end(JSON.stringify({err: 'Error update'}));
    
    res.writeHead(200, {'Content-Type': 'application/json'}).end(JSON.stringify({message: 'Update successfuly'}));
};