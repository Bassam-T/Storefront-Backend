import express,{Request,Response} from 'express';
import { userModel } from '../models/user_model';
import { authToken } from '../middlewares/auth_middleware';

const store = new userModel();

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
        if(!w){
            return res.status(401).send('Wrong Parma');
        }
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

const user_model_routes = (app:express.Application)=>{
    app.get('/user',authToken,getAll);
    app.get('/user/:id',authToken,getById);
    app.post('/user',create);
    app.delete('/user/:id',authToken,delet);
};

export default user_model_routes;