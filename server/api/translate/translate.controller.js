var rp = require('request-promise');

exports.translate = function(req, res) {
    const word = { text: req.query.text, interfaceLang: req.query.interfaceLang, courseLang: req.query.courseLang };
    console.log(word);
    translateWord(word).then((result) => {
        res.send(result);
    }).catch((err) => {
        // console.l0g(err);
        res.status(500).send('Something went wrong!');
    })
}

const translateWord = function(word) {
    const YANDEX_KEY = "trnsl.1.1.20170117T100740Z.47998d3b7c7cf041.d2ad568069da066ac21c64c7ec4f74d251d46251";

    const getTranslateURL = (lang) => `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${YANDEX_KEY}&text=${word.text}&lang=${lang}&format=plain`;

    var result = {
        text: word.text,
        interfaceLang: '',
        courseLang: ''
    };

    const setTranslation = (translationKey, response) => {
        const parsedResponse = JSON.parse(response);
        const translation = parsedResponse && parsedResponse.text && parsedResponse.text[0];
        result = Object.assign({}, result, { [translationKey]: translation });
        return result;
    };

    return rp({ method: 'GET', uri: getTranslateURL(word.interfaceLang) })
        .then((response) => setTranslation('interfaceLang', response))
        .then(() => rp({ method: 'GET', uri: getTranslateURL(word.courseLang) }))
        .then((response) => setTranslation('courseLang', response)).catch(err => {
            // console.error('ERROR:', err);
            return 'Something went wrong'
        });
}

exports.translateWord = translateWord;
