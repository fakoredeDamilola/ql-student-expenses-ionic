# Ionic Angular Student Expenses Application

Code Once, Have Every Where!

Probably the best framework ever.....

This app is built from Ionic Starter App for tabs and Basic Look and Feel (BLAF)

***The <a href="https://ionicframework.com/docs/cli">Ionic CLI</a> is needed to run the application.

## For QL Student Expenses Runners
1. cd into server and `npm Install`
2. `npm start` to start server (should say running "Server listening on port 4000" )
3. Open a new terminal window...
4. cd into client
5. run `npm i`
6. run `ionic serve` (will open up a page in browser)
7. Home Page has more instructions and overview

** You should have 2 terminals running, one for the server, and one for the client...


## Deploying

### Progressive Web App

1. Un-comment [these lines](https://github.com/ionic-team/ionic2-app-base/blob/master/src/index.html#L21)
2. Run `npm run ionic:build --prod`
3. Push the `www` folder to your hosting service

### Android

1. Run `ionic cordova run android --prod`

### iOS

1. Run `ionic cordova run ios --prod`

## Bugs Tracker / Features TODO

# TODO

1. Camera for expense images, saving to DB and retrieving (currently works with memory/cache)
2. A Pipe To validate amount entered is actually a valid currency , example cant submit an expense cost of 23.55htjK (Solution in place)
3. Create Standard components for list views for uniform styling, separate currently for displaying different information for different roles.
   --Fix Styling 
4. Date ranges for Reports filter, Expenses Filter, Accounts Filter.
5. Invite Students to another Expense Report, currently can only be associated with one Expense Report.
   -- Invite Students who already have an account, current behavior when a student is added to report, account created for them. 
6. Test cases (unit tests and e2e), Documentation, Swagger Documentation update.
7. Trim API calls JSON objects, returning only the data needed for the specific views, modify endpoints.   


# Bugs

1.  Reports Manager Creates Expense in their personal profile, expense is not associated with a reportId.

# Issues
1. <a href="https://medium.com/flawless-app-stories/gyp-no-xcode-or-clt-version-detected-macos-catalina-anansewaa-38b536389e8d">No Xcode or CLT version detected!</a>



