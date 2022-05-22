import { useEffect } from "react";
import { findCustomers } from "./api/ApiCustomers";
import { findPatients } from "./api/ApiPatients";
import { findVisits } from "./api/ApiVisits";
import { getUsers } from "./api/ApiUser";
import { getProducts } from "./api/ApiProducts";
import { getServices } from "./api/ApiServices";
import { getDataDatalist } from "./Datalist";
import { Pagination } from "./TablePagination";
import global from "../global";
import { getPaginateSpecies, getSpecies } from "./api/ApiSpecies";
import { getPaginateRaces } from "./api/ApiRaces";
import { getPaginatePostalCodes } from "./api/ApiPostalCode";
import { getSuppliersPaginate } from "./api/ApiSuppliers";

// Método con el que rellenamos las tablas
const handleTable = (d, destiny) => {
    const data = d.data;
    let count = 1 + ((d.thisPage - 1) * 10);                            // Contador con el que numeramos los resultados
    let tbody = document.getElementById('auto-table-tbody');
    tbody.innerHTML = "";

    data.forEach(e => {                                                 // Creamos las filas y los campos según los datos obtenidos.
        let tr = document.createElement('tr');
        
        for (const k in e) {                                            // Recorremos las keys del objeto para rellenar la fila.
            
            let td = document.createElement('td');
            td.classList.add('align-middle')

            if (k !== 'debt') {                                         // Si k es debt lo tratamos distinto

                k != 'id' ? td.textContent = e[k] : td.textContent = count // En vez de meter el id del elemento, metemos el contador
                
            } else {
                if (e.debt > 0) {                                     // Creamos el badge solo si debt > 0;

                let aDebt = document.createElement('a');
                let spDebt = document.createElement('span');

                aDebt.setAttribute('href', `/turdus/customers/${e.id}/pay_debt`);
                aDebt.classList.add('nav-link', 'px-2', 'text-truncate');
                spDebt.classList.add('badge', 'bg-danger', 'rounded-pill');
                spDebt.textContent = parseFloat(e.debt).toFixed(2)+' '+global.currency;

                aDebt.append(spDebt);
                td.append(aDebt);
                }
            }   
            tr.append(td);                                      
        }
        count++;

        let td = document.createElement('td');
        let a = document.createElement('a');
        let i = document.createElement('i');

        a.setAttribute('href', `/turdus/${destiny}/${e.id}`);
        a.classList.add('nav-link', 'px-2', 'text-truncate');
        i.classList.add('bi', 'bi-card-text', 'fs-5', 'me-2');
        
        a.append(i);
        td.append(a);

        tr.append(td);
        tbody.append(tr);
    });
}

function CustomersTable() {
    let filter = {};                                        // Filtro con el que realizaremos las peticiones como body.

    // Evento de los inputs
    const captureData = (e) => {
        e.preventDefault();

        const id = e.target.id;
        const value = e.target.value;

        Object.defineProperty(filter, id,                   // Creamos una propiedad del objeto filter con el string a buscar.
            {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true
            }
        )

        findCustomers(handleData, 1, filter)                // Petición al servidor (callback, n página, filtro)
    }

    // Método que maneja los datos de la petición
    const handleData = (d) => {

        handleTable(d, 'customers');                        // Rellena la tabla
        Pagination(d, findCustomers, handleData, filter);   // Crea la paginación y añade los eventos a esta, por eso pasamos los métodos y el filtro.

        let arrIds = [];
        const arrInputs = document.querySelectorAll('form .form-control, form .form-select');
        arrInputs.forEach(i => {                            // Recogemos los campos para almacenar los ids y para añadir el evento.
            arrIds.push(i.id);
            i.addEventListener('input', captureData);
        });
        getDataDatalist(d, arrIds)                          // Creamos las datalist para facilitar las búsquedas.
    }

    // Método que limpia los filtros de búsqueda
    const cleanFilters = (e) => {
        // e.preventDefault();

        // const fData = e.target.parentNode.parentNode.parentNode;
        // handleClean(fData);                                 // Seleccionamos el formulario y llamamos al método que lo vacía.

        for (const key in filter) {                         // Limpiamos el objeto filter.
            filter[key] = '';
        }

        findCustomers(handleData);                          // Volvemos a hacer la petición al servidor.
    }

    // Hacemos la petición al servidor, pasándole el callback.
    useEffect(() => {
        findCustomers(handleData);

    }, []);

    return (
        <>
            
            <div className="offcanvas offcanvas-end pt-10" data-bs-scroll="false" data-bs-backdrop="true" tabIndex="-1" id="offcanvas" aria-labelledby="offcanvasLabel">
                <div className="offcanvas-header">
                    <h5 id="offcanvasLabel">Filtrar</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <form>
                        <div className="mb-3 col-auto">
                            <label htmlFor="namePicker" className="form-label">Nombre:</label>
                            <input type="search" id="namePicker" className="form-control" list="namePicker-datalist" placeholder="Buscar..." />
                            <datalist id="namePicker-datalist">
                            </datalist>
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="lastnamePicker" className="form-label">Apellidos:</label>
                            <input type="search" id="lastnamePicker" className="form-control" list="lastnamePicker-datalist" placeholder="Buscar..." />
                            <datalist id="lastnamePicker-datalist">
                            </datalist>
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="phonePicker" className="form-label">Teléfono:</label>
                            <input type="search" id="phonePicker" className="form-control" list="phonePicker-datalist" placeholder="Buscar..." />
                            <datalist id="phonePicker-datalist">
                            </datalist>
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="emailPicker" className="form-label">e-mail:</label>
                            <input type="search" id="emailPicker" className="form-control" list="emailPicker-datalist" placeholder="Buscar..." />
                            <datalist id="emailPicker-datalist">
                            </datalist>
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="debtPicker" className="form-label">Deuda pendiente:</label>
                            <select id="debtPicker" className="form-select" >
                                <option id="de-" value="">Select...</option>
                                <option id="de-true" value="1">Sí</option>
                                <option id="de-false" value="0">No</option>
                            </select>
                        </div>
                        <div className="mb-3 col-auto flex-column d-flex justify-content-end">
                            <input type="reset" id="cleanButton" className="btn btn-secondary text-white" onClick={cleanFilters}></input>
                        </div>
                    </form>
                </div>
            </div>
            <div className="d-flex flex-row table-responsive">
                <table className="table table-striped table-hover" id="auto-table">
                    <thead id="auto-table-thead">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellidos</th>
                            <th scope="col">Teléfono</th>
                            <th scope="col">e-mail</th>
                            <th scople="col"></th>
                            <th scope="col">Vista</th>
                        </tr>
                    </thead>
                    <tbody id="auto-table-tbody" />
                </table>
            </div>
            <nav aria-label="Table pagination">
                <ul className="pagination" id="pagination">

                </ul>
            </nav>
        </>
    )
}

export function UsersTable() {
    let filter = {};                                        // Filtro con el que realizaremos las peticiones como body.

    // Evento de los inputs
    const captureData = (e) => {
        e.preventDefault();

        const id = e.target.id;
        const value = e.target.value;

        Object.defineProperty(filter, id,                   // Creamos una propiedad del objeto filter con el string a buscar.
            {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true
            }
        )

        getUsers(handleData, filter)                // Petición al servidor (callback, n página, filtro)
    }

    // Método que maneja los datos de la petición
    const handleData = (d) => {

        handleTable(d, 'users');                        // Rellena la tabla
        Pagination(d, getUsers, handleData, filter);   // Crea la paginación y añade los eventos a esta, por eso pasamos los métodos y el filtro.

        let arrIds = [];
        const arrInputs = document.querySelectorAll('form .form-control, form .form-select');
        arrInputs.forEach(i => {                            // Recogemos los campos para almacenar los ids y para añadir el evento.
            arrIds.push(i.id);
            i.addEventListener('input', captureData);
        });
        getDataDatalist(d, arrIds)                          // Creamos las datalist para facilitar las búsquedas.
    }

    // Método que limpia los filtros de búsqueda
    const cleanFilters = (e) => {

        for (const key in filter) {                         // Limpiamos el objeto filter.
            filter[key] = '';
        }

        getUsers(handleData, filter);                          // Volvemos a hacer la petición al servidor.
    }

    // Hacemos la petición al servidor, pasándole el callback.
    useEffect(() => {
        getUsers(handleData, filter);

    }, []);

    return (
        <>
            
            <div className="offcanvas offcanvas-end pt-10" data-bs-scroll="false" data-bs-backdrop="true" tabIndex="-1" id="offcanvas" aria-labelledby="offcanvasLabel">
                <div className="offcanvas-header">
                    <h5 id="offcanvasLabel">Filtrar</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <form>
                        <div className="mb-3 col-auto">
                            <label htmlFor="namePicker" className="form-label">Nombre:</label>
                            <input type="search" id="namePicker" className="form-control" list="namePicker-datalist" placeholder="Buscar..." />
                            <datalist id="namePicker-datalist">
                            </datalist>
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="lastnamePicker" className="form-label">Apellidos:</label>
                            <input type="search" id="lastnamePicker" className="form-control" list="lastnamePicker-datalist" placeholder="Buscar..." />
                            <datalist id="lastnamePicker-datalist">
                            </datalist>
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="areaPicker" className="form-label">Área:</label>
                            <input type="search" id="areaPicker" className="form-control" list="areaPicker-datalist" placeholder="Buscar..." />
                            <datalist id="areaPicker-datalist">
                            </datalist>
                        </div>
                        <div className="mb-3 col-auto flex-column d-flex justify-content-end">
                            <input type="reset" id="cleanButton" className="btn btn-secondary text-white" onClick={cleanFilters}></input>
                        </div>
                    </form>
                </div>
            </div>
            <div className="d-flex flex-row table-responsive">
                <table className="table table-striped table-hover" id="auto-table">
                    <thead id="auto-table-thead">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellidos</th>
                            <th scope="col">Área</th>
                            <th scope="col">Vista</th>
                        </tr>
                    </thead>
                    <tbody id="auto-table-tbody" />
                </table>
            </div>
            <nav aria-label="Table pagination">
                <ul className="pagination" id="pagination">

                </ul>
            </nav>
        </>
    )
}

export function ProductsTable() {
    let filter = {};                                        // Filtro con el que realizaremos las peticiones como body.

    // Evento de los inputs
    const captureData = (e) => {
        e.preventDefault();

        const id = e.target.id;
        const value = e.target.value;

        Object.defineProperty(filter, id,                   // Creamos una propiedad del objeto filter con el string a buscar.
            {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true
            }
        )

        getProducts(handleData, filter)                // Petición al servidor (callback, n página, filtro)
    }

    // Método que maneja los datos de la petición
    const handleData = (d) => {

        handleTable(d, 'products');                        // Rellena la tabla
        Pagination(d, getProducts, handleData, filter);   // Crea la paginación y añade los eventos a esta, por eso pasamos los métodos y el filtro.

        let arrIds = [];
        const arrInputs = document.querySelectorAll('form .form-control, form .form-select');
        arrInputs.forEach(i => {                            // Recogemos los campos para almacenar los ids y para añadir el evento.
            arrIds.push(i.id);
            i.addEventListener('input', captureData);
        });
        getDataDatalist(d, arrIds)                          // Creamos las datalist para facilitar las búsquedas.
    }

    // Método que limpia los filtros de búsqueda
    const cleanFilters = (e) => {

        for (const key in filter) {                         // Limpiamos el objeto filter.
            filter[key] = '';
        }

        getProducts(handleData, filter);                          // Volvemos a hacer la petición al servidor.
    }

    // Hacemos la petición al servidor, pasándole el callback.
    useEffect(() => {
        getProducts(handleData, filter);

    }, []);

    return (
        <>
            
            <div className="offcanvas offcanvas-end pt-10" data-bs-scroll="false" data-bs-backdrop="true" tabIndex="-1" id="offcanvas" aria-labelledby="offcanvasLabel">
                <div className="offcanvas-header">
                    <h5 id="offcanvasLabel">Filtrar</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <form>
                        <div className="mb-3 col-auto">
                            <label htmlFor="codePicker" className="form-label">Ref:</label>
                            <input type="search" id="codePicker" className="form-control" list="codePicker-datalist" placeholder="Buscar..." />
                            <datalist id="namePicker-datalist">
                            </datalist>
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="namePicker" className="form-label">Nombre:</label>
                            <input type="search" id="namePicker" className="form-control" list="namePicker-datalist" placeholder="Buscar..." />
                            <datalist id="namePicker-datalist">
                            </datalist>
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="categoryPicker" className="form-label">Categoría:</label>
                            <input type="search" id="categoryPicker" className="form-control" list="categoryPicker-datalist" placeholder="Buscar..." />
                            <datalist id="categoryPicker-datalist">
                            </datalist>
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="subcategoryPicker" className="form-label">Subcategoría:</label>
                            <input type="search" id="subcategoryPicker" className="form-control" list="subcategoryPicker-datalist" placeholder="Buscar..." />
                            <datalist id="subcategoryPicker-datalist">
                            </datalist>
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="speciesPicker" className="form-label">Especie:</label>
                            <input type="search" id="speciesPicker" className="form-control" list="speciesPicker-datalist" placeholder="Buscar..." />
                            <datalist id="speciesPicker-datalist">
                            </datalist>
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="supplierPicker" className="form-label">Proveedor:</label>
                            <input type="search" id="supplierPicker" className="form-control" list="supplierPicker-datalist" placeholder="Buscar..." />
                            <datalist id="supplierPicker-datalist">
                            </datalist>
                        </div>
                        <div className="mb-3 col-auto flex-column d-flex justify-content-end">
                            <input type="reset" id="cleanButton" className="btn btn-secondary text-white" onClick={cleanFilters}></input>
                        </div>
                    </form>
                </div>
            </div>
            <div className="d-flex flex-row table-responsive">
                <table className="table table-striped table-hover" id="auto-table">
                    <thead id="auto-table-thead">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Ref.</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Categoría</th>
                            <th scope="col">Subcat.</th>
                            <th scope="col">Especie</th>
                            <th scope="col">Dosis</th>
                            <th scope="col">Lote</th>
                            <th scope="col">Caducidad</th>
                            <th scope="col">Proveedor</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Vista</th>
                        </tr>
                    </thead>
                    <tbody id="auto-table-tbody" />
                </table>
            </div>
            <nav aria-label="Table pagination">
                <ul className="pagination" id="pagination">
                </ul>
            </nav>
        </>
    )
}

export function ServicesTable() {
    let filter = {};                                        // Filtro con el que realizaremos las peticiones como body.

    // Evento de los inputs
    const captureData = (e) => {
        e.preventDefault();

        const id = e.target.id;
        const value = e.target.value;

        Object.defineProperty(filter, id,                   // Creamos una propiedad del objeto filter con el string a buscar.
            {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true
            }
        )

        getServices(handleData, filter)                // Petición al servidor (callback, n página, filtro)
    }

    // Método que maneja los datos de la petición
    const handleData = (d) => {

        handleTable(d, 'services');                        // Rellena la tabla
        Pagination(d, getServices, handleData, filter);   // Crea la paginación y añade los eventos a esta, por eso pasamos los métodos y el filtro.

        let arrIds = [];
        const arrInputs = document.querySelectorAll('form .form-control, form .form-select');
        arrInputs.forEach(i => {                            // Recogemos los campos para almacenar los ids y para añadir el evento.
            arrIds.push(i.id);
            i.addEventListener('input', captureData);
        });
        getDataDatalist(d, arrIds)                          // Creamos las datalist para facilitar las búsquedas.
    }

    // Método que limpia los filtros de búsqueda
    const cleanFilters = (e) => {

        for (const key in filter) {                         // Limpiamos el objeto filter.
            filter[key] = '';
        }

        getServices(handleData, filter);                          // Volvemos a hacer la petición al servidor.
    }

    // Hacemos la petición al servidor, pasándole el callback.
    useEffect(() => {
        getServices(handleData, filter);

    }, []);

    return (
        <>
            
            <div className="offcanvas offcanvas-end pt-10" data-bs-scroll="false" data-bs-backdrop="true" tabIndex="-1" id="offcanvas" aria-labelledby="offcanvasLabel">
                <div className="offcanvas-header">
                    <h5 id="offcanvasLabel">Filtrar</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <form>
                        <div className="mb-3 col-auto">
                            <label htmlFor="namePicker" className="form-label">Nombre:</label>
                            <input type="search" id="namePicker" className="form-control" list="namePicker-datalist" placeholder="Buscar..." />
                            <datalist id="namePicker-datalist">
                            </datalist>
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="categoryPicker" className="form-label">Categoría:</label>
                            <input type="search" id="categoryPicker" className="form-control" list="categoryPicker-datalist" placeholder="Buscar..." />
                            <datalist id="categoryPicker-datalist">
                            </datalist>
                        </div>
                        <div className="mb-3 col-auto flex-column d-flex justify-content-end">
                            <input type="reset" id="cleanButton" className="btn btn-secondary text-white" onClick={cleanFilters}></input>
                        </div>
                    </form>
                </div>
            </div>
            <div className="d-flex flex-row table-responsive">
                <table className="table table-striped table-hover" id="auto-table">
                    <thead id="auto-table-thead">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Categoría</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Vista</th>
                        </tr>
                    </thead>
                    <tbody id="auto-table-tbody" />
                </table>
            </div>
            <nav aria-label="Table pagination">
                <ul className="pagination" id="pagination">
                </ul>
            </nav>
        </>
    )
}

function PatientsTable() {

    let filter = {};

    const captureData = (e) => {
        e.preventDefault();

        const id = e.target.id;
        const value = e.target.value;

        Object.defineProperty(filter, id,
            {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true
            }
        )

        findPatients(handleData, 1, filter)
    }

    const handleData = (d, fetchMethod) => {
        d.data.forEach(e => {       // No necesitamos el email 
            delete e.customerEmail;
        });
        
        handleTable(d, 'patients');
        Pagination(d, fetchMethod, handleData);

        let arrIds = [];
        const arrInputs = document.querySelectorAll('form .form-control, form .form-select');
        arrInputs.forEach(i => {
            arrIds.push(i.id);
            i.addEventListener('input', captureData);

        });
        
        getDataDatalist(d, arrIds)
    }

    const cleanFilters = () => {

        for (const key in filter) {
            filter[key] = '';
        }

        findPatients(handleData);
    }

    useEffect(() => {
        findPatients(handleData);

    }, []);
    return (
        <>
            <div className="offcanvas offcanvas-end pt-10" data-bs-scroll="false" data-bs-backdrop="true" tabIndex="1060" id="offcanvas" aria-labelledby="offcanvasLabel">
                <div className="offcanvas-header">
                    <h5 id="offcanvasLabel">Filtrar</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <form>
                        <div className="mb-3 col-auto">
                            <label htmlFor="namePicker" className="form-label">Paciente:</label>
                            <input type="search" id="namePicker" className="form-control" list="namePicker-datalist" placeholder="Buscar..." />
                            <datalist id="namePicker-datalist">
                                <option id="na-César" value="César">César</option>
                            </datalist>
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="speciesPicker" className="form-label">Especie:</label>
                            <input type="search" id="speciesPicker" className="form-control" list="speciesPicker-datalist" placeholder="Buscar..." />
                            <datalist id="speciesPicker-datalist">
                                <option id="sp-Perro" value="Perro">Perro</option>
                            </datalist>
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="racePicker" className="form-label">Raza:</label>
                            <input type="search" id="racePicker" className="form-control" list="racePicker-datalist" placeholder="Buscar..." />
                            <datalist id="racePicker-datalist">
                                <option id="ra-Alaskan Malamute" value="Alaskan Malamute">Alaskan Malamute</option>
                            </datalist>
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="birthdayPicker" className="form-label">F. Nacimiento:</label>
                            <input type="date" id="birthdayPicker" className="form-control" />
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="genderPicker" className="form-label">Género:</label>
                            <select type="" id="genderPicker" className="form-select" >
                                <option id="ge-" value="">Select...</option>
                                <option id="ge-female" value="female">Hembra</option>
                                <option id="ge-male" value="male">Macho</option>
                            </select>
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="sterilisedPicker" className="form-label">Esterilizado:</label>
                            <select type="" id="sterilisedPicker" className="form-select" >
                                <option id="st-" value="">Select...</option>
                                <option id="st-1" value="1">Sí</option>
                                <option id="st-0" value="0">No</option>
                            </select>
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="vetPicker" className="form-label">Veterinaria/o:</label>
                            <input type="search" id="vetPicker" className="form-control" list="vetPicker-datalist" placeholder="Buscar..." />
                            <datalist id="vetPicker-datalist">
                                <option id="ve-Ansel" value="Ansel">Ansel</option>
                            </datalist>
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="customerPicker" className="form-label">Cliente:</label>
                            <input type="search" id="customerPicker" className="form-control" list="customerPicker-datalist" placeholder="Buscar..." />
                            <datalist id="customerPicker-datalist">
                                <option id="cu-Nicko" value="Nicko">Nicko</option>
                            </datalist>
                        </div>
                        <div className="mb-3 col-auto flex-column d-flex justify-content-end">
                            <input type="reset" id="cleanButton" className="btn btn-secondary text-white" onClick={cleanFilters}></input>
                        </div>
                    </form>
                </div>
            </div>
            <div className="d-flex flex-row table-responsive">
                <table className="table table-striped table-hover" id="auto-table">
                    <thead id="auto-table-thead">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Especie</th>
                            <th scope="col">Raza</th>
                            <th scope="col">Edad</th>
                            <th scope="col">Género</th>
                            <th scope="col">Esterilizado</th>
                            <th scope="col">Veterinari@</th>
                            <th scope="col">Responsable</th>
                            <th scope="col">Vista</th>
                        </tr>
                    </thead>
                    <tbody id="auto-table-tbody" />
                </table>
            </div>
            <nav aria-label="Table pagination">
                <ul className="pagination" id="pagination">

                </ul>
            </nav>
        </>
    )
}

function VisitsTable() {

    let filter = {};

    const captureData = (e) => {
        e.preventDefault();

        const id = e.target.id;
        const value = e.target.value;

        Object.defineProperty(filter, id,
            {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true
            }
        )

        findVisits(handleData, 1, filter)
    }

    const handleData = (d, fetchMethod) => {
        handleTable(d, 'visits');
        Pagination(d, fetchMethod, handleData);

        let arrIds = [];
        const arrInputs = document.querySelectorAll('form .form-control, form .form-select');
        arrInputs.forEach(i => {
            arrIds.push(i.id);
            i.addEventListener('input', captureData);

        });
        getDataDatalist(d, arrIds)
    }

    const cleanFilters = () => {

        for (const key in filter) {
            filter[key] = '';
        }

        findVisits(handleData);
    }

    useEffect(() => {
        findVisits(handleData);
    }
        , []);
    return (
        <>
            <div className="offcanvas offcanvas-end pt-10" data-bs-scroll="false" data-bs-backdrop="true" tabIndex="1060" id="offcanvas" aria-labelledby="offcanvasLabel">
                <div className="offcanvas-header">
                    <h5 id="offcanvasLabel">Filtrar</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <form>
                        <div className="mb-3 col-auto">
                            <label htmlFor="datePicker" className="form-label">Fecha:</label>
                            <input type="date" id="datePicker" className="form-control" />
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="categoryPicker" className="form-label">Categoría:</label>
                            <input type="search" id="categoryPicker" className="form-control" list="categoryPicker-datalist" placeholder="Buscar..." />
                            <datalist id="categoryPicker-datalist">
                            </datalist>
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="vetPicker" className="form-label">Veterinaria/o:</label>
                            <input type="search" id="vetPicker" className="form-control" list="vetPicker-datalist" placeholder="Buscar..." />
                            <datalist id="vetPicker-datalist">
                            </datalist>
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="customerPicker" className="form-label">Cliente:</label>
                            <input type="search" id="customerPicker" className="form-control" list="customerPicker-datalist" placeholder="Buscar..." />
                            <datalist id="customerPicker-datalist">
                            </datalist>
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="patientPicker" className="form-label">Paciente:</label>
                            <input type="search" id="patientPicker" className="form-control" list="patientPicker-datalist" placeholder="Buscar..." />
                            <datalist id="patientPicker-datalist">
                            </datalist>
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="completedPicker" className="form-label">Completada:</label>
                            <select type="" id="completedPicker" className="form-select">
                                <option id="co-" value="">Select...</option>
                                <option id="co-1" value="1">Sí</option>
                                <option id="co-0" value="0">No</option>
                            </select>
                        </div>
                        <div className="mb-3 col-auto flex-column d-flex justify-content-end">
                            <input type="reset" id="cleanButton" className="btn btn-secondary text-white" onClick={cleanFilters}></input>
                        </div>
                    </form>
                </div>
            </div>
            <div className="d-flex flex-row table-responsive">
                <table className="table table-striped table-hover" id="auto-table">
                    <thead id="auto-table-thead">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Fecha</th>
                            <th scope="col">Categoría</th>
                            <th scope="col">Veterinaria/o</th>
                            <th scope="col">Cliente</th>
                            <th scope="col">Paciente</th>
                            <th scope="col">Especie</th>
                            <th scope="col">Cerrada</th>
                            <th scope="col">Vista</th>
                        </tr>
                    </thead>
                    <tbody id="auto-table-tbody" />
                </table>
            </div>
            <nav aria-label="Table pagination">
                <ul className="pagination" id="pagination">

                </ul>
            </nav>
        </>
    )
}

export function SpeciesTable() {

    // Método que maneja los datos de la petición
    const handleData = (d) => {

        handleTable(d, 'species');                        // Rellena la tabla
        Pagination(d, getPaginateSpecies, handleData);           // Crea la paginación y añade los eventos a esta, por eso pasamos los métodos y el filtro.
        
    }

    // Hacemos la petición al servidor, pasándole el callback.
    useEffect(() => {
        getPaginateSpecies(handleData);

        const filterBtn = document.querySelector('#filterOffcanvasBtn'); // Deshabilitamos el botón de filter
        filterBtn.setAttribute('disabled', true);

        return (() => {
            filterBtn.removeAttribute('disabled');
        })

    }, []);

    return (
        <>
            
            <div className="offcanvas offcanvas-end pt-10" data-bs-scroll="false" data-bs-backdrop="true" tabIndex="-1" id="offcanvas" aria-labelledby="offcanvasLabel">
                <div className="offcanvas-header">
                    <h5 id="offcanvasLabel">Filtrar</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                
            </div>
            <div className="d-flex flex-row table-responsive">
                <table className="table table-striped table-hover" id="auto-table">
                    <thead id="auto-table-thead">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Nombre Científico</th>
                            <th scope="col">Vista</th>
                        </tr>
                    </thead>
                    <tbody id="auto-table-tbody" />
                </table>
            </div>
            <nav aria-label="Table pagination">
                <ul className="pagination" id="pagination">
                </ul>
            </nav>
        </>
    )
}

export function RacesTable() {

    // Método que maneja los datos de la petición
    const handleData = (d) => {

        handleTable(d, 'races');                        // Rellena la tabla
        Pagination(d, getPaginateRaces, handleData);           // Crea la paginación y añade los eventos a esta, por eso pasamos los métodos y el filtro.
        
    }

    // Hacemos la petición al servidor, pasándole el callback.
    useEffect(() => {
        getPaginateRaces(handleData);

        const filterBtn = document.querySelector('#filterOffcanvasBtn'); // Deshabilitamos el botón de filter
        filterBtn.setAttribute('disabled', true);

        return (() => {
            filterBtn.removeAttribute('disabled');
        })

    }, []);

    return (
        <>
            
            <div className="offcanvas offcanvas-end pt-10" data-bs-scroll="false" data-bs-backdrop="true" tabIndex="-1" id="offcanvas" aria-labelledby="offcanvasLabel">
                <div className="offcanvas-header">
                    <h5 id="offcanvasLabel">Filtrar</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                
            </div>
            <div className="d-flex flex-row table-responsive">
                <table className="table table-striped table-hover" id="auto-table">
                    <thead id="auto-table-thead">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Especie</th>
                            <th scope="col">Vista</th>
                        </tr>
                    </thead>
                    <tbody id="auto-table-tbody" />
                </table>
            </div>
            <nav aria-label="Table pagination">
                <ul className="pagination" id="pagination">
                </ul>
            </nav>
        </>
    )
}

export function PostalCodesTable() {

    // Método que maneja los datos de la petición
    const handleData = (d) => {

        handleTable(d, 'postal_codes');                        // Rellena la tabla
        Pagination(d, getPaginatePostalCodes, handleData);           // Crea la paginación y añade los eventos a esta, por eso pasamos los métodos y el filtro.
        
    }

    // Hacemos la petición al servidor, pasándole el callback.
    useEffect(() => {
        getPaginatePostalCodes(handleData);

        const filterBtn = document.querySelector('#filterOffcanvasBtn'); // Deshabilitamos el botón de filter
        filterBtn.setAttribute('disabled', true);

        return (() => {
            filterBtn.removeAttribute('disabled');
        })

    }, []);

    return (
        <>
            
            <div className="offcanvas offcanvas-end pt-10" data-bs-scroll="false" data-bs-backdrop="true" tabIndex="-1" id="offcanvas" aria-labelledby="offcanvasLabel">
                <div className="offcanvas-header">
                    <h5 id="offcanvasLabel">Filtrar</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                
            </div>
            <div className="d-flex flex-row table-responsive">
                <table className="table table-striped table-hover" id="auto-table">
                    <thead id="auto-table-thead">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Código Postal</th>
                            <th scope="col">Ciudad</th>
                            <th scope="col">Provincia</th>
                        </tr>
                    </thead>
                    <tbody id="auto-table-tbody" />
                </table>
            </div>
            <nav aria-label="Table pagination">
                <ul className="pagination" id="pagination">
                </ul>
            </nav>
        </>
    )
}

export function SuppliersTable() {

    // Método que maneja los datos de la petición
    const handleData = (d) => {

        handleTable(d, 'suppliers');                        // Rellena la tabla
        Pagination(d, getSuppliersPaginate, handleData);   // Crea la paginación y añade los eventos a esta, por eso pasamos los métodos y el filtro.

    }

    // Hacemos la petición al servidor, pasándole el callback.
    useEffect(() => {
        getSuppliersPaginate(handleData);

    }, []);

    return (
        <>
            
            <div className="offcanvas offcanvas-end pt-10" data-bs-scroll="false" data-bs-backdrop="true" tabIndex="-1" id="offcanvas" aria-labelledby="offcanvasLabel">
                <div className="offcanvas-header">
                    <h5 id="offcanvasLabel">Filtrar</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                </div>
            </div>
            <div className="d-flex flex-row table-responsive">
                <table className="table table-striped table-hover" id="auto-table">
                    <thead id="auto-table-thead">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Ref.</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Teléfono</th>
                            <th scope="col">Vista</th>
                        </tr>
                    </thead>
                    <tbody id="auto-table-tbody" />
                </table>
            </div>
            <nav aria-label="Table pagination">
                <ul className="pagination" id="pagination">
                </ul>
            </nav>
        </>
    )
}

function Table({ selector }) {

    let table;

    switch (selector) {
        case 'customers':
            table = <CustomersTable />;
            break;
        case 'patients':
            table = <PatientsTable />;
            break;
        case 'users':
            table = <UsersTable />;
            break;
        case 'products':
            table = <ProductsTable />;
            break;
        case 'services':
            table = <ServicesTable />;
            break;
        case 'species':
            table = <SpeciesTable />;
            break;
        case 'races':
            table = <RacesTable />;
            break;
        case 'postalCodes':
            table = <PostalCodesTable />;
            break;
        case 'suppliers':
            table = <SuppliersTable />;
            break;
        default:
            table = <VisitsTable />;
            break;
    }

    return (
        <>
            {table}
        </>
    )
}

export default Table;