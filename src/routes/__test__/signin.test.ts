import request from "supertest";

import app from "../../app";
import { signUp } from "../../test/authHelper";

it('should return 400 for unrecognized email', async () => {
    await request(app)
        .post('/users/sign-in')
        .send({
            email: 'test@test.com',
            password: 'pwd123'
        })
        .expect(400);
});

it('should return 400 for wrong password', async () => {
    const data = {
        email: 'test@test.com',
        password: 'pwd123',
        firstName: 'My Name'
    };
    await signUp(data);

    await request(app)
        .post('/users/sign-in')
        .send({
            email: data.email,
            password: 'password'
        })
        .expect(400);
});

it('sets cookie on successful signin', async () => {
    const data = {
        email: 'test@test.com',
        password: 'pwd123',
        firstName: 'My Name'
    };
    await signUp(data);

    const res = await request(app)
        .post('/users/sign-in')
        .send({
            email: data.email,
            password: data.password
        })
        .expect(200);

    expect(res.get('Set-Cookie')).toBeDefined();
});
