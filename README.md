# Ionic Angular Student Expenses Application

Code Once, Have Every Where!

Probably the best framework ever.....

This app is built from Ionic Starter App for tabs and Basic Look and Feel (BLAF)

### For QL Student Expenses Runners
1. cd into client and npm Install
2. cd into server and npm Install
3. npm start to start server
4. cd into client
5. run ionic serve (will open up a page in browser)
6. Home Page has more instructions and overview


## Deploying

### Progressive Web App

1. Un-comment [these lines](https://github.com/ionic-team/ionic2-app-base/blob/master/src/index.html#L21)
2. Run `npm run ionic:build --prod`
3. Push the `www` folder to your hosting service

### Android

1. Run `ionic cordova run android --prod`

### iOS

1. Run `ionic cordova run ios --prod`

## Bug Tracker / Features TODO

1. Camera for expenses images, saving to DB and retrieving (currently works with memory/cache)
2. A Pipe To Validate Ammount entered is actually a valid currency , example cant submit an expense cost of 23.55htjK
3. Create Standard components for list views for uniform styling, seperate currently for diplaying different information for different roles.

