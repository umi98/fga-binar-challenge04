const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

module.exports = {
    async get(req, res) {
        let transactions = await prisma.transaction.findMany({
            orderBy: {
                id: 'asc'
            }
        });

        res.status(200).json({ 
            status: 'success', 
            code: 200, 
            message: 'Daftar Transaction',
            data: transactions
        })
    },

    async getById(req, res) {
        let transaction = await prisma.transaction.findUnique({
            where: {
                id: Number(req.params.id)
            }
        });

        res.status(201).json({ 
            status: 'success', 
            code: 200, 
            message: 'Data Transaction:',
            data: transaction
        })
    },

    async insert(req, res) {
        const transaction = await prisma.transaction.create({
            data: {
                source_account_id: Number(req.body.source_account_id),
                destination_account_id: Number(req.body.destination_account_id),
                amount: Number(req.body.amount)
            }
        });

        const updateAccount1 = await prisma.bankAccount.update({
            where: {
                id: Number(req.body.source_account_id)
            },
            data: {
                balance : {
                    decrement: Number(req.body.amount)
                }
            }
        });

        const updateAccount2 = await prisma.bankAccount.update({
            where: {
                id: Number(req.body.destination_account_id)
            },
            data: {
                balance : {
                    increment: Number(req.body.amount)
                }
            }
        })

        res.status(200).json({ 
            status: 'success', 
            code: 200, 
            message: 'Berhasil tambah data',
            data: transaction
        })
    },
    
    async update(req, res) {
        let transaction = await prisma.transaction.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                source_account_id: Number(req.body.source_account_id),
                destination_account_id: Number(req.body.destination_account_id),
                amount: Number(req.body.amount)
            }
        })

        res.status(201).json({ 
            status: 'success', 
            code: 200, 
            message: 'Data diubah!',
            data: transaction
        })
    },

    async destroy(req, res) {
        let transaction = await prisma.transaction.delete({
            where: {
                id: Number(req.params.id)
            }
        })

        res.status(201).json({ 
            status: 'success', 
            code: 200, 
            message: 'Data dihapus!'
        })
    }
}