const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const qr = require('node-qr-image');
const imagekit = require('../../../../utils/imagekit');

module.exports = {
    upload: async(req, res) => {
        console.log(req.body);
        res.status(200).json({
            message: 'Berhasil upload'
        })
    },

    uploadImage: async (req, res) => {
        const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
     
        // console.log(req);
        return res.status(200).json({
            status: true,
            nessage: "Berhasil upload",
            data: {
                image_url: imageUrl
            }
        })
    },

    uploadVideo: async (req, res) => {
        const videoUrl = `${req.protocol}://${req.get('host')}/videos/${req.file.filename}`;
     
        // console.log(req);
        return res.status(200).json({
            status: true,
            nessage: "Berhasil upload",
            data: {
                video_url: videoUrl
            }
        })
    },

    uploadDocument: async (req, res) => {
        const fileUrl = `${req.protocol}://${req.get('host')}/files/${req.file.filename}`;
     
        // console.log(req);
        return res.status(200).json({
            status: true,
            nessage: "Berhasil upload",
            data: {
                file_url: fileUrl
            }
        })
    },

    qrCode: async(req, res) => {
        const { url } = req.body;

        const qrcode = qr.image(url, { type: 'png' });
        res.setHeader("Content-type", "image/png");
        qrcode.pipe(res);
    },

    imagekitUpload: async(req, res) => {
        try {
            const stringFile = req.file.buffer.toString('base64');
            const uploadFile = await imagekit.upload({
                fileName: req.file.originalname,
                file: stringFile
            })
            return res.status(200).json({
                status: 'OK',
                message: 'Berhasil',
                data: {
                    name: uploadFile.name,
                    url: uploadFile.url,
                    type: uploadFile.fileType
                }
            })
        } catch(err) {
            throw err;
        }
    }
}