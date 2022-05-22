import { handleErrors, handleAuth } from "./ApiFetch";

export const getServices = (callback, filter, currentPage = 1) => {
    const bodyData = filter;
    const config = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
    }
    const request = new Request(`http://192.168.1.81:8888/api/services/${currentPage}/filter`, config);
    fetch(request)
        .then(response => handleErrors(response))
        .then(data => callback(data))
        .catch(e => console.log(e));
}

export const findService = (callback, id) => {
    const config = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
    }
    const request = new Request(`http://192.168.1.81:8888/api/services/${id}`, config);
    fetch(request)
        .then(response => handleErrors(response))
        .then(data => callback(data))
        .catch(e => console.log(e));
}

export const addUpdateService = (fData, action, id = '') => {

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
    if (action == 'add') {
        request = new Request("http://192.168.1.81:8888/api/services/add", config);
    } else {
        request = new Request("http://192.168.1.81:8888/api/services/update", config);
    }


    fetch(request)
        .then(response => handleErrors(response))
        .then(data => { window.location.assign('/turdus/services/new'); })
        .catch(e => console.log(e))

}

export const removeService = (id) => {

    const config = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    }
    
    const request = new Request(`http://192.168.1.81:8888/api/services/${id}/remove`, config);
    
    fetch(request)
        .then(response => handleErrors(response))
        .then(data => { window.location.assign('/turdus/services'); })
        .catch(e => console.log(e))

}