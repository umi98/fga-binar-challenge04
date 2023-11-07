const { query } = require('express');
const base = require('../app/controller/api/v1/users');
const mockRequest = (body = {}, query = {}, params = {}) =>
                    ({ body, query, params });

const mockResponse = () => {
    const res = {}
    res.json = jest.fn().mockReturnValue(res)
    res.status = jest.fn().mockReturnValue(res)
    return res
}

describe("users.get function", () => {
    test("res.json called with users data", async () => {
        const req = mockRequest()
        const res = mockResponse()
        await base.get(req, res)
        expect(res.status).toBeCalledWith(200)
        expect(res.json).toBeCalledWith(
            expect.objectContaining({
                status: 'success',
                code: 200,
                message: 'Daftar user',
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

describe("users.getById function", () => {
    test("res.json called with user by id", async () => {
        const req = mockRequest({}, {}, {id:36})
        const res = mockResponse()
        await base.getById(req, res)
        expect(res.status).toBeCalledWith(200)
        expect(res.json).toBeCalledWith(
            expect.objectContaining({
                status: 'success',
                code: 200,
                message: 'Data user:',
                data: expect.any(Object)
            })
        )
    })
})

// How to test insert, update, and delete

// Since ids for users table is made big serial, the number can be unpredictable
// thus, to test insert func, comments test for update and destroy.
// And check using Postman to see the latest id for users table.
// Comment insert test and uncomment update and destroy, then change the id
// based on the latest id on users table.

// describe("users.insert function", () => {
//     test("res.json called with status 200", async () => {
//         const req = mockRequest({
//             name: "sukuna",
//             email: "sukuna@mail.com",
//             password: "1234",
//             identity_type: "dl",
//             identity_number: "12345",
//             address: "bikini bottom"
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

// describe("users.update function", () => {
//     test("res.json called but user not found", async () => {
//         const req = mockRequest({
//             name: "gojo",
//             email: "gojo@mail.com",
//             password: "1234",
//             identity_type: "dl",
//             identity_number: "12345",
//             address: "bikini bottom"
//         },
//         {},
//         {
//             id: 40
//         })
//         const res = mockResponse()
//         await base.update(req, res)
//         expect(res.status).toBeCalledWith(401)
//         expect(res.json).toBeCalledWith(
//             expect.objectContaining({
//                 status: 'failed', 
//                 code: 401, 
//                 message: 'Data not found!'
//             })
//         )
//     })

//     test("res.json called with status 200", async () => {
//         const req = mockRequest({
//             name: "gojo",
//             email: "gojo@mail.com",
//             password: "1234",
//             identity_type: "dl",
//             identity_number: "12345",
//             address: "bikini bottom"
//         },
//         {},
//         {
//             id: 40
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

// describe("users.destroy function", () => {
//     test("res.json delete but user not found", async () => {
//         const req = mockRequest({}, {}, {id:40})
//         const res = mockResponse()
//         await base.destroy(req, res)
//         expect(res.status).toBeCalledWith(401)
//         expect(res.json).toBeCalledWith(
//             expect.objectContaining({
//                 status: 'failed', 
//                 code: 401, 
//                 message: 'Data not found!'
//             })
//         )
//     })

//     test("res.json delete with user by id", async () => {
//         const req = mockRequest({}, {}, {id:40})
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