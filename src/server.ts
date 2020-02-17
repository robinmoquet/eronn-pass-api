import express from 'express';
import { Response, Request } from "express";


export default class Server {

    readonly port: number;

    constructor(port: number) {
        this.port = port;
    }

    start() {
        const app = express();
        app.get('/', (req: Request, res: Response) => {
            res.send('Hello guys');
        })
        app.listen(this.port, () => {
            console.log('Server start !');
        })
    }
}