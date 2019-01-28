// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

exports.analyse = (req, res) => {
    const img = req.img;
    // Creates a client
    const client = new vision.ImageAnnotatorClient();

    // Performs label detection on the image file
    client
        .labelDetection(img)
        .then(results => {
            const labels = results[0].labelAnnotations;
            
            // Logging
            console.log('Labels:');
            labels.forEach(label => console.log(label.description));

            res.send(labels);
        })
        .catch(err => {
            console.error('ERROR:', err);
            res.status(500).send(`Something went wrong: ${err}`);
        });
}