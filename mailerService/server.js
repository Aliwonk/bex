import http from 'http';
import os from 'os';
import dotenv from 'dotenv';
import cluster from 'cluster';

dotenv.config({path: './.env'});
const port = process.env.PORT;

if(cluster.isMaster) {
    const copy = process.env.COPY || os.cpus().length;

    cluster.fork();

    for (let i = 0; i < copy - 1; i++) {
        const worker = cluster.fork();
        
        worker.on('exit', () => {
            console.log(`Copy died! Pid: ${worker.process.pid}`);
            cluster.fork();
        }); 
    };

}else {

    const server = http.createServer();


    server.listen(port)
    server.on('listening', () => {
        console.log(`Mailer service work on port: ${port}. Copy ${cluster.worker.id}. Pid: ${process.pid}`)
    })
}