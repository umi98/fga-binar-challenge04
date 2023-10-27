const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

module.exports = {
    async get(req, res) {
        let bankAccounts = await prisma.bankAccount.findMany({
            orderBy: {
                id: 'asc'
            }
        });

        res.status(200).json({ 
            status: 'success', 
            code: 200, 
            message: 'Daftar Bank Account',
            data: bankAccounts
        })
    },

    async getById(req, res) {
        let bankAccount = await prisma.bankAccount.findUnique({
            where: {
                id: Number(req.params.id)
            }
        });

        res.status(201).json({ 
            status: 'success', 
            code: 200, 
            message: 'Data Bank Account:',
            data: bankAccount
        })
    },

    async insert(req, res) {
        const bankAccount = await prisma.bankAccount.create({
            data: {
                user_id: Number(req.body.user_id),
                bank_name: req.body.bank_name,
                bank_account_number: Number(req.body.bank_account_number),
                balance: Number(req.body.balance)
            }
        });

        res.status(200).json({ 
            status: 'success', 
            code: 200, 
            message: 'Berhasil tambah data',
            data: bankAccount
        })
    },
    
    async update(req, res) {
        let bankAccount = await prisma.bankAccount.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                user_id: Number(req.body.user_id),
                bank_name: req.body.bank_name,
                bank_account_number: Number(req.body.bank_account_number),
                balance: Number(req.body.balance)
            }
        })

        res.status(201).json({ 
            status: 'success', 
            code: 200, 
            message: 'Data diubah!',
            data: bankAccount
        })
    },

    async destroy(req, res) {
        let bankAccount = await prisma.bankAccount.delete({
            where: {
                id: Number(req.params.id)
            }
        })

        res.status(201).json({ 
            status: 'success', 
            code: 200, 
            message: 'Data dihapus!'
        })
    },

    async tarik(req, res) {
        let bank_account = await prisma.bankAccount.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                balance: {
                    decrement: Number(req.body.amount)
                }
            }
        });

        res.status(200).json({ 
            status: 'success', 
            code: 200, 
            message: 'Data diupdate!',
            data: bank_account
        })
    },

    async deposit(req, res) {
        let bank_account = await prisma.bankAccount.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                balance: {
                    increment: Number(req.body.amount)
                }
            }
        });

        res.status(200).json({ 
            status: 'success', 
            code: 200, 
            message: 'Data diupdate!',
            data: bank_account
        })
    }
}