<p align="center">
  <img src="https://" alt="Logo" width="150" height="150">
  <h1 align="center" >NIFTY Project</h1>
</p>

> Live version [link](https://niftymusic.netlify.app/)

The goal of the project is to create a music web app similar to SoundCloud / Spotify. The users can listen to and upload music, as well as follow other users and create custom playlists.
Front End: React.js, Redux Toolkit, Sass
Back End: Node.js, Express
Database: MongoDB, MySQL
Authentication: Firebase
Media: Cloudinary

## Why Nifty? 🚀

In popular culture, Nifty is conceived as something attractive, stylish, particularly good or effective.
Those are the core values that we've tried to inject into the product. A modern and gorgeous UI and a blazing fast and satisfying user experience.

## Start as User🚀

Regular users can register for free and gain access to all the songs and public playlists in the app. They can also create custom playlists and follow other users and artists.

## Start as Artist🚀

In order to be able to upload their own songs, users need to opt in for a special artist account.

## Start as Developer🚀

### Requirements 📋

_You need to install nodejs_

Go to [NodeJs web page](https://nodejs.org/es/) download and install the
program.

_Then you have to install yarn_

```
npm install --global yarn
```

_You need to install Docker_

[Docker](https://www.docker.com/products/docker-desktop)

_When you have installed this two programs you need to create acounts in:_

- [Firebase](https://firebase.google.com/)
- [MongoDB Atlas](https://www.mongodb.com/)
- [Cloudinary](https://cloudinary.com/)

### Installation 🔧

_First clone the repository_

```
git clone https://github.com/ibaiway/nifty-frontend
git clone https://github.com/ibaiway/nifty-backend
git clone https://github.com/ibaiway/nifty-stats-api
```

_Then run yarn install in the base folder_

```
yarn install
```

_When you have all the dependencies installed you need to create two .env files,
one in web folder, and the other in api folder_

_The web .env file need to contain the next variables:_

```
REACT_APP_API_BASE_URL= http://localhost:4000
REACT_APP_API_KEY = Your FireBase Api key
REACT_APP_AUTH_DOMAIN = Your FireBase auth domain
REACT_APP_PROJECT_ID = Your FireBase project id
REACT_APP_STORAGE_BUCKET = Your FireBase storage bucket
REACT_APP_MESSAGING_SENDER_ID = Your FireBase messaging sender id
REACT_APP_APP_ID = Your FireBase app id
REACT_APP_CLOUDINARY_IMG_URL = Your Cloudinary img url
REACT_APP_CLOUDINARY_PRESET_PROFILE_IMG = A Cloudinary preset to upload profile images
REACT_APP_CLOUDINARY_PRESET_SONGS = A Cloudinary preset to upload songs
REACT_APP_CLOUDINARY_PRESET_COVERS = A Cloudinary preset to upload covers images
REACT_APP_CLOUDINARY_PRESET_PLAYLIST = A Cloudinary preset to upload playlist images
REACT_APP_RECAPTCHA_WEB_KEY = Your Google ReCaptcha web key
```

_The api .env file need to contain the next variables:_

```
FB_CERT_TYPE= Your FireBase cert type
FB_CERT_PROJECT_ID= Your FireBase project id
FB_CERT_PRIVATE_KEY_ID= Your FireBase private key id
FB_CERT_PRIVATE_KEY= Your FireBase private key
FB_CERT_CLIENT_EMAIL= Your FireBase client email
FB_CERT_CLIENT_ID= Your FireBase client id
FB_CERT_AUTH_URI= Your FireBase Auth uri
FB_CERT_TOKEN_URI= Your FireBase token uri
FB_CERT_AUTH_PROVIDER_X_509_CERT_URL= Your FireBase cert auth provider x 509 cert url
FB_CERT_CLIENT_X_509_CERT_URL= Your FireBase cert client x 509 cert url
MONGO_DB_URL_PRODUCTION= Your MongoDB Atlas connection url for producction
MONGO_DB_URL_DEVELOPMENT= Your MongoDB Atlas connection url for development
MONGO_DB_URL_TEST= Your MongoDB Atlas connection url for test

```

### Client-Side 🖥

The frontend has been created with React + Redux Toolkit. The folder structure is based on Atomic Design (https://bradfrost.com/blog/post/atomic-web-design/) for clarity and reusability of the components.
The _api_ directory contains all services that take care of the communication between the React application (frontend) and an API (backend). A single service provides multiple functions to retrieve data from or post data to an external service using the HTTP protocol. Those services include Firebase and Cloudinary.
_i18n_ stands for internationalization and takes care of the language support of the application. The including JSON files are basically objects containg fixed constants as keys and their associated translations as values.
All the necessary tests that assure that the code was running properly are stored in the _test_ folder.

### Server-Side 🔐

The backend is divided in two, the main one (Node.js) and the one for the statistics (Laravel).

#### NodeJS

This back end side is our main API. Here we receive most of the requests that are sent by the front end. This API has the core functionalities of the back end such as the authentication, the database management and the use of other third party services as _cloudinary_. This API also interacts with the other side of our back end.

#### PHP Laravel

This is our secondary API. It was created to manage all of the app statistics. The main purpose of our application is not depending on this, but it is very useful to gain valuable knowledge on how our app is being used.

## Deployment 🛫

The backend has been deployed to [Heroku](www.heroku.com) and the frontend to [Netlify](www.netlify.com).

# 🧭 App navigation

## Entry points 🏁

Nifty entry point is a landing page from where the user is able to either log in or sign up with email/password or a Google account.

## Dashboard 📈

The dashboards allows users to access the top trending tracks, artists and playlists at a quick glance.

![Mockup-logo](./documentation/)
PICTURE DASH

The rest of the pages are accessible via a link from the side nav.

![Mockup-logo](./)
PICTURE SEARCH

The search functionality serves to the user artists, tracks and playlists that match the search query.

## Content creation & visualization 🎧

The main purpose of Nifty is to upload, share and stream music in the easiest way possible.

![Mockup-logo](./)

### Tracks

 **upload** a song - simply drag and drop your audio file, making sure you specify its _title_, _genre_ and _image_.

### Playlists

In the _My playlists_ section, the user can **create playlists** with a custom, name, image and an optional description. The playlist's visibility can be set to either public or private. All of these details can be edited later on.

## Artists & User views 👩‍💻

![Mockup-logo](./documentation/)

One of the main purposes of Nifty is to discover and connect with artists & users. Clicking on a user or an artist image redirects to a more detailed view of their publicly available activity - songs, albums or playlists - and the ability to follow them.

![Mockup-logo](./documentation/)

## Queue 👣

User can add songs to the queue via the contextual menu. The queue view, accessible from the audio player controls, allows the user to modify and delete songs.

## Account management 🧩

![Mockup-logo](./)
ACCOUNT DETAILS PICTURE

The _account_ view includes a summary of the user information and the ability to update the details and the account type. form with all the editable fields the refering to the user.
If the user wants to become an artist in this section. An artistic name will be required. Once the artist option has been activated, the user will be able to upload and share his music.

The password can be updated in the _password update_ view. In case of forgetting their password, the user can recover it from the log in section via the _forgot password_ page.

# 🗺 Project Journey

## Team Objectives 🎯

- Clean and modular code
- Seamless user experience
- Unique and attractive design
- Custom API arquitecture
- Secure server side
- Agile environment
- Transparent and fluid team communication
- Collaborative work

## Organization 📆

In order to achieve all of our goals we have implemented the Scrum Agile Methodology. We divided all the process into weekly sprints. Daily standups gave the team clarity on the current progress and possible blockers. Weekly reviews allowed us to review all the tasks and plan the week ahead. We used Github Projects with a Kanban board for a quick visual of the team planning and progress. Github projects allowed us to automate and connect those issues with the branches of our repository.

![enter image description here](./)

PICTURE GITHUB PROJECT

## Design 🛠️


The web app features a modern and 100% custom design. No external component libraries were used. 

## Build with 🛠️

# 🕵️‍♂️ Resources

## Main resources 🧬

- [Yarn](https://classic.yarnpkg.com/en/docs/install/#windows-stable)
- [Cloudinary](https://cloudinary.com/)
- [Docker](https://www.docker.com/)
- [Eslint](https://eslint.org/)
- [Express](https://expressjs.com/)
- [Firebase](https://firebase.google.com/)
- [Jest](https://jestjs.io/)
- [Laravel](https://laravel.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [mySQL](https://www.mysql.com/)
- [Node JS](https://nodejs.org/)
- [Prettier](https://prettier.io/)
- [React](https://es.reactjs.org/)
- [React Redux](https://es.redux.js.org/)
- [React Router](https://github.com/remix-run/react-router)
- [SASS](https://sass-lang.com/)
- [PostMan](https://www.postman.com/)

## Libraries 📚

- [Formik](https://github.com/formium/formik)
- [Framer-motion](https://www.framer.com/motion/)
- [Husky](github.com/typicode/husky)
- [Helmet](github.com/helmetjs/helmet)
- [Morgan](https://github.com/expressjs/morgan)
- [Nodemon](https://nodemon.io/)
- [Node Cron](https://github.com/node-cron/node-cron)
- [React-toastify](https://github.com/fkhadra/react-toastify)
- [React-dropzone](https://react-dropzone.js.org/)
- [React-icons](https://react-icons.github.io/react-icons/)
- [React-device-detect](https://github.com/duskload/react-device-detect)
- [React Alice Carousel](https://github.com/maxmarinich/react-alice-carousel)
- [React-custom-scrollbars](https://github.com/malte-wessel/react-custom-scrollbars)
- [React-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd)
- [Yup](https://github.com/jquense/yup)

## Test structure 🦴

Jest is a delightful JavaScript Testing Framework with a focus on simplicity. We have implemented Jest for all the unit tests. For integration and end-to-end tests, we've used Cypress.

## Quality test 🦴

In addition, we have used two external websites where they analyze the quality of the code to see in which sections we could improve the code made and the results have been the following.

# Contributing 🖇️

Feel free to fork the repository and create a pull request.

# Contributors ✨
