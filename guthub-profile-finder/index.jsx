import { useEffect, useState } from "react"
import User from "./user";
import "./styles.css"

export default function (){
    const[userName, setUserName] = useState("BharadwajTalabattula");
    const[loading, setLoading] = useState(false);
    const[userData, setUserData] = useState(null);

    async function fetchGithubUserData(){

        setLoading(true);

        const res = await fetch(`https://api.github.com/users/${userName}`)
        const data = await res.json();

        if(data){
            setUserData(data);
            setLoading(false);
            setUserName("");
        }

    }


    function handleSubmit(){
        fetchGithubUserData();
    }

    useEffect(()=>{
        fetchGithubUserData();
},[])


if(loading){
    return(
        <h1>
            Loading data! Please wait...
        </h1>
    )
}

    return(
        <div className = "github-profile-container">
            <div className = "input-wrapper">
                <input
                name = "SearchGithubUserProfile"
                type = "text"
                placeholder= "Search Github Profile..."
                value = {userName}
                onChange = {(event => setUserName(event.target.value))}
                />
                <button onClick = {handleSubmit}>
                    Search
                </button>
            </div>
            {
                userData !== null? <User user={userData}/> : null
            }
        </div>
    )
}