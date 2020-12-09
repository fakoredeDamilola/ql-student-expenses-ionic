# Ionic Angular Student Expenses Application

Code Once, Have Every Where!

Probably the best framework ever.....

This app is built from Ionic Starter App for tabs and Basic Look and Feel (BLAF)

***The Ionic CLI is needed to run the application.

## For QL Student Expenses Runners
1. cd into client and npm Install
2. cd into server and npm Install
3. npm start to start server
4. Open a new terminal window...
5. cd into client
6. run ionic serve (will open up a page in browser)
7. Home Page has more instructions and overview

** You should have 2 terianls running, one for the server, and one for the client...


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
2. A Pipe To Validate Amount entered is actually a valid currency , example cant submit an expense cost of 23.55htjK (Solution in place)
3. Create Standard components for list views for uniform styling, seperate currently for diplaying different information for different roles.
   --Fix Styling 
4. Date Ranges for Reports filter, Expenses Filter, Accounts Filter.
5. Invite Students to another expense report, currently can only be assoicated with one expense report.
   -- Invite Student who already has an account, current behavior when student is added to report, account created for them. 
6. Test Cases (unit tests and e2e), Documentation, Swagger Documentation update.
7. Trim api calls JSON objects, returning only the data needed for the specefic view.   


# Bugs

1.  Reports Manager Creates Expense in their personal profile, expense is not associated with a report 
2.  Admin Creates A regular student and that student is not assoiciated with a report


