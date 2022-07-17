const mongoose = require('mongoose');
const Channel = require('../channel/channel.model');
const Message = require('./message.model');

module.exports.create = async (req, res) => {
    try {
        const message = new Message(req.body);
        await message.save();
        const result = await Message.findById(message._id)
            .populate({
                path: 'sender',
                model: 'User',
                select: 'firstname lastname imagePath'
            })
            .exec();
        res.status(201).json(result);
    } catch (e) {
        console.log('ERROR', e);
        res.status(500).send({ error: err.message })
    }
}

// module.exports.findByChannel = async (req, res) => {
//     const { page = 1, limit = 20 } = req.query;
//     const options = {
//         page: parseInt(page, 10),
//         sort: {
//             'createdAt' : 'desc'
//         },
//         limit: parseInt(limit, 10),
//         lean: true,
//         populate: { path: 'sender', model: 'User', select: 'firstname lastname imagePath' }
//     };
//     const query = {
//         channel: req.params.channel
//     };
//     Message.paginate(query, options)
//         .then(
//             messages => {
//                 res.status(200).json(messages);
//             }
//         )
//         .catch(
//             error => {
//                 res.status(500).json({error: error.message});
//             }
//         );
// }

module.exports.findByChannel = async (req, res) => {
    const { offset = 0, limit = 20 } = req.query;
    try {
        const messages = await Message.find({ channel: req.params.channel })
            .populate({
                path: 'sender',
                model: 'User',
                select: 'firstname lastname imagePath'
            })
            .limit(parseInt(limit, 10))
            .skip(parseInt(offset, 10))
            .exec();
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}