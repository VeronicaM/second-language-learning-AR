var rp = require('request-promise');

exports.translateWord = function(req, res) {
    const text = req.body.text;
    const interfaceLang = req.body.interfaceLang;
    const courseLang = req.body.courseLang;
    const YANDEX_KEY = "trnsl.1.1.20170117T100740Z.47998d3b7c7cf041.d2ad568069da066ac21c64c7ec4f74d251d46251";

    const translateToInterfaceLangURL = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${YANDEX_KEY}&text=${text}&lang=${interfaceLang}&format=plain`;
    
    const translateToCourseLangURL = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${YANDEX_KEY}&text=${text}&lang=${courseLang}&format=plain`;
    
    var result = {
        text,
        interfaceLang: '',
        courseLang: ''
    };

    var optionsInterfaceLang = {
        method: 'GET',
        uri: translateToInterfaceLangURL
    };

    var optionsCourseLang = {
        method: 'GET',
        uri: translateToCourseLangURL
    };

    rp(optionsInterfaceLang).then(response => {
        result = Object.assign({}, result, {interfaceLang: response.text});
        return response;
    }).then(() => rp(optionsCourseLang)).then((response) => {
        result = Object.assign({}, result, {courseLang: response.text});
        res.send(result);
    }).catch(err => {
        console.error('ERROR:', err);
        res.status(500).send(`Something went wrong: ${err}`);
    }); 
}
