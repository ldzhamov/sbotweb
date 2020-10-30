import React, { useEffect, useContext } from 'react'
import UserContex from "../context/UserContext"
import { useHistory } from "react-router-dom";

export default function Home() {
    const {userData} = useContext(UserContex);
    const history = useHistory();

    useEffect(() => {
        if (!userData.user){
            history.push("/login");
        }
        return () => {
        }
    }, [userData]);
    return (
        <div className="page">Home</div>
    )
}