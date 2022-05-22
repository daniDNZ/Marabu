import { handleErrors, handleAuth } from "./ApiFetch";

export const getPatients = (callback, currentPage = 1) => {

    const config = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    }
    const request = new Request(`http://192.168.1.81:8888/api/${currentPage}/patients`, config);
    fetch(request)
        .then(response => handleErrors(response))
        .then(data => callback(data, getPatients))
        .catch(e => handleAuth(e));

}

export const findPatients = (callback, currentPage = 1, bodyData = {}) => {

    const config = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
    }
    const request = new Request(`http://192.168.1.81:8888/api/${currentPage}/patients`, config);
    fetch(request)
        .then(response => handleErrors(response))
        .then(data => callback(data, findPatients))
        .catch(e => handleAuth(e));

}

export const findOnePatient = (callback, id) => {

    const config = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
    }
    const request = new Request(`http://192.168.1.81:8888/api/patients/${id}`, config);
    fetch(request)
        .then(response => handleErrors(response))
        .then(data => callback(data))
        .catch(e => handleAuth(e));

}

export const findPatientVisits = (callback, id) => {

    const config = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
    }
    const request = new Request(`http://192.168.1.81:8888/api/patients/${id}/visits`, config);
    fetch(request)
        .then(response => handleErrors(response))
        .then(data => callback(data))
        .catch(e => handleAuth(e));

}

export const addUpdatePatient = (fData, action, id = '') => {

    let birthday = `${fData.patientBirthday.value}`;
    if (birthday.length == 0) birthday = '1111-11-1';

    const bodyData = {
        id: id,
        name: fData.patientName.value,
        info: fData.patientInfo.value,
        chip: fData.patientChip.value,
        eyes: fData.patientEyes.value,
        color: fData.patientColor.value,
        weight: fData.patientWeight.value,
        gender: fData.genderPicker.value,
        sterilised: fData.sterilisedPicker.value,
        vet: fData.vetPicker.value.split(' - ')[1],
        race: fData.racePicker.value,
        species: fData.speciesPicker.value,
        customer: fData.responsiblePicker.value.split(' - ')[1],
        birthday: birthday
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
        request = new Request("http://192.168.1.81:8888/api/patient/add", config);
    } else {
        request = new Request("http://192.168.1.81:8888/api/patient/update", config);
    }


    fetch(request)
        .then(response => handleErrors(response))
        .then(data => { window.location = `/turdus/patients/${data.id}`; })
        .catch(e => handleAuth(e));

}

export const removePatient = (id) => {

    const config = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    }
    
    const request = new Request(`http://192.168.1.81:8888/api/patients/${id}/remove`, config);
    
    fetch(request)
        .then(response => handleErrors(response))
        .then(data => { window.location.assign('/turdus/search'); })
        .catch(e => console.log(e))

}