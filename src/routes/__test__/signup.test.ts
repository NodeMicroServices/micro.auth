import request from "supertest";

import app from "../../app";

it('returns 201 on successful signup', async () => {
    return request(app)
        .post('/users/sign-up')
        .send({
            email: 'test@test.com',
            password: 'password',
            firstName: 'Tester'
        })
        .expect(201);
})
