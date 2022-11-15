import express,{Request,Response} from 'express';
import { orderModel } from '../models/order_models';
import { authToken } from '../middlewares/auth_middleware';


const store = new orderModel();

const getAll = async (_req:Request,res:Response)=>{
    try {
        const w = await store.getAll();
        res.json(w);
    } catch (error) {
        return res.status(404).json({ Error: 'An Error occurred' });
    }
};

const updateStatus = async (req:Request,res:Response)=>{
    try {
        const status = req.query.status as string;
        const orderId = parseInt(req.params.id);
        if (orderId && ['active', 'complete'].includes(status)) {
            const w = await store.updateStatus(orderId,status);
            res.json(w);
        }else{
            return res.status(400).json({ Error: 'Bad parameters' });
        }
    } catch (error) {
        return res.status(404).json({ Error: 'An Error occurred' });
    }
};

const addProduct = async (req:Request,res:Response)=>{
    try {
        const w = await store.addProduct(req.body);
        res.json(w);
    } catch (error) {
        return res.status(404).json({ Error: 'An Error occurred' });
    }
};

const getByUserId = async (req:Request,res:Response)=>{
    try {
        const w = await store.getByUserId(parseInt(req.params.user_id));
        res.json(w);
    } catch (error) {
        return res.status(404).json({ Error: 'An Error occurred' });
    }
};

const getCompleteByUserId = async (req:Request,res:Response)=>{
    try {
        const w = await store.getCompleteByUserId(parseInt(req.params.user_id));
        res.json(w);
    } catch (error) {
        return res.status(404).json({ Error: 'An Error occurred' });
    }
};

const create = async (req:Request,res:Response)=>{
    try {
        const w = await store.create(req.body);
        res.json(w);
    } catch (error) {
        return res.status(404).json({ Error: 'An Error occurred' });
    }
};

const delet = async (req:Request,res:Response)=>{
    try {
        const w = await store.delete(parseInt(req.params.id));
        res.json(w);
    } catch (error) {
        return res.status(404).json({ Error: 'An Error occurred' });
    }
};

const order_model_routes = (app:express.Application)=>{
    app.get('/order',authToken,getAll);
    app.get('/order/:user_id',authToken,getByUserId);
    app.get('/order/completed/:user_id',authToken,getCompleteByUserId);
    app.post('/order',authToken,create);
    app.delete('/order/:id',authToken,delet);
    app.put('/order/:id/update',authToken,updateStatus);
    app.put('/order/addProduct',authToken,addProduct);
};

export default order_model_routes;