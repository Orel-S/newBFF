import { saveUser } from '../utils/util';

//Using email as a key, we search the database and retrieve user info to populate the profile page.
async function getProfile(email){
    const response = await fetch('/api/profile', {
        method: 'POST',
        body: JSON.stringify({email}),
        headers: {
            'Content-Type': 'application/json'
        },

    });
    return await response.json();
}

//Check email and password against the database to make sure the user is valid. If valid, save data in local storage.
export async function authenticate(email, password){
    fetch('/api/authenticate', {
        method: 'POST',
        body: JSON.stringify({email, password}),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if (res.status === 200) {
            getProfile(email).then(profile => {
                console.log({profile});
                saveUser(profile);
            })

        } else {
            const error = new Error(res.error);
            throw error;
        }
    })
        .catch(err => {
            console.log(err);
            alert('Error logging in please try again');
        });
}

//Uses email as a key to find a database user entry, then updates one of the elements using obj.key and obj.value
//Current limitation: Can only update one element at a time. Should rework this to be able to update an arbitrary number of elements.
export async function update(email, obj){
    fetch('/api/update', {
        method: 'POST',
        body: JSON.stringify({email, [obj.key]: obj.value}),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if (res) {
            getProfile(email).then(profile => {
                console.log({profile});
                saveUser(profile);
            })
        }
        else {
            const error = new Error(res.error);
            throw error;
        }
    })
        .catch(err => {
            console.log(err);
            alert('Error updating please try again');
        });
}

//Creates a new database entry, using email as the key
export async function register(email, password, firstname, lastname){
    fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({email, password, bio:"Place your bio here!", img: './images/profile.png', firstname, lastname}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            if (res.status === 200) {
                console.log("Registered Successfully!");
            } else {
                const error = new Error(res.error);
                throw error;
            }
        })
        .catch(err => {
            console.error(err);
            alert('Error signing up, please try again');
        });
}

//Clears saved user data and redirects to the sign in page
export async function logout(){
    fetch('/api/logout', {
        method: 'get',
        credentials: 'include'
    })
        .then(function(response) {
            if (response.redirected) {
                return window.location.replace(response.url);
            }

    })
        .catch(function(err) {
            console.log(err);
        });
}

//Checks to see if user is signed in and has a valid token
export async function checkToken(){
    fetch('/api/checkToken')
        .then(res => {
            if (res.status === 200) {
                Promise.resolve(true);
                /*this.setState({ loading: false });*/
            } else {
                const error = new Error(res.error);
                throw error;
            }
        })
        .catch(err => {
            console.error(err);
            Promise.resolve(false);
            /*this.setState({ loading: false, redirect: true });*/
        });
}



