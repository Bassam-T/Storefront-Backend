import supertest from 'supertest';
import app from '../../../server'

const request = supertest(app);

describe('Test the Root endpoint responses', () =>{
    it('Get The Root EndPoint with status 200', async() => {
      const response = await request.get('/');
      expect(response.status).toBe(200);
    });

    it('Get The Root EndPoint with text "Hello, World"', async() => {
      const response = await request.get('/');
      expect(response.text).toBe("Hello, World");
    });
});

