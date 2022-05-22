const errorHandler = require("../../utils/errorHandler");
const { singleFileUpload } = require("../../utils/imageUpload");
const AppConfig = require("./app-config.model");
const ENTITY = "App Config"

module.exports.getConfig = async (req, res) => {
    try {
        const result = await AppConfig.findOne()
            .select('-_id').sort("-created_at").exec();
        return res.status(200).json(result);
    } catch (err) {
        const { status, message } = errorHandler(err)
        res.status(status).json({ message, entity: ENTITY })
    }
};

module.exports.update = async (req, res) => {
    try {
        let result = await AppConfig.findOne().sort("-created_at").exec();
        result = await AppConfig.findOneAndUpdate({ _id: result._id }, req.body, { new: true });

        return res.status(200).json(result);
    } catch (err) {
        console.log(err)
        const { status, message } = errorHandler(err)
        res.status(status).json({ message, entity: ENTITY })
    }
};

module.exports.uploadLogo = async (req, res) => {
    try {
        await singleFileUpload(req, res, 'logo', 'images', async (filename) => {
            const result = await AppConfig.findOne()
                .sort("-created_at").exec();
            result.logo = filename;
            await result.save();
            return res.status(200).send(req.file.filename)
        })
    } catch (err) {
        const { status, message } = errorHandler(err)
        res.status(status).json({ message, entity: ENTITY })
    }
};

