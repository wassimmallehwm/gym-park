const multer = require('multer')


const fileUpload = (path) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'public/' + path);
        },
        filename: (req, file, cb) => {
            const name = Date.now() + '-' + file.originalname
            cb(null, name);
            req.file = name
        }
    });

    return multer({ storage });
}


const courseMediaFileUpload = () => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'public/courses/' + req.params.id);
        },
        filename: (req, file, cb) => {
            const name = Date.now() + '-' + file.originalname
            cb(null, name);
            req[file.fieldname] = name
        }
    });
    return multer({ storage });
}


module.exports = {
    fileUpload,
    courseMediaFileUpload
}