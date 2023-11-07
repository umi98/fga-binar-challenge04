const { query } = require('express');
const base = require('../app/controller/api/v1/transactions');
const mockRequest = (body = {}, query = {}, params = {}) =>
                    ({ body, query, params });

const mockResponse = () => {
    const res = {}
    res.json = jest.fn().mockReturnValue(res)
    res.status = jest.fn().mockReturnValue(res)
    return res
}

describe("transactions.get function", () => {
    test("res.json called with transactions data", async () => {
        const req = mockRequest()
        const res = mockResponse()
        await base.get(req, res)
        expect(res.status).toBeCalledWith(200)
        expect(res.json).toBeCalledWith(
            expect.objectContaining({
                status: 'success',
                code: 200,
                message: 'Daftar Transaction',
                data: expect.any(Array)
            })
        )
    })
})

describe("transactions.getById function", () => {
    test("res.json called by id", async () => {
        const req = mockRequest({}, {}, {id:3})
        const res = mockResponse()
        await base.getById(req, res)
        expect(res.status).toBeCalledWith(200)
        expect(res.json).toBeCalledWith(
            expect.objectContaining({
                status: 'success',
                code: 200,
                message: 'Data Transaction:',
                data: expect.any(Object)
            })
        )
    })
})

// How to test insert, update, and delete

// Since ids for transactions table is using big serial, the number can be unpredictable
// thus, to test insert func, comments test for update and destroy.
// And check using Postman to see the latest id for transactions table.
// Comment insert test and uncomment update and destroy, then change the id
// based on the latest id on transactions table.
// Always check your id

// describe("transactions.insert function", () => {
//     test("res.json called with status 200", async () => {
//         const req = mockRequest({
//             source_account_id: 1,
//             destination_account_id: 2,
//             amount: 12000
//         })
//         const res = mockResponse()
//         await base.insert(req, res)
//         expect(res.status).toBeCalledWith(200)
//         expect(res.json).toBeCalledWith(
//             expect.objectContaining({
//                 status: 'success',
//                 code: 200,
//                 message: 'Berhasil tambah data',
//                 data: expect.any(Object)
//             })
//         )
//     })
// })

describe("transactions.update function", () => {
    test("res.json called with status 200", async () => {
        const req = mockRequest({
            source_account_id: 1,
            destination_account_id: 2,
            amount: 15000
        },
        {},
        {
            id: 5
        })
        const res = mockResponse()
        await base.update(req, res)
        expect(res.status).toBeCalledWith(200)
        expect(res.json).toBeCalledWith(
            expect.objectContaining({
                status: 'success',
                code: 200,
                message: 'Data diubah!',
                data: expect.any(Object)
            })
        )
    })
})

describe("transactions.destroy function", () => {
        test("res.json delete with user by id", async () => {
        const req = mockRequest({}, {}, {id:5})
        const res = mockResponse()
        await base.destroy(req, res)
        expect(res.status).toBeCalledWith(201)
        expect(res.json).toBeCalledWith(
            expect.objectContaining({
                status: 'success',
                code: 201,
                message: 'Data dihapus!'
            })
        )
    })
})
