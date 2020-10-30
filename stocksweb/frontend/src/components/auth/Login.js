import React, {useState, useContext} from 'react';
import { useHistory } from "react-router-dom";
import Axios from "axios";
import UserContext from "../context/UserContext"
import ErrorNotice from '../layout/ErrorNotice';

export default function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const {setUserData} = useContext(UserContext);
    const history = useHistory();
    const [error, setError] = useState();

    const submit = async (e) =>{
        e.preventDefault();
        const loginUser = {email, password};
        
        const loginRes = await Axios.post(
            "http://127.0.0.1:5000/users/login",
            loginUser
        ).then(response => {
            setUserData({
                token:response.data.token,
                user:response.data.user,
            });
            localStorage.setItem("auth-token", response.data.token);
            history.push("/");
        }).catch((error) => {
            (error.response.data.msg && setError(error.response.data.msg));
        });
        
    };

    return (
        <div className="page">
            <h2>Log in</h2>
            {error && <ErrorNotice message={error} clearError= {() => setError(undefined)}/>}
            <form className="form" onSubmit={submit}>
                <label htmlFor="login-email">Email</label>
                <input id="login-email" type="email" onChange={(e)=> setEmail(e.target.value)}/>

                <label htmlFor="login-password">Password</label>
                <input id="login-password" type="password" onChange={(e)=> setPassword(e.target.value)}/>

                <input type="submit" value="Login"/>
            </form>
        </div>
    )
}