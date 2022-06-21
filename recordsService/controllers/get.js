import { RecordModel } from '../database/recordModel.js';

export async function getOneRecord(req, res) {
    const idRecord = req.params.id;

    const getRecord = await RecordModel.findByPk(idRecord);
    if(!getRecord) return res.writeHead(404, {'Content-Type': 'application/json'}).end(JSON.stringify({err: 'Record not found'}));
    res.send(getRecord.dataValues);

};

export async function getAllRecords(req, res) {

    const getRecords = await RecordModel.findAll();
    res.send(getRecords[0].dataValues);

};