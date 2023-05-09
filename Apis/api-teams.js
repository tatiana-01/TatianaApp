const opcTeams={
    "GET": ()=>getDataTeam(),
    "POST": (data)=>postDataTeam(data),
    "PUT": (data,id)=>putDataTeam(data,id),
    "DELETE": (id)=>deleteDataTeam(id),
}

let config={
    headers:new Headers({
        "Content-Type": "application/json"
    })
};

const getDataTeam = async()=>{
    config.method = "GET";
    let res= await ( await fetch("http://localhost:3000/teams",config)).json();
    return res;
}

const postDataTeam = async(data)=>{
    config.method = "POST";
    config.body=JSON.stringify(data);
    let res= await ( await fetch("http://localhost:3000/teams",config)).json();
    console.log(res);
}

const putDataTeam = async(data,id)=>{
    config.method = "PUT";
    config.body=JSON.stringify(data);
    let res= await ( await fetch(`http://localhost:3000/teams/${id}`,config)).json();
    console.log(res);
}

const deleteDataTeam = async(id)=>{
    config.method = "DELETE";
    let res= await ( await fetch(`http://localhost:3000/teams/${id}`,config)).json();
    console.log(res);
}

const getTeamById= async(id)=>{
    config.method = "GET";
    let res= await ( await fetch(`http://localhost:3000/teams/${id}`,config)).json();
    return res;
}

export {
    opcTeams, getDataTeam, postDataTeam, putDataTeam, deleteDataTeam, getTeamById
}