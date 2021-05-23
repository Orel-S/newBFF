# newBFF

This is a small social media site with user authentication, account creation (using a MongoDB database), and a chat between users (work in progress).

Note: This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Running the App

To run the app, you will first need to run `npm install`.

In order to properly run the express server, you will need a secret string for password encryption and a MongoDB URI.

Store them as follows:
1. Create a file called `.env` in your top-level folder for the project (same place as `server.js`)
2. Store them as strings, as follows
>SECRET="secretstringhere"
>MONGU_URI="mongourihere"
3. Run `node server.js`
4. Run `npm start`

You should be good to go! If you're experiencing any trouble feel free to open an issue or pull request.


## Possible Bugs

### Signing in doesn't work!

If you are certain your account details are correct, then try to go directly to the `localhost:3000` page. This issue occurs when the sign in page reloads before authentication is confirmed with the server.