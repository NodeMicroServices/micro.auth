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
});

it('returns 400 with invalid email', async () => {
    return request(app)
        .post('/users/sign-up')
        .send({
            email: 'thisIsMyEmail',
            password: 'pwd123',
            firstName: 'My Name'
        })
        .expect(400);
});

it('returns 400 with invalid password', async () => {
    return request(app)
        .post('/users/sign-up')
        .send({
            email: 'thisIsMyEmail@email.com',
            password: 'pwd',
            firstName: 'My Name'
        })
        .expect(400);
});

it('returns 400 with missing name', async () => {
    return request(app)
        .post('/users/sign-up')
        .send({
            email: 'thisIsMyEmail@email.com',
            password: 'pwd1123',
            firstName: ''
        })
        .expect(400);
});

it('returns 400 with missing email or password or firstName', async () => {
    await request(app)
        .post('/users/sign-up')
        .send({
            email: '',
            password: 'pwd1123',
            firstName: 'my name'
        })
        .expect(400);

    await request(app)
        .post('/users/sign-up')
        .send({
            email: 'test@test1.co',
            password: '',
            firstName: 'my name'
        })
        .expect(400);

    await request(app)
        .post('/users/sign-up')
        .send({
            email: 'test@test1.co',
            password: 'pwd1123',
            firstName: ''
        })
        .expect(400);
});

it('disallows signup with duplicate email', async () => {
    await request(app)
        .post('/users/sign-up')
        .send({
            email: 'thisIsMyEmail@email.com',
            password: 'pwd1123',
            firstName: 'first name'
        })
        .expect(201);

    await request(app)
        .post('/users/sign-up')
        .send({
            email: 'thisIsMyEmail@email.com',
            password: 'password1123',
            firstName: 'my name'
        })
        .expect(400);
});

it('sets cookie on successful signup', async () => {
    const res = await request(app)
        .post('/users/sign-up')
        .send({
            email: 'thisIsMyEmail@email.com',
            password: 'pwd1123',
            firstName: 'My Name'
        })
        .expect(201);

    expect(res.get('Set-Cookie')).toBeDefined();
});
