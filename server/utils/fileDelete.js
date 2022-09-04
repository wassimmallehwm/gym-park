const fs = require('fs')

const deleteResourcefile = (resourceType, resourceId, filename) => {
    const filePath = `public/${resourceType}/${resourceId}/${filename}`;
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
}

module.exports = {
    deleteResourcefile
}