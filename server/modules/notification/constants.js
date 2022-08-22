const { notif_enums } = require("../../constants/notification")

const sub_req_def = 'Your subscription request was'
const sub_req_new = 'asked to join the course :'

module.exports.notif_types = {
    [notif_enums.SUBSCRIPTION_REQ_SENT]: {
        SUBJECT: 'New subscription request',
        CONTENT: `$user ${sub_req_new} $course`
    },
    [notif_enums.SUBSCRIPTION_REQ_APPROVED]: {
        SUBJECT: 'Subscription request approved',
        CONTENT: `Congratulations, ${sub_req_def} approved!`
    },
    [notif_enums.SUBSCRIPTION_REQ_REJECTED]: {
        SUBJECT: 'Subscription request rejected',
        CONTENT: `Unfortunately, ${sub_req_def} rejected! \n $reason.`
    }
}
