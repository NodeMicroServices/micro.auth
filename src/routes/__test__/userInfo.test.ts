import request from "supertest";

import app from "../../app";
import { signUp } from "../../test/authHelper";

it('responds with details about the current user', async () => {
    const userData = {
            email: 'test@email.com',
            password: 'pwd123',
            firstName: 'My Name'
        }
    const cookie = await signUp(userData);

    const meResponse = await request(app)
        .get('/users/me')
        .set('Cookie', cookie)
        .send()
        .expect(200);

    expect(meResponse.body.data.email).toBe(userData.email);
});

it('responds with null if user is not authenticated', async () => {
    const meResponse = await request(app)
        .get('/users/me')
        .send()
        .expect(200);

    expect(meResponse.body.data).toBe(null);
});
