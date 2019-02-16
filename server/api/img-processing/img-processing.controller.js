var rp = require('request-promise');

exports.analyse = (req, res) => {
    var img = req.body && req.body.img && req.body.img.split(',')[1];

    // Performs label detection on the image file
    var options = {
        method: 'POST',
        uri: `https://vision.googleapis.com/v1/images:annotate?key=${process.env.GOOGLE_API_KEY}`,
        body: {
            "requests": [
                {
                    "image": {
                        "content": img
                    },
                    "features": [
                        {
                            "type": "LABEL_DETECTION",
                            "maxResults": 4
                        }
                    ]
                }
            ]
        },
        json: true // Automatically stringifies the body to JSON
    };

    rp(options).then(results => {
        console.log(results);

        if(!(results.responses && results.responses[0])) return res.send([]);

        var labels = results.responses[0].labelAnnotations;

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
