const { query } = require('express');
const base = require('../app/controller/api/v1/bank_account');
const mockRequest = (body = {}, query = {}, params = {}) =>
                    ({ body, query, params });

const mockResponse = () => {
    const res = {}
    res.json = jest.fn().mockReturnValue(res)
    res.status = jest.fn().mockReturnValue(res)
    return res
}

describe("bank_account.get function", () => {
    test("res.json called with bank_account data", async () => {
        const req = mockRequest()
        const res = mockResponse()
        await base.get(req, res)
        expect(res.status).toBeCalledWith(200)
        expect(res.json).toBeCalledWith(
            expect.objectContaining({
                status: 'success',
                code: 200,
                message: 'Daftar Bank Account',
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

describe("bank_account.getById function", () => {
    test("res.json called with user by id", async () => {
        const req = mockRequest({}, {}, {id:3})
        const res = mockResponse()
        await base.getById(req, res)
        expect(res.status).toBeCalledWith(200)
        expect(res.json).toBeCalledWith(
            expect.objectContaining({
                status: 'success',
                code: 200,
                message: 'Data Bank Account:',
                data: expect.any(Object)
            })
        )
    })
})

// How to test insert, update, and delete

// Since ids for bank_account table is using big serial, the number can be unpredictable
// thus, to test insert func, comments test for update and destroy.
// And check using Postman to see the latest id for bank_account table.
// Comment insert test and uncomment update and destroy, then change the id
// based on the latest id on bank_account table.
// Always check your id

// describe("bank_account.insert function", () => {
//     test("res.json called with status 200", async () => {
//         const req = mockRequest({
//             user_id: 1,
//             bank_name: "simpe",
//             bank_account_number: "123489",
//             balance: 100000
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

// describe("bank_account.update function", () => {
//     test("res.json called with status 200", async () => {
//         const req = mockRequest({
//             user_id: 1,
//             bank_name: "simpe",
//             bank_account_number: "123489",
//             balance: 100000
//         },
//         {},
//         {
//             id: 4
//         })
//         const res = mockResponse()
//         await base.update(req, res)
//         expect(res.status).toBeCalledWith(200)
//         expect(res.json).toBeCalledWith(
//             expect.objectContaining({
//                 status: 'success',
//                 code: 200,
//                 message: 'Data diubah!',
//                 data: expect.any(Object)
//             })
//         )
//     })
// })

// describe("bank_account.destroy function", () => {
//         test("res.json delete with user by id", async () => {
//         const req = mockRequest({}, {}, {id:4})
//         const res = mockResponse()
//         await base.destroy(req, res)
//         expect(res.status).toBeCalledWith(201)
//         expect(res.json).toBeCalledWith(
//             expect.objectContaining({
//                 status: 'success',
//                 code: 200,
//                 message: 'Data dihapus!'
//             })
//         )
//     })
// })

describe("bank_account.tarik function", () => {
    test("res.json called with status 200", async () => {
        const req = mockRequest({
            amount: 100000
        },
        {},
        {
            id: 1
        })
        const res = mockResponse()
        await base.tarik(req, res)
        expect(res.status).toBeCalledWith(200)
        expect(res.json).toBeCalledWith(
            expect.objectContaining({
                status: 'success',
                code: 200,
                message: 'Data diupdate!',
                data: expect.any(Object)
            })
        )
    })
})

describe("bank_account.deposit function", () => {
    test("res.json called with status 200", async () => {
        const req = mockRequest({
            amount: 100000
        },
        {},
        {
            id: 1
        })
        const res = mockResponse()
        await base.deposit(req, res)
        expect(res.status).toBeCalledWith(200)
        expect(res.json).toBeCalledWith(
            expect.objectContaining({
                status: 'success',
                code: 200,
                message: 'Data diupdate!',
                data: expect.any(Object)
            })
        )
    })
}) 