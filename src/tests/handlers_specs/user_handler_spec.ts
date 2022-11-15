/* eslint-disable no-undef */
import supertest from 'supertest';
import { userModel } from '../../models/user_model';
import { server } from '../../../server';

const token: string = process.env.TOKEN_TEST as string;
const request = supertest(server);
const USER = new userModel();
const id = 2;

describe('Test users endpoint responses', () => {
    afterAll(async () => {
        await USER.delete(id);
    });
    
    it('create user api endpoint', async () => {
    const res = await request
        .post('/user')
        .set('Content-Type', 'application/json')
        .send({
            firstname:'baher',
            lastname:'allam',
            password:'password123'
        });

        expect(res.status).toBe(200);
        expect(res.body.auth).toEqual(true);
        expect(res.body.token).toBeDefined();
    });

    it('get all users api endpoint when token in the header', async () => {
        const res = await request
        .get('/user')
        .set('Authorization', 'Bearer ' + token);

        expect(res.status).toBe(200);
        expect(res.body).toHaveSize(1);
        expect(res.body[0].id).toEqual(id);
        expect(res.body[0].firstname).toEqual('baher');
        expect(res.body[0].lastname).toEqual('allam');
        expect(res.body[0].password.length).toBeGreaterThanOrEqual(60);
        expect(res.body[0].password).not.toEqual('password123');
    });

    it('expected a server error for not inserting the token when getting all users', async () => {
        const res = await request
        .get('/user')

        expect(res.status).toBe(401);
    });

    it('get user api endpoint by id when token in the header', async () => {
        const res = await request
        .get(`/user/${id}`)
        .set('Authorization', 'Bearer ' + token);

        expect(res.status).toBe(200);
        expect(res.body.id).toEqual(id);
        expect(res.body.firstname).toEqual('baher');
        expect(res.body.lastname).toEqual('allam');
        expect(res.body.password.length).toBeGreaterThanOrEqual(60);
        expect(res.body.password).not.toEqual('password123');
    });

    it('expected a server error for not inserting the token when getting a user by id', async () => {
        const res = await request
        .get(`/user/${id}`)
        expect(res.status).toBe(401);
    });

    it('delete user api endpoint by id when token in the header', async () => {
        const res = await request
        .delete(`/user/${id}`)
        .set('Authorization', 'Bearer ' + token);

        expect(res.status).toBe(200);
        expect(res.body.id).toEqual(id);
        expect(res.body.firstname).toEqual('baher');
        expect(res.body.lastname).toEqual('allam');
        expect(res.body.password.length).toBeGreaterThanOrEqual(60);
        expect(res.body.password).not.toEqual('password123');
    });

    it('expected a server error for not inserting the token when deleting a user by id', async () => {
        const res = await request
        .delete(`/user/${id}`)
        expect(res.status).toBe(401);
    });
});