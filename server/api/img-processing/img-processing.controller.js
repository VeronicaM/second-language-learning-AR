// Imports the Google Cloud client library
var vision = require('@google-cloud/vision');

exports.analyse = (req, res) => {
    var img = req.body.img;
    // Creates a client
    var client = new vision.ImageAnnotatorClient();

    // Performs label detection on the image file
    client.labelDetection('uploads/'+img.id)
        .then(results => {
            var labels = results[0].labelAnnotations;
            
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