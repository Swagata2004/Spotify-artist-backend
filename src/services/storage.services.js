const { ImageKit } = require("@imagekit/nodejs");

function getImageKitClient() {
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
    if (!privateKey || !privateKey.trim()) {
        throw new Error(
            "IMAGEKIT_PRIVATE_KEY is missing or empty. Set it in your .env file or instantiate ImageKit with { privateKey: '...' }."
        );
    }

    return new ImageKit({ privateKey });
}

async function uploadFile(file) {
    const client = getImageKitClient();
    const result = await client.files.upload({
        file,
        fileName: "music_" + Date.now(),
        folder: "Spotify-artists/music",
    });
    return result;
}

module.exports = { uploadFile };
