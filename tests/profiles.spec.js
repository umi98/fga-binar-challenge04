const { query } = require('express');
const base = require('../app/controller/api/v1/profiles');
const mockRequest = (body = {}, query = {}, params = {}) =>
                    ({ body, query, params });

const mockResponse = () => {
    const res = {}
    res.json = jest.fn().mockReturnValue(res)
    res.status = jest.fn().mockReturnValue(res)
    return res
}

describe("profiles.get function", () => {
    test("res.json called with profiles data", async () => {
        const req = mockRequest()
        const res = mockResponse()
        await base.get(req, res)
        expect(res.status).toBeCalledWith(200)
        expect(res.json).toBeCalledWith(
            expect.objectContaining({
                status: 'success',
                code: 200,
                message: 'Daftar profile',
                data: expect.any(Array)
            })
        )
    })

    test("res.json called with no result", async () => {
        const req = mockRequest({}, {page:3})
        const res = mockResponse()
        await base.get(req, res)
        expect(res.status).toBeCalledWith(200)
        expect(res.json).toBeCalledWith(
            expect.objectContaining({
                status: 'success',
                code: 200,
                message: 'Data empty'
            })
        )
    })
})

describe("profiles.getById function", () => {
    test("res.json called with user by id", async () => {
        const req = mockRequest({}, {}, {id:3})
        const res = mockResponse()
        await base.getById(req, res)
        expect(res.status).toBeCalledWith(200)
        expect(res.json).toBeCalledWith(
            expect.objectContaining({
                status: 'success',
                code: 200,
                message: 'Data profile:',
                data: expect.any(Object)
            })
        )
    })
})