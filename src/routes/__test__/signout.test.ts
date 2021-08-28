import request from "supertest";

import app from "../../app";

it('clears cookie for successful sign-out', async () => {
    const res = await request(app)
        .post('/users/sign-out')
        .send({})
        .expect(200);

    // Can do this as well - It's totally fine
    // expect(res.get('Set-Cookie')).toBeDefined();
    expect(res.get('Set-Cookie')[0])
        .toEqual('express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly');
});
