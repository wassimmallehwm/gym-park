import Compress from 'compress.js';
const compress = new Compress()

export const compressfile = async (file: File) => {

    const resizedImage = await compress.compress([file], {
        size: 2,
        quality: 1,
        maxWidth: 200,
        maxHeight: 200,
        resize: true
    })
    const img = resizedImage[0];
    const base64str = img.data
    const imgExt = img.ext
    const resizedFiile = Compress.convertBase64ToFile(base64str, imgExt)
    return resizedFiile;
}