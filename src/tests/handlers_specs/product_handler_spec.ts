/* eslint-disable no-undef */
import supertest from 'supertest';
import { productModel } from '../../models/products_model';
import { server } from '../../../server';

const token: string = process.env.TOKEN_TEST as string;
const request = supertest(server);
const PRODUCT = new productModel();

const id = 2;

describe('Test products endpoint responses', () => {
    afterAll(async () => {
        await PRODUCT.delete(id);
    });
    
    it('create product api endpoint', async () => {
    const res = await request
        .post('/product')
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .send({
            name:'iphone3',
            price:'2000',
            category:'phone'
        });

        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            id:id,
            name:'iphone3',
            price:'2000',
            category:'phone'
        });
    });

    it('get all products api endpoint when token in the header', async () => {
        const res = await request
        .get('/product')
        .set('Authorization', 'Bearer ' + token);

        expect(res.status).toBe(200);
        expect(res.body).toEqual([{
            id:id,
            name:'iphone3',
            price:'2000',
            category:'phone'
        }]);
    });

    it('expected a server error for not inserting the token when getting all products', async () => {
        const res = await request
        .get('/product')

        expect(res.status).toBe(401);
    });

    it('get product api endpoint by id when token in the header', async () => {
        const res = await request
        .get(`/product/${id}`)
        .set('Authorization', 'Bearer ' + token);

        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            id:id,
            name:'iphone3',
            price:'2000',
            category:'phone'
        });
    });

    it('expected a server error for not inserting the token when getting a product by id', async () => {
        const res = await request
        .get(`/product/${id}`)
        expect(res.status).toBe(401);
    });

    it('delete product api endpoint by id when token in the header', async () => {
        const res = await request
        .delete(`/product/${id}`)
        .set('Authorization', 'Bearer ' + token);

        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            id:id,
            name:'iphone3',
            price:'2000',
            category:'phone'
        });
    });

    it('expected a server error for not inserting the token when deleting a product by id', async () => {
        const res = await request
        .delete(`/product/${id}`)
        expect(res.status).toBe(401);
    });
});