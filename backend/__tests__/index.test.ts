import request from "supertest"
import app from '../index';
import { HttpStatusCode } from "../utils/constants";

//! This is integration test, need to research more on how to do unit test
//! Unlike Java/SB which uses Junit/Mockito. Javascript world have many choices. Chai, mockito, enzyme etc...
//! Using Jest since it's kinda of similar to Junit and can be used on frontend side. 
//? Should have decoupled the components before engaging it. Like how SB is.

jest.setTimeout(20000);

describe('Get message',()=>{

    test('200 - heroku',async()=>{
        const expectedResponse = "Hello!";

        const response = await request(app).get("/")
        expect(response.status).toBe(HttpStatusCode.OK);
        expect(response.text).toBe(expectedResponse);
        expect(response.headers['content-type']).toEqual(expect.stringContaining("html"));
    })
});

//!After finishing HonnoMushi, split the tests and complete it!
describe('Get books',()=>{
    test('200 - book',async()=>{
        const response = await request(app).get("/books")
        expect(response.status).toBe(HttpStatusCode.OK);
        expect(response.body.count).toBeGreaterThan(0);

        //! Need to check how to mock the contents and test. 
        expect(response.body.booksLetter.count).toHaveLength;
        expect(response.body.numberOfPages).toBeGreaterThan(0);
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
    })
});

describe('Register User',()=>{
    test('404 - Invalid due to password and confirm does not match',async()=>{
        const response = await request(app)
        .post('/auth/register')
        .send({
          name:"jimmy",
          email:"jimmy@jimmy.com",
          password:"123456",
          confirmPassword:"12345"
        })

        expect(response.status).toBe(HttpStatusCode.BAD_REQUEST);
        expect(response.text).toBe("{\"message\":\"Password doesn't match!\"}");
        expect(response).toThrowError;
    })
});