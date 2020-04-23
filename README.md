# Second Language Learning AR

This is a project that allows you to use your webcam to identify objects, people etc. using Google Vison image recognition API and see the identified labels in multiple languages.

This Medium [post](https://medium.com/@veraalina/learn-new-languages-with-busuu-and-google-vision-api-9d6931bf0305) describes its implementation in more details

## Hosting

This app has been hosted on heroku [here](https://ar-sll.herokuapp.com/)
If you are on a MAC please use Safari or Mozilla to view it as in Chrome there seems to be an issue with webcam permissions. 

## Tech stack used
- NodeJS >= "10.x.x"
- MongoDB
- JS
- Yandex Translate API
- Google Vision API

## How to use
- Run `npm install`
- Setup a Google Vision API and pass it as a process variable named GOOGLE_API_KEY
- Setup a mongo DB hosting and plug it in server/config mongoUrl
- Run `npm start` and open `http://localhost:9000/`
- Enable webcam access for it and place an object in front of the camera
- You will see a list of translated labels 
- Change the translation language from the languages dropdown


**Caution**
This was implemented as a OKR side project and it's not suitable for production environments.



