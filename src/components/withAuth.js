import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

//This component wraps around another component and ensures the user attempting to access it has authorization
//In this case, if the user is not logged in, they are redirected to the signin page.
export default function withAuth(ComponentToProtect, args) {
    return class extends Component {
        constructor() {
            super();
            this.state = {
                loading: true,
                redirect: false,
            };
        }
        componentDidMount() {
            fetch('/api/checkToken')
                .then(res => {
                    if (res.status === 200) {
                        this.setState({ loading: false });
                    } else {
                        const error = new Error(res.error);
                        throw error;
                    }
                })
                .catch(err => {
                    console.error(err);
                    this.setState({ loading: false, redirect: true });
                });
/*            checkToken()
                .then(res => {
                    if (res === true){
                        this.setState({ loading: false });
                    }
                    else{
                        this.setState({ loading: false, redirect: true });
                    }
                });*/
        }
        render() {
            const { loading, redirect } = this.state;
            if (loading) {
                return null;
            }
            if (redirect) {
                return <Redirect to="/signin" />;
            }
            return <ComponentToProtect {...args} />;
        }
    }
}