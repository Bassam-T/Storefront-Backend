import express,{Request,Response} from 'express';
import { productModel } from '../models/products_model';
import { authToken } from '../middlewares/auth_middleware';

const store = new productModel();

const getAll = async (_req:Request,res:Response)=>{
    try {
        const w = await store.getAll();
        res.json(w);
    } catch (error) {
        return res.status(404).json({ Error: 'An Error occurred' });
    }
};

const getById = async (req:Request,res:Response)=>{
    try {
        const w = await store.getById(parseInt(req.params.id));
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

const product_model_routes = (app:express.Application)=>{
    app.get('/product',authToken,getAll);
    app.get('/product/:id',authToken,getById);
    app.post('/product',authToken,create);
    app.delete('/product/:id',authToken,delet);
};

export default product_model_routes;