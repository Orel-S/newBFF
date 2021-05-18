import { saveUser } from '../utils/util';

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

export async function update(email, bio = null, img = null, itemToUpdate){
    fetch('/api/updatebio', {
        method: 'POST',
        body: JSON.stringify({email, bio}),
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



export async function logout(){
    fetch('/api/logout', {
        method: 'get',
        credentials: 'include'
    }).then(function(response) {
        if (response.redirected) {
            return window.location.replace(response.url);
        }

    }).catch(function(err) {
        console.log(err);
    });
}



