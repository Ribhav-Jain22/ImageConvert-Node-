const sharp = require('sharp');

exports.handler = async (event) => {
    try {
        // Extract input image data from the event object
        const inputImage = event.inputImage;

        // Convert input image to PNG format
        const outputImageBuffer = await convertImage(inputImage);

        // Encode the output image buffer to base64
        const base64Image = outputImageBuffer.toString('base64');
        
        // Return the converted image as base64 string
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                convertedImage: base64Image
            })
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Internal Server Error'
            })
        };
    }
};

async function convertImage(inputImage) {
    // Convert input image buffer to PNG format buffer
    const outputImageBuffer = await sharp(Buffer.from(inputImage, 'base64')).toFormat('png').toBuffer();
    return outputImageBuffer;
}
