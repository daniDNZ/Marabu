import { handleErrors, handleAuth } from "./ApiFetch";
import bcrypt from "bcryptjs/dist/bcrypt";

export const getCurCustomer = (callback, email) => {
    const bodyData = {
        email: email,
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
    const request = new Request(`http://192.168.1.81:8888/api/customers/get_current`, config);
    fetch(request)
        .then(response => handleErrors(response))
        .then(data => callback(data))
        .catch(e => handleAuth(e));
}

export const getCustomers = (callback, currentPage = 1) => {

    const config = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
    }
    const request = new Request(`http://192.168.1.81:8888/api/${currentPage}/customers`, config);
    fetch(request)
        .then(response => handleErrors(response))
        .then(data => callback(data, getCustomers))
        .catch(e => handleAuth(e));
}

export const getAllCustomers = (callback, id) => {

    const config = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
    }
    const request = new Request(`http://192.168.1.81:8888/api/1/customers`, config);
    fetch(request)
        .then(response => handleErrors(response))
        .then(data => callback(data.allData, id))
        .catch(e => handleAuth(e));

}

export const findCustomers = (callback, currentPage = 1, bodyData = {}) => {

    const config = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
    }
    const request = new Request(`http://192.168.1.81:8888/api/${currentPage}/customers`, config);
    fetch(request)
        .then(response => handleErrors(response))
        .then(data => callback(data, findCustomers))
        .catch(e => handleAuth(e));

}

export const findOneCustomer = (callback, id) => {

    const config = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
    }
    const request = new Request(`http://192.168.1.81:8888/api/customers/${id}`, config);
    fetch(request)
        .then(response => handleErrors(response))
        .then(data => callback(data))
        .catch(e => handleAuth(e));

}

export const findCustomerPatients = (callback, id) => {

    const config = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
    }
    const request = new Request(`http://192.168.1.81:8888/api/customers/${id}/patients`, config);
    fetch(request)
        .then(response => handleErrors(response))
        .then(data => callback(data))
        .catch(e => handleAuth(e));

}

export const getDebt = (callback, id) => {

    const config = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
    }
    const request = new Request(`http://192.168.1.81:8888/api/customer/${id}/debt`, config);
    fetch(request)
        .then(response => handleErrors(response))
        .then(data => callback(data))
        .catch(e => handleAuth(e));

}

export const payDebt = (callback, id, bodyData) => {

    const config = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
    }
    const request = new Request(`http://192.168.1.81:8888/api/customer/${id}/debt/pay`, config);
    fetch(request)
        .then(response => handleErrors(response))
        .then(data => callback(data))
        .catch(e => handleAuth(e))

}

export const addUpdateCustomer = (fData, action, id = '') => {

    const bodyData = {
        id: id,
        email: fData.customerEmail.value,
        dni: fData.customerDni.value,
        name: fData.customerName.value,
        last_name: fData.customerLastname.value,
        postal_code: fData.customerPc.value,
        address: fData.customerAddress.value,
        phone: fData.customerPhone.value,
        info: fData.customerInfo.value,
        password: bcrypt.hashSync(fData.customerName.value)
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
        request = new Request("http://192.168.1.81:8888/api/customer/add", config);
    } else {
        request = new Request("http://192.168.1.81:8888/api/customer/update", config);
    }


    fetch(request)
        .then(response => handleErrors(response))
        .then(data => { window.location = `/turdus/customers/${data.id}`; })
        .catch(e => handleAuth(e))

}

export const removeCustomer = (id) => {

    const config = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    }
    
    const request = new Request(`http://192.168.1.81:8888/api/customers/${id}/remove`, config);
    
    fetch(request)
        .then(response => handleErrors(response))
        .then(data => { window.location.assign('/turdus/search'); })
        .catch(e => console.log(e))

}