import { handleErrors, handleAuth } from "./ApiFetch";
import bcrypt from "bcryptjs/dist/bcrypt";

// export const getCurUser = (callback, username) => {
//     const bodyData = {
//         username: username,
//     }
//     const config = {
//         method: 'POST',
//         mode: 'cors',
//         headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`,
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(bodyData)
//     }
//     const request = new Request(`http://192.168.1.81:8888/api/users/get_current`, config);
//     fetch(request)
//         .then(response => handleErrors(response))
//         .then(data => callback(data))
//         .catch(e => handleAuth(e));
// }

export async function getCurUser(callback, username) {
    const bodyData = {
        username: username,
    }
    const config = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
    }
    const request = new Request(`http://192.168.1.81:8888/api/users/get_current`, config);
    const response = await fetch(request);
    const data = await response.json();
    
    if(data.roles) {
        callback(data)
    } else if( /4[0-9][0-9]$/.test(data.code)) {
        localStorage.removeItem('token');
    } 
    
}

export const getOneUser = (callback, id) => {
    const config = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    }
    const request = new Request(`http://192.168.1.81:8888/api/user/${id}`, config);
    fetch(request)
        .then(response => handleErrors(response))
        .then(data => callback(data))
        .catch(e => handleAuth(e));
}

export const getUsers = (callback, filter = {}, currentPage = 1) => {

    const config = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(filter)
    }
    const request = new Request(`http://192.168.1.81:8888/api/${currentPage}/users`, config);
    fetch(request)
        .then(response => handleErrors(response))
        .then(data => callback(data))
        .catch(e => handleAuth(e));

}

export const addUpdateUser = (fData, action, id = '') => {

    const rolesDOM = document.querySelectorAll('input[type=checkbox]');
    let roles = [];
    rolesDOM.forEach(r => {
        if (r.checked) {
            roles.push(r.value);
        }
    });
    roles.push('ROLE_STAFF');
    
    const password = bcrypt.hashSync(fData.get('username'));
    fData.append('password', password);
    fData.append('roles', roles);
    fData.append('id', id);

    const config = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: fData
    }
    let request;
    if (action === 'add') {
        request = new Request("http://192.168.1.81:8888/api/user/add", config);
    } else {
        request = new Request("http://192.168.1.81:8888/api/user/update", config);
    }


    fetch(request)
        .then(response => handleErrors(response))
        .then(data => { window.location = `/turdus/users/${data.id}`; })
        .catch(e => console.log(e))

}

export const updateProfile = (fData, id) => {

    console.log(fData)

    const config = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: fData
    }
    const request = new Request(`http://192.168.1.81:8888/api/user/${id}/update_profile`, config);
    
    fetch(request)
        .then(response => handleErrors(response))
        .then(data => { window.location = `/turdus/users/${data.id}/profile`; })
        .catch(e => console.log(e))

}

export const changePswd = (fData, id) => {
    
    const password = bcrypt.hashSync(fData.get('password'));
    fData.append('pswd', password);
    fData.append('id', id);
    fData.delete('password');
    fData.delete('passwordRepeat');

    const config = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: fData
    }
    const request = new Request("http://192.168.1.81:8888/api/user/change_pswd", config);

    fetch(request)
        .then(response => handleErrors(response))
        .then(data => { alert('Contraseña cambiada') })
        .catch(e => console.log(e))

}

export const getVets = (callback, id) => {


    const config = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    }
    const request = new Request("http://192.168.1.81:8888/api/vets", config);
    fetch(request)
        .then(response => handleErrors(response))
        .then(data => callback(data, id))
        .catch(e => handleAuth(e));

}

export const findVets = (callback, bodyData = {}) => {

    const config = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
    }
    const request = new Request(`http://192.168.1.81:8888/api/vets`, config);
    fetch(request)
        .then(response => handleErrors(response))
        .then(data => callback(data))
        .catch(e => handleAuth(e));

}

export const removeUser = (id) => {

    const config = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    }
    
    const request = new Request(`http://192.168.1.81:8888/api/users/${id}/remove`, config);
    
    fetch(request)
        .then(response => handleErrors(response))
        .then(data => { window.location.assign('/turdus/settings'); })
        .catch(e => console.log(e))

}