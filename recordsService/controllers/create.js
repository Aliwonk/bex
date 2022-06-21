import { RecordModel } from '../database/recordModel.js';

export default async function createRecord(req, res) {
    const { caption, description } = req.body;

    // validate data
    if(caption === '' || description === '') return res.writeHead(400, {'Content-Type': 'application/json'}).end(JSON.stringify({err: 'Empty data'}));

    // save reacord data
    const saveRecord = await RecordModel.create({ caption, description });

    if(!saveRecord) return res.writeHead(500, {'Content-Type': 'applicaiton/json'}).end(JSON.stringify({err: 'Error save record'}));

    res.writeHead(201, {'Content-Type': 'applicaiton/json'}).end(JSON.stringify({message: 'record created'}));

};