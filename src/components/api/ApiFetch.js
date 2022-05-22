export const handleErrors = (response)=> {
    if(!response.ok) throw Error(response.status);
    return response.json();
}

export const handleAuth = (e) => {
    if(/Error: 4[0-9][0-9]$/.test(e)){
        if(/\/turdus\/*/.test(window.location.pathname)) window.location.assign('/login');
    } 
}