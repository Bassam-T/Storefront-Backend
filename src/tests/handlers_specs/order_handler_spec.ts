/* eslint-disable no-undef */
import supertest from 'supertest';
import { orderModel } from '../../models/order_models';
import { userModel } from '../../models/user_model';
import { productModel } from '../../models/products_model';
import { server } from '../../../server';

const token: string = process.env.TOKEN_TEST as string;
const request = supertest(server);
const ORDER = new orderModel();
const USER = new userModel();
const product = new productModel();
const id = 1;

describe('Test orders endpoint responses', () => {
    beforeAll(async () => {
        await USER.create({
            firstname: 'Bassam',
            lastname: 'Allam',
            password: 'IhaveToGo3384#'
        });
        await product.create({
            name: 'iPhone',
            price: '2000',
            category: 'phone'
        });
    });

    afterAll(async () => {
        await USER.delete(id);
        await ORDER.delete(id);
        await product.delete(id);
    });
    
    it('create order api endpoint', async () => {
    const res = await request
        .post('/order')
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .send({
            user_id:id,
            status:'active',
            products_ids:[id],
            quantities:[2]
        });

        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            order_id:id,
            user_id:id,
            status:'active',
            products_ids:[id],
            quantities:[2]
        });
    });

    it('get all orders api endpoint when token in the header', async () => {
        const res = await request
        .get('/order')
        .set('Authorization', 'Bearer ' + token);

        expect(res.status).toBe(200);
        expect(res.body).toEqual([{
            id:id,
            user_id:id,
            status:'active',
        }]);
    });

    it('expected a server error for not inserting the token when getting all orders', async () => {
        const res = await request
        .get('/order')
        expect(res.status).toBe(401);
    });

    it('get orders api endpoint by user_id when token in the header', async () => {
        const res = await request
        .get(`/order/${id}`)
        .set('Authorization', 'Bearer ' + token);

        expect(res.status).toBe(200);
        expect(res.body).toEqual([{
            id:id,
            user_id:id,
            status:'active'
        }]);
    });

    it('expected a server error for not inserting the token when getting a order by id', async () => {
        const res = await request
        .get(`/order/${id}`)
        expect(res.status).toBe(401);
    });

    it('change order status  by order id when token in the header', async () => {
        const res = await request
        .put(`/order/${id}/update?status=complete`)
        .set('Authorization', 'Bearer ' + token);

        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            id:id,
            user_id:id,
            status:'complete'
        });
    });

    it('change order status  by order id when no token in the header', async () => {
        const res = await request
        .put(`/order/${id}/update?status=complete`);
        expect(res.status).toBe(401);

    });

    it('get complete orders api endpoint by user_id when token in the header', async () => {
        const res = await request
        .get(`/order/completed/${id}`)
        .set('Authorization', 'Bearer ' + token);

        expect(res.status).toBe(200);
        expect(res.body).toEqual([{
            id:id,
            user_id:id,
            status:'complete'
        }]);
    });

    it('expected a server error for not inserting the token when getting a complete orders by id', async () => {
        const res = await request
        .get(`/order/completed/${id}`)
        expect(res.status).toBe(401);
    });

    it('add product to an order when token in the header', async () => {
        const res = await request
        .put(`/order/addProduct`)
        .set('Authorization', 'Bearer ' + token)
        .send({
            product_id:id,
            order_id:id,
            quantity:2
        });

        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            id:2,
            product_id:id,
            order_id:id,
            quantity:2
        });

    });

    it('delete order api endpoint by order_id when token in the header', async () => {
        const res = await request
        .delete(`/order/${id}`)
        .set('Authorization', 'Bearer ' + token);
        
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            id:id,
            user_id:id,
            status:'complete'
        });
    });

    it('expected a server error for not inserting the token when deleting a order by id', async () => {
        const res = await request
        .delete('/order/1')
        expect(res.status).toBe(401);
    });
});