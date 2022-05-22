import { useEffect } from "react";
import { addUpdateCustomer, getCustomers } from "./api/ApiCustomers";
import { addUpdatePatient, findPatients, getPatients } from "./api/ApiPatients";
import { addUpdateVisit, findTime } from "./api/ApiVisits";
import { findRaces, getRaces, addUpdateRace } from "./api/ApiRaces";
import { getSpecies, addUpdateSpecies } from "./api/ApiSpecies";
import { getVets, addUpdateUser } from "./api/ApiUser";
import OpenTime from "./OpenTime";
import { AlertModal, NewPostalCode, NewRace, NewSpecies, NewSupplier } from "./Modals";
import { addUpdateProduct } from "./api/ApiProducts";
import { addUpdateSupplier, getSuppliers } from "./api/ApiSuppliers";
import { addUpdateService } from "./api/ApiServices";
import { addUpdatePostalCode, getPostalCodes } from "./api/ApiPostalCode";

// Listeners
const addEvents = (callback) => {
    const form = document.querySelector('form');
    form.addEventListener('submit', callback);
}

// Si el formulario es para update utilizamos un modal
const setModal = (action) => {
    if (action === 'update') return <AlertModal />
    else return <button type="submit" className="btn btn-primary">Guardar</button>
}

// Crea las options de las datalist
const handleDatalist = (id, name, identifier = '') => {
    const datalist = document.getElementById(id);
    const option = document.createElement('option');

    identifier === '' ? option.value = name : option.value = `${name} - ${identifier}`;

    datalist.append(option);
}

// Limpia una datalist
const cleanDatalist = (id) => {
    const datalist = document.getElementById(id);
    datalist.innerHTML = '';
}

// Desabilita las horas cogidas para las visitas
const handleTime = (data) => {

    let options = document.querySelectorAll('#timePicker>option');  // Recogemos los options

    options.forEach(o => {
        if (o.hasAttribute('disabled')) o.removeAttribute('disabled'); // Eliminamos el atributo disabled 
    })
    data.forEach(v => {                                  // Recorremos las visitas
        let dur = 0;                                     // Variable que recoge la duración de las visitas previas
        options.forEach(o => {
            if (dur > 1) {

                o.setAttribute('disabled', 'true');     // Si la duración > 1 quiere decir que está ocupado por otra visita, desabilitamos.
                dur--;                                  // Decrementamos la duración.

            } else {

                if (v.time == o.value) {                // Si coincide la hora con una de las visitas, desabilitamos.
                    o.setAttribute('disabled', 'true');
                    dur = v.duration;                   // Asignamos la duración a la variable para no pisar una visita con otra.
                }
            }
        });
    });
}

function UserForm({ action, id }) {

    // Manejador datos del formulario
    const handleFData = (e) => {
        e.preventDefault();

        const fData = new FormData(e.target);
        addUpdateUser(fData, action, id);   // Llamamos a la petición indicando la acción (add | update)
    }

    useEffect(() => {
        addEvents(handleFData);
        if (action === 'add') document.getElementById("userViewPage").textContent = `Nuevo usuario`;

    })
    return (
        <>
            <form id="auto-form">
                <div id="form-row-1" className="row">
                    <div className="d-flex flex-row justify-content-between" id="form-title">
                        <div className="d-flex flex-row">
                            <h3 className="col-auto" id="userViewPage"> </h3>
                        </div>
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="userName" className="form-label">Nombre:</label>
                        <input type="text" id="userName" name="name" className="form-control" required />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="userLastname" className="form-label" >Apellidos:</label>
                        <input type="text" id="userLastname" name="last_name" className="form-control" required />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="userArea" className="form-label" >Area:</label>
                        <input type="text" id="userArea" name="area" className="form-control" required />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="userCollegiate" className="form-label" >Colegiado Nº:</label>
                        <input type="text" id="userCollegiate" name="collegiate" className="form-control" />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="userUsername" className="form-label" >Usuario:</label>
                        <input type="text" id="userUsername" name="username" className="form-control" required />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="userPhone" className="form-label">Teléfono:</label>
                        <input type="text" id="userPhone" name="phone" className="form-control" required />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="userEmail" className="form-label">Email:</label>
                        <input type="email" id="userEmail" name="email" className="form-control" required />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="userDni" className="form-label">DNI:</label>
                        <input type="text" id="userDni" name="dni" className="form-control" />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="userSalary" className="form-label" >Salario:</label>
                        <input type="text" id="userSalary" name="salary" className="form-control" required />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="userPic" className="form-label" >Foto:</label>
                        <input type="file" id="userPic" name="pic" className="form-control" />
                    </div>
                </div>
                <div id="form-row-2" className="row">

                    <div className="mb-3 col-auto">
                        <label className="form-label" >Roles:</label>

                        <div className="form-check">
                            <input className="form-check-input" type='checkbox' value='ROLE_VET' id="ROLE_VET" />
                            <label className="form-check-label" htmlFor="ROLE_VET">Veterinaria/o</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type='checkbox' value='ROLE_ATV' id="ROLE_ATV" />
                            <label className="form-check-label" htmlFor="ROLE_ATV">ATV</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type='checkbox' value='ROLE_OFFICE' id="ROLE_OFFICE" />
                            <label className="form-check-label" htmlFor="ROLE_OFFICE">Oficina</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type='checkbox' value='ROLE_ADMIN' id="ROLE_ADMIN" />
                            <label className="form-check-label" htmlFor="ROLE_ADMIN">Admin</label>
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Guardar</button>
            </form>
        </>
    )
}

function CustomerForm({ action, id }) {

    const modal = setModal(action);

    // Manejador datos del formulario
    const handleFData = (e) => {
        e.preventDefault();

        const fData = e.target;
        addUpdateCustomer(fData, action, id);   // Llamamos a la petición indicando la acción (add | update)
    }

    // MODAL
    const handleModal = (e) => { // Eliminamos el botón submit que viene por defecto en el Form del modal
        const modTarget = e.target.dataset.bsTarget;
        const sendButton = document.querySelector(`${modTarget} button[type=submit]`);
        sendButton.classList.add('d-none');
    }

    // Datalist
    const handlePostalCodes = (d) => {
        d.forEach(pc => {
            let id = pc.id;
            handleDatalist('postalCode-datalist', id);
        });
    }

    useEffect(() => {
        addEvents(handleFData);
        getPostalCodes(handlePostalCodes);
    })
    return (
        <>
            <form id="auto-form">
                <div id="form-row-1" className="row">
                    <div className="d-flex flex-row justify-content-between" id="form-title">
                        <div className="d-flex flex-row">
                            <h3 className="col-auto" id="customerViewPage">Cliente </h3><span id="cus-debt-badge" className="fs-6"></span>
                        </div>
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="customerName" className="form-label">Nombre cliente:</label>
                        <input type="text" id="customerName" className="form-control" required />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="customerLastname" className="form-label" >Apellidos cliente:</label>
                        <input type="text" id="customerLastname" className="form-control" required />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="customerPhone" className="form-label">Teléfono cliente:</label>
                        <input type="text" id="customerPhone" className="form-control" required />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="customerEmail" className="form-label">Email:</label>
                        <input type="email" id="customerEmail" className="form-control" required />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="customerDni" className="form-label">DNI:</label>
                        <input type="text" id="customerDni" className="form-control" />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="customerPc" className="form-label" >C.P.:</label>
                        <div className="input-group" >
                            <input type="search" list="postalCode-datalist" id="customerPc" name="postalCode" className="form-control" required />
                            <button className="btn btn-outline-secondary" type="button" id="btnPc" data-bs-toggle="modal" data-bs-target="#newPostalCodeModal" onClick={handleModal}>Nueva</button>
                        </div>
                        <datalist id="postalCode-datalist"></datalist>
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="customerAddress" className="form-label">Dirección:</label>
                        <input type="text" id="customerAddress" className="form-control" />
                    </div>
                    <div className="row">
                        <div className="mb-3">
                            <label htmlFor="customerInfo" className="form-label">Información cliente:</label>
                            <textarea type="" id="customerInfo" className="form-control" rows="5" />
                        </div>
                    </div>
                </div>
                {modal}

            </form>
            <NewPostalCode />
        </>
    )
}

function PatientForm({ action, id = '' }) {

    const modal = setModal(action);

    // Manejador datos del formulario
    const handleFData = (e) => {
        e.preventDefault();

        const fData = e.target;             // Asignamos el formulario
        addUpdatePatient(fData, action, id);   // Llamamos a la petición indicando la acción (add | update)
    }

    const handleVets = (data) => {
        data.forEach(e => {
            const name = e.name;
            const identifier = e.username;

            handleDatalist('vetPicker-datalist', name, identifier)
        });
    }

    const handleCustomers = (data) => {
        data['allData'].forEach(e => {
            const name = e.name;
            const identifier = e.email;

            handleDatalist('responsiblePicker-datalist', name, identifier)
        });
    }

    const handleSpecies = (data) => {
        data.forEach(e => {
            const name = e.name;

            handleDatalist('speciesPicker-datalist', name)
        });
    }

    const handleRaces = (data) => {
        data.forEach(e => {
            const name = e.name;

            handleDatalist('racePicker-datalist', name)
        });
    }

    const captureSpecies = (e) => {
        e.preventDefault();

        const species = e.target.value;

        cleanDatalist('racePicker-datalist');
        findRaces(handleRaces, species);
    }

    const fetchDatalists = () => {
        getVets(handleVets);
        getCustomers(handleCustomers);
        getSpecies(handleSpecies);
        getRaces(handleRaces);
    }

    // MODAL
    const handleModal = (e) => { // Eliminamos el botón submit que viene por defecto en el Form del modal
        const modTarget = e.target.dataset.bsTarget;
        const sendButton = document.querySelector(`${modTarget} button[type=submit]`);
        sendButton.classList.add('d-none');
    }

    useEffect(() => {
        addEvents(handleFData);
        fetchDatalists();
    })
    return (
        <>
            <form id="auto-form">
                <div id="form-row-1" className="row">
                    <div className="row justify-content-between" id="form-title">
                        <h3 className="col-auto">Paciente</h3>
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="vetPicker" className="form-label">Veterinaria/o:</label>
                        <input type="search" id="vetPicker" className="form-control" list="vetPicker-datalist" placeholder="Buscar..." />
                        <datalist id="vetPicker-datalist">
                        </datalist>
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="responsiblePicker" className="form-label">Cliente:</label>
                        <input type="search" id="responsiblePicker" className="form-control" list="responsiblePicker-datalist" placeholder="Buscar..." />
                        <datalist id="responsiblePicker-datalist">
                        </datalist>
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="patientName" className="form-label">Nombre paciente:</label>
                        <input type="text" id="patientName" className="form-control" />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="speciesPicker" className="form-label">Especie:</label>
                        <div className="input-group" >
                            <input type="search" id="speciesPicker" className="form-control" list="speciesPicker-datalist" placeholder="Buscar..." onInput={captureSpecies} />
                            <button className="btn btn-outline-secondary" type="button" id="btnSpecies" data-bs-toggle="modal" data-bs-target="#newSpeciesModal" data-bs-dismiss="modal" onClick={handleModal}>Nueva</button>
                        </div>
                        <datalist id="speciesPicker-datalist">
                        </datalist>
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="racePicker" className="form-label">Raza:</label>
                        <div className="input-group" >
                            <input type="search" id="racePicker" className="form-control" list="racePicker-datalist" placeholder="Buscar..." />
                            <button className="btn btn-outline-secondary" type="button" id="btnRace" data-bs-toggle="modal" data-bs-target="#newRaceModal" data-bs-dismiss="modal" onClick={handleModal}>Nueva</button>
                        </div>
                        <datalist id="racePicker-datalist">
                        </datalist>
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="genderPicker" className="form-label">Género:</label>
                        <select id="genderPicker" className="form-select">
                            <option id="ge-null" value="">Select...</option>
                            <option id="ge-Male" value="Male">Macho</option>
                            <option id="ge-Female" value="Female">Hembra</option>
                        </select>
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="sterilisedPicker" className="form-label">Esterilizad@:</label>
                        <select type="" id="sterilisedPicker" className="form-select">
                            <option id="st-null" value="">Select...</option>
                            <option id="st-0" value="false">No</option>
                            <option id="st-1" value="true">Sí</option>
                        </select>
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="patientBirthday" className="form-label">Cumpleaños:</label>
                        <input type="date" id="patientBirthday" className="form-control" />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="patientWeight" className="form-label">Peso:</label>
                        <div className="input-group">
                            <input type="text" id="patientWeight" className="form-control" style={{ width: '70px' }} />
                            <span className="input-group-text">Kg</span>
                        </div>
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="patientChip" className="form-label">CHIP:</label>
                        <input type="text" id="patientChip" className="form-control" />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="patientColor" className="form-label">Color:</label>
                        <input type="text" id="patientColor" className="form-control" />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="patientEyes" className="form-label">Ojos:</label>
                        <input type="text" id="patientEyes" className="form-control" />
                    </div>
                    <div className="row">
                        <div className="mb-3">
                            <label htmlFor="patientInfo" className="form-label">Información paciente:</label>
                            <textarea type="" id="patientInfo" className="form-control" rows="5" />
                        </div>
                    </div>
                </div>
                {modal}
            </form>

        </>
    )
}

function VisitForm({ action, id = '' }) {

    const filter = {};

    const modal = setModal(action);

    // Manejador datos del formulario
    const handleFData = (e) => {
        e.preventDefault();

        const fData = e.target;             // Asignamos el formulario
        addUpdateVisit(fData, action, id);      // Llamamos a la petición indicando la acción (add | update)
    }

    const sumDuration = (e) => {
        e.preventDefault();

        const input = document.getElementById('duration');
        input.value = parseInt(input.value) + 15;

    }

    const restDuration = (e) => {
        e.preventDefault();

        const input = document.getElementById('duration');
        input.value = parseInt(input.value) - 15;

        if (input.value < 15) input.value = 15;
    }

    const handleUsers = (data) => {
        data.forEach(e => {
            const name = e.name;
            const identifier = e.username;

            handleDatalist('userPicker-datalist', name, identifier)
        });
    }

    const handleCustomers = (data) => {
        data['allData'].forEach(e => {
            const name = e.name;
            const identifier = e.email;

            handleDatalist('customerPicker-datalist', name, identifier)
        });
    }

    const handlePatients = (data) => {
        data['allData'].forEach(e => {
            const name = e.name;
            const identifier = '#' + e.id;

            handleDatalist('patientPicker-datalist', name, identifier)
        });
    }

    const handleCustomersFromPatients = (data) => {
        if (data['allData'].length > 0) {
            data['allData'].forEach(e => {
                const name = e.customer;
                const identifier = e.customerEmail;

                handleDatalist('customerPicker-datalist', name, identifier);
            })
        } else {
            getCustomers(handleCustomers);
        }

    }

    const capturePatient = (e) => {
        e.preventDefault();

        const patient = e.target.value.split(' - ')[0];

        cleanDatalist('customerPicker-datalist');
        findPatients(handleCustomersFromPatients, 1, { namePicker: patient });
    }

    const captureCustomer = (e) => {
        e.preventDefault();

        const customer = e.target.value.split(' - ')[0];

        cleanDatalist('patientPicker-datalist');
        findPatients(handlePatients, 1, { customerPicker: customer });
    }

    const captureUser = (e) => {
        e.preventDefault();

        const user = e.target.value.split(' - ')[1];
        Object.defineProperty(filter, 'user',
            {
                value: user,
                enumerable: true,
                configurable: true,
                writable: true
            })
    }

    const captureDate = (e) => {
        e.preventDefault();

        const date = e.target.value;
        Object.defineProperty(filter, 'date',
            {
                value: date,
                enumerable: true,
                configurable: true,
                writable: true
            })
        findTime(handleTime, filter);
    }

    const fetchDatalists = () => {
        getVets(handleUsers);
        getCustomers(handleCustomers);
        getPatients(handlePatients);

        // Horario
        OpenTime();
    }

    useEffect(() => {
        addEvents(handleFData);
        fetchDatalists();

    })
    return (
        <>
            <form id="auto-form">
                <div id="form-row-1" className="row">
                    <div className="row justify-content-between" id="form-title">
                        <h3 className="col-auto">Visita</h3>
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="userPicker" className="form-label">Verinaria/o:</label>
                        <input type="search" id="userPicker" className="form-control" list="userPicker-datalist" placeholder="Buscar..." onInput={captureUser} />
                        <datalist id="userPicker-datalist" />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="dateTimePicker" className="form-label">Fecha:</label>
                        <input type="date" id="datePicker" className="form-control" onInput={captureDate} />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="timePicker" className="form-label">Hora:</label>
                        <select id="timePicker" className="form-select" >

                        </select>
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="duration" className="form-label">Duración estimada:</label>
                        <div className="input-group">
                            <input type="text" id="duration" className="form-control" defaultValue="15" style={{ width: '70px' }} readOnly />
                            <span className="input-group-text"> min</span>
                            <button type="button" className=" btn btn-outline-secondary" onClick={sumDuration}>+</button>
                            <button type="button" className="btn btn-outline-secondary" onClick={restDuration}>-</button>
                        </div>
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="completedPicker" className="form-label">Cerrada:</label>
                        <select id="completedPicker" className="form-select" >
                            <option id="co-null" value="">Select...</option>
                            <option id="co-0" value="false">No</option>
                            <option id="co-1" value="true">Sí</option>
                        </select>
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="category" className="form-label">Categoría:</label>
                        <input type="text" id="category" className="form-control" />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="patientPicker" className="form-label">Paciente:</label>
                        <input type="search" id="patientPicker" className="form-control" list="patientPicker-datalist" placeholder="Buscar..." onInput={capturePatient} />
                        <datalist id="patientPicker-datalist" />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="customerPicker" className="form-label">Cliente:</label>
                        <input type="search" id="customerPicker" className="form-control" list="customerPicker-datalist" placeholder="Buscar..." onInput={captureCustomer} />
                        <datalist id="customerPicker-datalist" />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="patientWeight" className="form-label">Peso:</label>
                        <input type="text" id="patientWeight" className="form-control" />
                    </div>
                    <div className="row">
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Descripción:</label>
                            <textarea type="" id="description" className="form-control" rows="5" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-3">
                            <label htmlFor="treatment" className="form-label">Tratamiento:</label>
                            <textarea type="" id="treatment" className="form-control" rows="5" />
                        </div>
                    </div>
                </div>
                {modal}
            </form>
        </>
    )
}

export function ProductForm({ action, id = '' }) {
    let species = [];

    // Manejador datos del formulario
    const handleFData = (e) => {
        e.preventDefault();
        const fData = new FormData(e.target);

        addUpdateProduct(fData, action, id);   // Llamamos a la petición indicando la acción (add | update)
    }

    const handleSpecies = (d) => {
        const select = document.querySelector('#productSpecies');
        d.forEach(s => {
            let op = document.createElement('option');
            op.value = s.name;
            op.textContent = s.name;
            select.append(op);
        });
    }

    const handleSuppliers = (d) => {
        d.forEach(s => {
            handleDatalist('suppliers-datalist', s.code);
        });
    }

    const handleSelect = (e) => {   // Utilizamos el array 'species' para controlar las seleccionadas
        const speciesSelected = document.querySelector('#speciesSelected');

        species.includes(e.target.value)
            ? species = species.filter(element => element !== e.target.value)
            : species.push(e.target.value);

        speciesSelected.value = species.toString();
    }

    // MODAL
    const handleModal = (e) => { // Eliminamos el botón submit que viene por defecto en el Form del modal
        const modTarget = e.target.dataset.bsTarget;
        const sendButton = document.querySelector(`${modTarget} button[type=submit]`);
        sendButton.classList.add('d-none');
    }

    useEffect(() => {
        addEvents(handleFData);
        getSpecies(handleSpecies);
        getSuppliers(handleSuppliers);
        if (action === 'add') document.getElementById("productViewPage").textContent = `Nuevo producto`;

    })
    return (
        <>
            <form id="auto-form">
                <div id="form-row-1" className="row">
                    <div className="d-flex flex-row justify-content-between" id="form-title">
                        <div className="d-flex flex-row">
                            <h3 className="col-auto" id="productViewPage"> </h3>
                        </div>
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="productCode" className="form-label">Ref:</label>
                        <input type="text" id="productCode" name="code" className="form-control" required />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="productName" className="form-label" >Nombre:</label>
                        <input type="text" id="productName" name="name" className="form-control" required />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="productCategory" className="form-label" >Categoría:</label>
                        <input type="text" id="productCategory" name="category" className="form-control" required />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="productSubcategory" className="form-label" >Subcategoría:</label>
                        <input type="text" id="productSubcategory" name="subcategory" className="form-control" />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="productDose" className="form-label" >Dosis:</label>
                        <input type="text" id="productDose" name="dose" className="form-control" />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="productPrice" className="form-label">Precio:</label>
                        <input type="text" id="productPrice" name="price" className="form-control" required />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="productStock" className="form-label">Cantidad:</label>
                        <input type="text" id="productStock" name="stock" className="form-control" required />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="productLot" className="form-label">Lote:</label>
                        <input type="text" id="productLot" name="lot" className="form-control" />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="productExpiration" className="form-label" >Caducidad:</label>
                        <input type="date" id="productExpiration" name="expiration" className="form-control" />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="productSupplier" className="form-label" >Proveedor:</label>
                        <div className="input-group" >
                            <input type="search" id="productSupplier" name="supplier" list="suppliers-datalist" className="form-control" required />
                            <button className="btn btn-outline-secondary" type="button" id="btnSupplier" data-bs-toggle="modal" data-bs-target="#newSupplierModal" onClick={handleModal}>Nueva</button>
                        </div>

                        <datalist id="suppliers-datalist" />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="productSpecies" className="form-label" >Especies:</label>

                        <div className="input-group" >
                            <input type="text" id="speciesSelected" name="species" className="form-control" readOnly />
                            <button className="btn btn-outline-secondary" type="button" id="btnSpecies" data-bs-toggle="modal" data-bs-target="#newSpeciesModal" onClick={handleModal}>Nueva</button>
                        </div>
                        <select id="productSpecies" className="form-select mt-2" multiple aria-label="multiple select" onInput={handleSelect}>

                        </select>

                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="productEan" className="form-label" >EAN:</label>
                        <input type="text" id="productEan" name="ean" className="form-control" />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Guardar</button>
            </form>
            <NewSupplier />
            <NewSpecies />
        </>
    )
}

export function ServiceForm({ action, id = '' }) {

    // Manejador datos del formulario
    const handleFData = (e) => {
        e.preventDefault();
        const fData = new FormData(e.target);

        addUpdateService(fData, action, id);   // Llamamos a la petición indicando la acción (add | update)
    }

    useEffect(() => {
        addEvents(handleFData);
        if (action === 'add') document.getElementById("serviceViewPage").textContent = `Nuevo servicio`;

    })
    return (
        <>
            <form id="auto-form">
                <div id="form-row-1" className="row">
                    <div className="d-flex flex-row justify-content-between" id="form-title">
                        <div className="d-flex flex-row">
                            <h3 className="col-auto" id="serviceViewPage"> </h3>
                        </div>
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="serviceName" className="form-label" >Nombre:</label>
                        <input type="text" id="serviceName" name="name" className="form-control" required />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="serviceCategory" className="form-label" >Categoría:</label>
                        <input type="text" id="serviceCategory" name="category" className="form-control" required />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="servicePrice" className="form-label">Precio:</label>
                        <input type="text" id="servicePrice" name="price" className="form-control" required />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Guardar</button>
            </form>
        </>
    )
}

export function SpeciesForm({ action, id = '' }) {

    // Manejador datos del formulario
    const handleFData = (e) => {
        e.preventDefault();
        const fData = new FormData(e.target);

        addUpdateSpecies(fData, action, id);   // Llamamos a la petición indicando la acción (add | update)
    }

    useEffect(() => {
        addEvents(handleFData);
        if (action === 'add') document.getElementById("speciesViewPage").textContent = `Especie: `;

    })
    return (
        <>
            <form id="auto-form">
                <div id="form-row-1" className="row">
                    <div className="d-flex flex-row justify-content-between" id="form-title">
                        <div className="d-flex flex-row">
                            <h3 className="col-auto" id="speciesViewPage"> </h3>
                        </div>
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="speciesName" className="form-label" >Nombre:</label>
                        <input type="text" id="speciesName" name="name" className="form-control" required />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="speciesSciName" className="form-label" >Nombre científico:</label>
                        <input type="text" id="speciesSciName" name="sciName" className="form-control" required />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Guardar</button>
            </form>
        </>
    )
}

export function RaceForm({ action, id = '' }) {

    // Manejador datos del formulario
    const handleFData = (e) => {
        e.preventDefault();
        const fData = new FormData(e.target);

        addUpdateRace(fData, action, id);   // Llamamos a la petición indicando la acción (add | update)
    }

    const handleSpecies = (d) => {
        d.forEach(sp => {
            handleDatalist('species-datalist', sp.name);
        });
    }

    useEffect(() => {
        addEvents(handleFData);
        getSpecies(handleSpecies);
        if (action === 'add') document.getElementById("raceViewPage").textContent = `Raza: `;

    })
    return (
        <>
            <form id="auto-form">
                <div id="form-row-1" className="row">
                    <div className="d-flex flex-row justify-content-between" id="form-title">
                        <div className="d-flex flex-row">
                            <h3 className="col-auto" id="raceViewPage"> </h3>
                        </div>
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="raceName" className="form-label" >Nombre:</label>
                        <input type="text" id="raceName" name="name" className="form-control" required />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="raceSpecies" className="form-label" >Especie:</label>
                        <input type="search" id="raceSpecies" name="species" list="species-datalist" className="form-control" required />
                        <datalist id="species-datalist">

                        </datalist>

                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Guardar</button>
            </form>
        </>
    )
}

export function SupplierForm({ action, id = '' }) {

    // Manejador datos del formulario
    const handleFData = (e) => {
        e.preventDefault();
        const fData = new FormData(e.target);

        addUpdateSupplier(fData, action, id);   // Llamamos a la petición indicando la acción (add | update)
    }

    // MODAL
    const handleModal = (e) => { // Eliminamos el botón submit que viene por defecto en el Form del modal
        const modTarget = e.target.dataset.bsTarget;
        const sendButton = document.querySelector(`${modTarget} button[type=submit]`);
        sendButton.classList.add('d-none');
    }

    // Datalist
    const handlePostalCodes = (d) => {
        d.forEach(pc => {
            let id = pc.id;
            handleDatalist('postalCode-datalist', id);
        });
    }

    useEffect(() => {
        addEvents(handleFData);
        getPostalCodes(handlePostalCodes);
        if (action === 'add') document.getElementById("supplierViewPage").textContent = `Proveedor: `;

    })
    return (
        <>
            <form id="auto-form">
                <div id="form-row-1" className="row">
                    <div className="d-flex flex-row justify-content-between" id="form-title">
                        <div className="d-flex flex-row">
                            <h3 className="col-auto" id="supplierViewPage"> </h3>
                        </div>
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="supplierCode" className="form-label" >Ref:</label>
                        <input type="text" id="supplierCode" name="code" className="form-control" required />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="supplierName" className="form-label" >Nombre:</label>
                        <input type="text" id="supplierName" name="name" className="form-control" required />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="supplierCategory" className="form-label" >Categoría:</label>
                        <input type="text" id="supplierCategory" name="category" className="form-control" />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="supplierEmail" className="form-label" >Email:</label>
                        <input type="text" id="supplierEmail" name="email" className="form-control" required />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="supplierPhone" className="form-label" >Teléfono:</label>
                        <input type="text" id="supplierPhone" name="phone" className="form-control" required />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="supplierPc" className="form-label" >C.P.:</label>
                        <div className="input-group" >
                            <input type="search" list="postalCode-datalist" id="supplierPc" name="postalCode" className="form-control"  />
                            <button className="btn btn-outline-secondary" type="button" id="btnPc" data-bs-target="#newPostalCodeModal" data-bs-toggle="modal" data-bs-dismiss="modal" onClick={handleModal}>Nueva</button>
                        </div>
                        <datalist id="postalCode-datalist"></datalist>
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="supplierAddress" className="form-label" >Dirección:</label>
                        <input type="text" id="supplierAddress" name="address" className="form-control"  />
                    </div>
                    <div className="row">
                        <div className="mb-3">
                            <label htmlFor="supplierInfo" className="form-label" >Info:</label>
                            <textarea type="text" id="supplierInfo" name="info" className="form-control" rows="5"  />
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Guardar</button>
            </form>
        </>
    )
}

export function PostalCodeForm({ action, id = '' }) {

    // Manejador datos del formulario
    const handleFData = (e) => {
        e.preventDefault();
        const fData = new FormData(e.target);

        addUpdatePostalCode(fData, action, id);   // Llamamos a la petición indicando la acción (add | update)
    }

    useEffect(() => {
        addEvents(handleFData);
        if (action === 'add') document.getElementById("postalCodeViewPage").textContent = `Código Postal: `;

    })
    return (
        <>
            <form id="auto-form">
                <div id="form-row-1" className="row">
                    <div className="d-flex flex-row justify-content-between" id="form-title">
                        <div className="d-flex flex-row">
                            <h3 className="col-auto" id="postalCodeViewPage"> </h3>
                        </div>
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="postalCodePc" className="form-label" >C.P.:</label>
                        <input type="text" id="postalCodePc" name="pc" className="form-control" required />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="postalCodeProvince" className="form-label" >Provincia:</label>
                        <input type="text" id="postalCodeProvince" name="province" className="form-control" required />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="postalCodeCity" className="form-label" >Ciudad:</label>
                        <input type="text" id="postalCodeCity" name="city" className="form-control" required />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="postalCodeCountry" className="form-label" >País:</label>
                        <input type="text" id="postalCodeCountry" name="country" className="form-control" required />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Guardar</button>
            </form>
        </>
    )
}

function Form({ selector, action, id = '' }) {

    let form;

    switch (selector) {
        case 'customer':
            form = <CustomerForm action={action} id={id} />;
            break;
        case 'patient':
            form = <PatientForm action={action} id={id} />;
            break;
        case 'user':
            form = <UserForm action={action} id={id} />;
            break;
        case 'product':
            form = <ProductForm action={action} id={id} />;
            break;
        case 'service':
            form = <ServiceForm action={action} id={id} />;
            break;
        case 'species':
            form = <SpeciesForm action={action} id={id} />;
            break;
        case 'race':
            form = <RaceForm action={action} id={id} />;
            break;
        case 'supplier':
            form = <SupplierForm action={action} id={id} />;
            break;
        case 'pc':
            form = <PostalCodeForm action={action} id={id} />;
            break;
        default:
            form = <VisitForm action={action} id={id} />;
            break;
    }

    return (
        <>
            {form}
        </>
    )
}

export { Form, handleTime };