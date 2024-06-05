import request from "supertest";
import app from "../src/app";

describe('GET /taxis', () => {
    it('should return trajectories for a specific taxi and date', async () => {
        const id = '6418'; //  
        const date = '2008-02-02';
        const response = await request(app).get(`/trajectories/${id}?date=${date}`);
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toEqual(expect.stringContaining('application/json'));
        expect(Array.isArray(response.body)).toBeTruthy();

    });
    it('should return error for missing taxi ID or date', async () => {
        const id = '6418'; // 
        const response = await request(app).get(`/trajectories/${id}`);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: 'los parametros taxiId y date son obligatorios en la consulta' });
    });
});


describe('GET /lastlocation', () => {
    it('should return last trajectories for taxis', async () => {
        const response = await request(app).get(`/lastlocation`);
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toEqual(expect.stringContaining('application/json'));
        expect(Array.isArray(response.body)).toBeTruthy();
    });
    it('should return taxis in JSON format', async () => {
        const response = await request(app).get('/lastlocation');
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toEqual(expect.stringContaining('application/json'));
      });
 
});

describe('GET /trajectories/:id/export', () =>{
    it('')
})