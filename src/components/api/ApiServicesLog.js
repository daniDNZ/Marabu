import { handleErrors, handleAuth } from "./ApiFetch";

export const addServicesLog = (bodyData) => {
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

    request = new Request("http://192.168.1.81:8888/api/services_log/add", config);

    fetch(request)
        .then(response => handleErrors(response))
        .catch(e => handleAuth(e));

}