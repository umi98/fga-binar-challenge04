const multer = require('multer');
const path = require('path');

const filename = (req, file, callback) => {
    const filename = Date.now() + path.extname(file.originalname);
    callback(null, filename);
}

const generateStorage = (destination) => {
    return multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, destination)
        },
        filename
    })
}

module.exports = {
    image: multer({
        storage: generateStorage('./public/images'),
        fileFilter: (req, file, callback) => {
            const allowMimeType = ['image/jpeg', 'image/jpg', 'image/png']

            if (allowMimeType.includes(file.mimetype)) {
                callback(null, true)
            } else {
                const err = new Error(`Only ${allowMimeType.join(', ')} allowed to upload`)
                callback(err, false)
            }
        },
        onError: (err, next) => {
            next(err);
        }
    }),

    video: multer({
        storage: generateStorage('./public/videos'),
        fileFilter: (req, file, callback) => {
            const allowMimeType = ['video/mp4', 'video/x-msvideo', 'video/quicktime']

            if (allowMimeType.includes(file.mimetype)) {
                callback(null, true)
            } else {
                const err = new Error(`Only ${allowMimeType.join(', ')} allowed to upload`)
                callback(err, false)
            }
        },
        onError: (err, next) => {
            next(err);
        }
    }),

    document: multer({
        storage: generateStorage('./public/files'),
        fileFilter: (req, file, callback) => {
            const allowMimeType = ['application/pdf', 'application/vnd.ms-excel']

            if (allowMimeType.includes(file.mimetype)) {
                callback(null, true)
            } else {
                const err = new Error(`Only ${allowMimeType.join(', ')} allowed to upload`)
                callback(err, false)
            }
        },
        onError: (err, next) => {
            next(err);
        }
    })
}