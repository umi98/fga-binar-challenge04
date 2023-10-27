const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

module.exports = {
    async get(req, res) {
        let profiles = await prisma.profile.findMany({
            orderBy: {
                id: 'asc'
            }
        });

        res.status(200).json({ 
            status: 'success', 
            code: 200, 
            message: 'Daftar profile',
            data: profiles
        })
    },

    async getById(req, res) {
        let profile = await prisma.profile.findUnique({
            where: {
                id: Number(req.params.id)
            }
        });

        res.status(201).json({ 
            status: 'success', 
            code: 200, 
            message: 'Data profile:',
            data: profile
        })
    },

    async insert(req, res) {
        const profile = await prisma.profile.create({
            data: {
                user_id: Number(req.body.user_id),
                identity_type: req.body.identity_type,
                identity_number: req.body.identity_number,
                address: req.body.address
            }
        });

        res.status(200).json({ 
            status: 'success', 
            code: 200, 
            message: 'Berhasil tambah data',
            data: profile
        })
    },
    
    async update(req, res) {
        let profile = await prisma.profile.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                user_id: Number(req.body.user_id),
                identity_type: req.body.identity_type,
                identity_number: req.body.identity_number,
                address: req.body.address
            }
        })

        res.status(201).json({ 
            status: 'success', 
            code: 200, 
            message: 'Data diubah!',
            data: profile
        })
    },

    async destroy(req, res) {
        let profile = await prisma.profile.delete({
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