import { handleErrors, handleAuth } from "./ApiFetch";

export const getVisits = (callback, currentPage = 1) => {

    const config = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    }
    const request = new Request(`http://192.168.1.81:8888/api/${currentPage}/visits`, config);
    fetch(request)
        .then(response => handleErrors(response))
        .then(data => callback(data, getVisits))
        .catch(e => handleAuth(e));

}

export const findVisits = (callback, currentPage = 1, bodyData = {}) => {

    const config = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
    }
    const request = new Request(`http://192.168.1.81:8888/api/${currentPage}/visits`, config);
    fetch(request)
        .then(response => handleErrors(response))
        .then(data => callback(data, findVisits))
        .catch(e => handleAuth(e));

}

export const findTime = (callback, filter) => {
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
    const request = new Request("http://192.168.1.81:8888/api/visits/time", config);
    fetch(request)
        .then(response => handleErrors(response))
        .then(data => callback(data))
        .catch(e => handleAuth(e));
}

export const findOneVisit = (callback, id) => {

    const config = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
    }
    const request = new Request(`http://192.168.1.81:8888/api/visits/${id}`, config);
    fetch(request)
        .then(response => handleErrors(response))
        .then(data => callback(data))
        .catch(e => handleAuth(e));

}

export const findTodayVisits = (callback, date, uId = '') => {
    const bodyData = {
        datePicker: date,
        uId: uId
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
    const request = new Request(`http://192.168.1.81:8888/api/visits/today`, config);
    fetch(request)
        .then(response => handleErrors(response))
        .then(data => callback(data))
        .catch(e => handleAuth(e));

}

export const addUpdateVisit = (fData, action, id = '') => {
    const dateTime = `${fData.datePicker.value} ${fData.timePicker.value}`;

    const bodyData = {
        id: id,
        done: fData.completedPicker.value,
        category: fData.category.value,
        treatment: fData.treatment.value,
        patientWeight: fData.patientWeight.value,
        description: fData.description.value,
        patient: fData.patientPicker.value.split('#')[1],
        vet: fData.userPicker.value.split(' - ')[1],
        duration: parseInt(fData.duration.value) / 15,
        date_time: dateTime
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
    let request;
    if (action == 'add') {
        request = new Request("http://192.168.1.81:8888/api/visits/add", config);
    } else {
        request = new Request("http://192.168.1.81:8888/api/visits/update", config);
    }


    fetch(request)
        .then(response => handleErrors(response))
        .then(data => window.location = `/turdus/visits/${data.id}`)
        .catch(e => handleAuth(e));

}

export const closeVisit = (fData, id, location) => {
    const dateTime = `${fData.datePicker.value} ${fData.timePicker.value}`;

    const bodyData = {
        id: id,
        done: fData.completedPicker.value,
        category: fData.category.value,
        treatment: fData.treatment.value,
        patientWeight: fData.patientWeight.value,
        description: fData.description.value,
        patient: fData.patientPicker.value.split('#')[1],
        vet: fData.userPicker.value.split(' - ')[1],
        duration: parseInt(fData.duration.value) / 15,
        date_time: dateTime
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
    let request = new Request("http://192.168.1.81:8888/api/visits/update", config);

    fetch(request)
        .then(response => handleErrors(response))
        .then(data => window.location = location)
        .catch(e => handleAuth(e));

}

export const closeVisitFast = (id, location) => {

    const config = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    }

    let request = new Request(`http://192.168.1.81:8888/api/visits/${id}/close`, config);

    fetch(request)
        .then(response => handleErrors(response))
        .then(data => window.location = location)
        .catch(e => handleAuth(e));

}

export const updateCart = (id, cart) => {

    const bodyData = {
        cart: cart
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

    let request = new Request(`http://192.168.1.81:8888/api/visits/${id}/cart`, config);

    fetch(request)
        .then(response => handleErrors(response))
        .catch(e => handleAuth(e));

}

export const removeVisit = (id) => {

    const config = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    }
    
    const request = new Request(`http://192.168.1.81:8888/api/visits/${id}/remove`, config);
    
    fetch(request)
        .then(response => handleErrors(response))
        .then(data => { window.location.assign('/turdus/search'); })
        .catch(e => console.log(e))

}