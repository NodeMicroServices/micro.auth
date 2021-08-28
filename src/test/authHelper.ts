import request from "supertest";

import app from "../app";

import {IUserAttributes} from "../models/user";

const signUp = async (data?: IUserAttributes) => {
    let userData;
    if (!data) {
        userData = {
            email: 'test@email.com',
            password: 'pwd123',
            firstName: 'My Name'
        };
    } else {
        userData = data;
    }
    const signupResponse = await request(app)
        .post('/users/sign-up')
        .send(userData)
        .expect(201);
    return signupResponse.get('Set-Cookie');
}

export { signUp };
