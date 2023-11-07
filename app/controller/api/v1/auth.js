const { PrismaClient } = require('@prisma/client');
const { encryptPassword, checkPassword } = require('../../../../utils/auth');
const { JWTsign } = require('../../../../utils/jwt');

const prisma = new PrismaClient();

module.exports = {
    async register(req, res) {
        const { email, password, name } = req.body;
        
        const user = await prisma.user.findFirst({
            where: { email }
        })
        if (user) {
            return res.status(404).json({
                status: "fail",
                message: "Email sudah terdaftar"
            })
        }

        const createUser = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: await encryptPassword(password),
                profile: {
                    create: {
                        identity_type: req.body.identity_type,
                        identity_number: req.body.identity_number,
                        address: req.body.address
                    }
                }
            }
        });

        return res.status(200).json({
            status: 'success',
            code: 200,
            message: 'Berhasil register',
            data: createUser
        })
    },

    async login(req, res) {
        const { email, password } = req.body;
        const user = await prisma.user.findFirst({
            where: { email }
        })
        if (!user) {
            return res.status(404).json({
                status: "fail",
                message: "User tidak ditemukan"
            })
        }

        const isPasswordCorrect = await checkPassword(
            password, user.password
        )
        if (!isPasswordCorrect) {
            return res.status(401).json({
                status: "fail",
                message: "Password salah"
            })
        }
        delete user.password;
        const token = await JWTsign(user);
        return res.status(201).json({
            status: 'success',
            message: "Berhasil login",
            data: { user, token }
        })
    },

    async whoami(req, res) {
        return res.status(200).json({
            status: "success",
            message: "OK",
            data: {
                user: req.user
            }
        })
    },

    registerForm: async (req, res, next ) => {
        try {
            const { email, password, name } = req.body;
            const user = await prisma.user.findFirst({
                where: { email }
            })

            if (user) {
                req.flash("error", "Email sudah terdaftar")
                return res.redirect('/register')
            }

            const createUser = await prisma.user.create({
                data: {
                    name: name,
                    email: email,
                    password: await encryptPassword(password),
                    profile: {
                        create: {
                            identity_type: req.body.identity_type,
                            identity_number: req.body.identity_number,
                            address: req.body.address
                        }
                    }                
                }
            });

            req.flash("success", "Berhasil register");
            return res.redirect('/login');
        } catch(e) {
            next(e);
        }
    },

    authUser: async (email, password, done) => {
        try {
            const user = await prisma.user.findUnique({
                where: { email }
            })

            if (!user || !await checkPassword(password, user.password)) {
                return done(null, false, {message: 'Invalid email or password'})
            }

            return done(null, user);
        } catch (err) {
            return done(null, false, {message: err.message});
        }
    },
    dashboard: async (req, res, next) => {
        res.render('dashboard', { user: req.user });
    }
}