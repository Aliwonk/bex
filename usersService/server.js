import http from 'http';
import dotenv from 'dotenv';
import cluster from 'cluster';
import os from 'os';
import app from './app.js';
import dataBase from './database/index.js';

dotenv.config({path: '../.env'});
const port = process.env.PORT;
const server = http.createServer(app);


if(cluster.isMaster) {
    const copy = process.env.COPY || os.cpus().length;

    cluster.fork();

    // start copy
    for (let i = 0; i < copy - 1; i++) {
        const worker = cluster.fork();
        
        worker.on('exit', () => {
            console.log(`Copy died! Pid: ${worker.process.pid}`);
            cluster.fork();
        });

    };

}else {


    dataBase.sync({alter: false})
        .then(() => {

            server.listen(port)
            server.on('listening', () => {
                console.log(`Records service on port: ${port}. Copy ${cluster.worker.id} work. Pid: ${process.pid}`);
            });
        })
        .catch(err => console.log(err));

};