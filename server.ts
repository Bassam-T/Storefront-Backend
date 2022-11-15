import express,{Request,Response} from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { config } from './config';
import user_model_routes from './src/handlers/user_handler';
import product_model_routes from './src/handlers/product_handler';
import order_model_routes from './src/handlers/order_handler';
import path from 'path';

const app:express.Application = express();
const port:number = parseInt(config.port as string);
const corsOption = {
    optionsSuccessStatus: 200 // for some lagacy browsers
};

app.use(cors(corsOption));
app.use(bodyParser.json());

app.get('/',(_req:Request,res:Response)=>{
    res.sendFile(path.join(__dirname + "/index.html"));
});

app.get('/index.js',(_req:Request,res:Response)=>{
    res.sendFile(path.join(__dirname + "/index.js"));
});

export const server = app.listen(port,()=>{
    console.log(`server is Running in http://127.0.0.1:${port}`);
});

user_model_routes(app);
product_model_routes(app);
order_model_routes(app);

export default app;