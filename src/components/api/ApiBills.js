import { handleErrors, handleAuth } from "./ApiFetch";


export const findBill = (callback, bData) => {
    const config = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bData)
    }
    const request = new Request(`http://192.168.1.81:8888/api/bill/find`, config);
    fetch(request)
        .then(response => handleErrors(response))
        .then(data => callback(data))
        .catch(e => handleAuth(e));

}

export const addBill = (callback, data) => {
    const config = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    let request;

    request = new Request("http://192.168.1.81:8888/api/bill/add", config);

    fetch(request)
        .then(response => handleErrors(response))
        .then(data => callback(data))
        .catch(e => handleAuth(e));

}

export const payBill = (data, location) => {
    const config = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    let request;

    request = new Request("http://192.168.1.81:8888/api/bill/update", config);

    fetch(request)
        .then(response => handleErrors(response))
        .then(data => window.location = location)
        .catch(e => handleAuth(e));

}