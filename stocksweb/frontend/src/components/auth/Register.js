import React, {useState, useContext} from 'react';
import { useHistory } from "react-router-dom";
import Axios from "axios";
import UserContext from "../context/UserContext"
import ErrorNotice from '../layout/ErrorNotice';


export default function Register() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();

    const {setUserData} = useContext(UserContext);
    const history = useHistory();
    const [error, setError] = useState();

    const submit = async (e) =>{
        e.preventDefault();
        const newUser = {email, password, passwordCheck};
        const registerRes = Axios.post(
            "http://127.0.0.1:5000/users/register",
            newUser,
        ).then(response => {
            history.push("/");
        }).catch((error) => {
            (error.response.data.msg && setError(error.response.data.msg));
        });
    };

    return (
        <div className="page">
            <h2>Register</h2>
            {error && <ErrorNotice message={error} clearError= {() => setError(undefined)}/>}
            <form className="form" onSubmit={submit}>
                <label htmlFor="reg-email">Email</label>
                <input id="reg-email" type="email" onChange={(e)=> setEmail(e.target.value)}/>

                <label htmlFor="reg-password">Password</label>
                <input id="reg-password" type="password" onChange={(e)=> setPassword(e.target.value)}/>
                <input placeholder="Verify password" type="password" onChange={(e)=> setPasswordCheck(e.target.value)} />

                <input type="submit" value="Register"/>
            </form>
        </div>
    )
}
