

export default function user({user}){

    const{avatar_url, followers, following, name, login, created_at, public_repos} = user;

    const createDate = new Date (created_at);

    return(
       <div className= "profile-wrapper">
        <div>
            <img src ={avatar_url} alt = {name} className= "profile-image"/>
        </div>
        <div>
            <a href={`https://github.com/${name}`}>{name || login}</a>
            <p>User joined on {`${createDate.getDate()} ${createDate.toLocaleString("em-us", {month: "short"} )} ${createDate.getFullYear()}`}</p>
        </div>
        <div>
            <div>
                <p>Public Repos</p>
                <p>{public_repos}</p>
            </div>
            <div>
                <p>Followers</p>
                <p>{followers}</p>
            </div>
            <div>
                <p>Following</p>
                <p>{following}</p>
            </div>
        </div>
       </div>
    )
}