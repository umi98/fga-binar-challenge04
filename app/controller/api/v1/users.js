const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

module.exports = {
    async get(req, res) {
        // let users = await prisma.user.findMany({
        //     orderBy: {
        //         id: 'asc'
        //     }
        // });
        let users = await prisma.user.findMany({
            include: {
                profile: true 
            },
            orderBy: {
                id: 'asc'
            }
        });

        res.status(200).json({ 
            status: 'success', 
            code: 200, 
            message: 'Daftar user',
            data: users
        })
    },

    async getById(req, res) {
        // let user = await prisma.user.findUnique({
        //     where: {
        //         id: Number(req.params.id)
        //     }
        // });
        let user = await prisma.user.findUnique({
            include: {
                profile: true 
            },
            where: {
                id: Number(req.params.id)
            }
        });

        res.status(201).json({ 
            status: 'success', 
            code: 200, 
            message: 'Data user:',
            data: user
        })
    },

    async insert(req, res) {
        // const user = await prisma.user.create({
        //     data: req.body
        // });
        const user = await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                profile: {
                    create: {
                        identity_type: req.body.identity_type,
                        identity_number: req.body.identity_number,
                        address: req.body.address
                    }
                }
            },
            include: {
                profile: true
            }
        });

        res.status(200).json({ 
            status: 'success', 
            code: 200, 
            message: 'Berhasil tambah data',
            data: user
        })
    },
    
    async update(req, res) {
        // let user = await prisma.user.update({
        //     where: {
        //         id: Number(req.params.id)
        //     },
        //     data: req.body
        // })
        let user = await prisma.user.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                profile: {
                    update: {
                        where: {
                            user_id: Number(req.params.id)
                        },
                        data: {
                            identity_type: req.body.identity_type,
                            identity_number: req.body.identity_number,
                            address: req.body.address
                        }
                    }
                }
            }
        })

        res.status(201).json({ 
            status: 'success', 
            code: 200, 
            message: 'Data diubah!',
            data: user
        })
    },

    async destroy(req, res) {
        let user = await prisma.user.delete({
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