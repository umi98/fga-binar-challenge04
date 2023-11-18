const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();
const imagekit = require('../../../../utils/imagekit');

module.exports = {
    async get(req, res) {
        const { search, page = 1, limit = 10} = req.query;
        let users = await prisma.user.findMany({
            include: {
                profile: true 
            },
            skip: (page - 1) * limit,
            take: limit,
            orderBy: {
                id: 'asc'
            }
        });

        if (!users.length) {
            return res.status(200).json({
                status: 'success', 
                code: 200, 
                message: 'Data empty',
                data: users
            })
        }
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

        res.status(200).json({ 
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
                        address: req.body.address,
                        image: "https://ik.imagekit.io/umi98dev/def-avatar_rV2tWZAPd.png"
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
        let check = await prisma.user.findUnique({
            include: {
                profile: true 
            },
            where: {
                id: Number(req.params.id)
            }
        })
        if (!check.length) {
            return res.status(401).json({ 
                status: 'failed', 
                code: 401, 
                message: 'Data not found!'
            })
        }

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

        res.status(200).json({ 
            status: 'success', 
            code: 200, 
            message: 'Data diubah!',
            data: user
        })
    },

    async destroy(req, res) {
        let check = await prisma.user.findUnique({
            include: {
                profile: true 
            },
            where: {
                id: Number(req.params.id)
            }
        })
        if (!check.length) {
            return res.status(401).json({ 
                status: 'failed', 
                code: 401, 
                message: 'Data not found!'
            })
        }
        
        let profile = await prisma.profile.delete({
            where: {
                user_id: Number(req.params.id)
            }
        })
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
    },

    async updateImage(req, res) {
        try {
            const stringFile = req.file.buffer.toString('base64');
            const uploadFile = await imagekit.upload({
                fileName: req.file.originalname,
                file: stringFile
            })

            let user = await prisma.profile.update({
                where: {
                    user_id: Number(req.params.id)
                },
                data: {
                    image: uploadFile.url
                }
            })

            res.status(200).json({
                status: 'OK',
                message: 'Berhasil',
                data: user
            })
        } catch(err) {
            throw err;
        }
    }
}