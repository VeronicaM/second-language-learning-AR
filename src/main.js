var video = document.querySelector("#videoElement");
var facingMode = 'environment';

// Get the exact size of the video element.
var width = 300;
var height = 300;

var takePicture = function () {
    var hidden_canvas = document.querySelector('canvas');
    var image = document.querySelector('#snap');
    const url = 'api/img-processing';
    // Context object for working with the canvas.
    var context = hidden_canvas.getContext('2d');
    // Set the canvas to the same dimensions as the video.
    hidden_canvas.width = width;
    hidden_canvas.height = height;

    // Draw a copy of the current frame from the video on the canvas.
    context.drawImage(video, 0, 0, width, height);

    // Get an image dataURL from the canvas.
    var imageDataURL = hidden_canvas.toDataURL('image/png');
    return fetch(url, {
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({img: imageDataURL}), // body data type must match "Content-Type" header
    }).then(response => {
        console.log(response);
    });
}

var loadCamera = function (facingMode) {
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: {
                    exact: facingMode
                }
            }
        })
            .then(function (stream) {
                document.getElementById('js-error-msg').innerHTML = "";
                video.srcObject = stream;
                video.play();
            })
            .catch(function (error) {
                document.getElementById('js-error-msg').innerHTML = error.message + ' '  + error.name; 
                console.log("Something went wrong!", error);
            });
    }
};

var switchCamera = function () {
    facingMode = facingMode === 'environment' ? 'user' : 'enviroment';
    video.pause()
    video.srcObject = null
    loadCamera(facingMode);
};

var init = function () {
    document.getElementById('js-take-pic').addEventListener('click', (e) => {
        takePicture();
    });

    document.getElementById('js-switch-camera').addEventListener('click', (e) => {
        switchCamera();
    });

    loadCamera(facingMode);
}

init();