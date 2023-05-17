# What the project is:

An app to allow small farmers and backyard gardners to easily sell the food they raise locally.   Trying to decentralize and localize the food system!

This site is currently in development and does not yet have active users, but if you want to see a live version with dummy users you can check it out [here](http://137.184.98.71) 

This project was bootstrapped with 

## Build Process:

This is a React.js front end, with the backend built with the open source [Pocket Base](https://github.com/pocketbase/pocketbase)

The app was initialized with [Create React App](https://github.com/facebook/create-react-app).

## Run The Code Locally:

If you want to check this out in a development enviornment 

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Features
I wanted the app to allow buyers to easily find sellers close to them.  I solved this by intigrating the [Leaflet Library](https://github.com/Leaflet/Leaflet) for displaying mapping features.  Each seller location is stored in the database and those are all mapped on the main page.  

In order to protect privacy for sellers who might use thier home as the selling point, before the lat long is stored in the database 
### `let indexOf = lat.indexOf('.');
			lat = lat.slice(0, indexOf + 3);
			lat = lat.concat('5');`
