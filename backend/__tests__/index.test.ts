import request from "supertest"
import app from '../index';
import books from '../routes/booksRoute'
// @ts-ignore
import mockingoose from 'mockingoose'

jest.useFakeTimers();
jest.setTimeout(20000);

describe('Get message',()=>{

    test('200 - heroku',async()=>{
        const expectedStatusCode = 200;
        const expectedResponse = "Hello!";

        const response = await request(app).get("/")
        expect(response.status).toBe(expectedStatusCode);
        expect(response.text).toBe(expectedResponse);
        expect(response.headers['content-type']).toEqual(expect.stringContaining("html"));
    })
    
});

// jest.spyOn(model, 'find').mockReturnValueOnce(dummyData as any);