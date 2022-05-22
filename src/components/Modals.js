import { useEffect } from "react";
import { addUpdatePatient } from "./api/ApiPatients";
import { addUpdateVisit } from "./api/ApiVisits";
import { getProducts } from "./api/ApiProducts";
import { getServices } from "./api/ApiServices";
import { Pagination } from "./TablePagination";
import { Form } from "./Form"
import { addUpdateSpecies } from "./api/ApiSpecies";
import { addUpdateRace } from "./api/ApiRaces";
import { useNavigate } from "react-router-dom";
import { addUpdateSupplier } from "./api/ApiSuppliers";
import { addUpdatePostalCode } from "./api/ApiPostalCode";

function AlertModal() {
    return (
        <>
            {/* Button trigger modal  */}
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#warningModal">Guardar</button>
            {/* Modal  */}
            <div className="modal fade" id="warningModal" tabIndex="-1" aria-labelledby="warningModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="warningModalLabel">¿Quieres actualizar?</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Esta acción no se puede deshacer
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function NewPatient() {
    const handleData = (e) => {
        e.preventDefault();

        let fData = {};
        const form = document.querySelector('#newPatientModal .modal-body form');
        for (const e of form) {
            console.log(e.value)
            Object.defineProperty(fData, e.id,
                {
                    value: { value: e.value },
                    enumerable: true,
                    configurable: true,
                    writable: true
                }
            )
        }
        addUpdatePatient(fData, 'add');
    }

    const tunningBtnsModals = () => {  // Añade los atributos a los botones de PostalCode para volver a patient

        const addSpecies = document.querySelector('button#addSpecies');
        const addRace = document.querySelector('button#addRace');
        const closeSpecies = document.querySelector('button#closeSpecies');
        const closeRace = document.querySelector('button#closeRace');
        addSpecies.setAttribute('data-bs-target', '#newPatientModal');
        addSpecies.setAttribute('data-bs-toggle', 'modal');
        addRace.setAttribute('data-bs-target', '#newPatientModal');
        addRace.setAttribute('data-bs-toggle', 'modal');
        closeSpecies.setAttribute('data-bs-target', '#newPatientModal');
        closeSpecies.setAttribute('data-bs-toggle', 'modal');
        closeRace.setAttribute('data-bs-target', '#newPatientModal');
        closeRace.setAttribute('data-bs-toggle', 'modal');
    }

    useEffect(() => {
        tunningBtnsModals();
    })

    return (
        <>
            <div className="modal fade" id="newPatientModal" tabIndex="-1" aria-labelledby="newPatientModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="newPatientModalLabel">Nuevo Paciente</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <Form selector='patient' action='add' />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-primary" onClick={handleData}>Añadir</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function NewVisit() {
    const handleData = (e) => {
        e.preventDefault();

        let fData = {};
        const form = document.querySelector('.modal-body form');
        for (const e of form) {
            Object.defineProperty(fData, e.id,                   // Creamos una propiedad del objeto fData con el string a buscar.
                {
                    value: { value: e.value },
                    enumerable: true,
                    configurable: true,
                    writable: true
                }
            )
        }
        addUpdateVisit(fData, 'add');
    }


    return (
        <>
            <div className="modal fade" id="newVisitModal" tabIndex="-1" aria-labelledby="newVisitModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="newVisitModalLabel">Nueva Visita</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <Form selector='visit' action='add' />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-primary" onClick={handleData}>Añadir</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export function NewSpecies() {
    const handleData = () => {
        
        const form = document.querySelector('#newSpeciesModal .modal-body form');
        const fData = new FormData(form);
        addUpdateSpecies(fData, 'add');
        
    }


    return (
        <>
            <div className="modal fade" id="newSpeciesModal" tabIndex="-1" aria-labelledby="newSpeciesModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="newSpeciesModalLabel">Nueva Especie</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <Form selector='species' action='add' />
                        </div>
                        <div className="modal-footer">
                            <button type="button"  id="closeSpecies" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" id="addSpecies" className="btn btn-primary" onClick={handleData} data-bs-dismiss="modal">Añadir</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export function NewRace() {
    const handleData = () => {

        const form = document.querySelector('#newRaceModal .modal-body form');
        const fData = new FormData(form);
        
        addUpdateRace(fData, 'add');
    }


    return (
        <>
            <div className="modal fade" id="newRaceModal" tabIndex="-1" aria-labelledby="newRaceModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="newRaceModalLabel">Nueva Raza</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <Form selector='race' action='add' />
                        </div>
                        <div className="modal-footer">
                            <button type="button" id="closeRace" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" id="addRace" className="btn btn-primary" onClick={handleData}  data-bs-dismiss="modal">Añadir</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export function NewSupplier() {
    const handleData = () => {

        const form = document.querySelector('#newSupplierModal .modal-body form');
        const fData = new FormData(form);
        
        addUpdateSupplier(fData, 'add');
    }

    const tunningPostalCodeModal = () => {  // Añade los atributos a los botones de PostalCode para volver a supplier

        const cancelBtnPc = document.querySelector('button#cancelPcModal');
        const addBtnPc = document.querySelector('button#addPcModal');
        cancelBtnPc.setAttribute('data-bs-target', '#newSupplierModal');
        cancelBtnPc.setAttribute('data-bs-toggle', 'modal');
        addBtnPc.setAttribute('data-bs-target', '#newSupplierModal');
        addBtnPc.setAttribute('data-bs-toggle', 'modal');
    }

    useEffect(() => {
        tunningPostalCodeModal();
    })

    return (
        <>
            <div className="modal fade" id="newSupplierModal" tabIndex="-1" aria-labelledby="newSupplierModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="newSupplierModalLabel">Nuevo Proveedor</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <Form selector='supplier' action='add' />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-primary" onClick={handleData}  data-bs-dismiss="modal">Añadir</button>
                        </div>
                    </div>
                </div>
            </div>
            <NewPostalCode />
        </>
    )
}

export function NewPostalCode() {
    const handleData = () => {

        const form = document.querySelector('#newPostalCodeModal .modal-body form');
        const fData = new FormData(form);
        
        addUpdatePostalCode(fData, 'add');
    }

    return (
        <>
            <div className="modal fade" id="newPostalCodeModal" tabIndex="-1" aria-labelledby="newPostalCodeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl shadow">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="newPostalCodeModalLabel">Nuevo Código Postal</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <Form selector='pc' action='add' />
                        </div>
                        <div className="modal-footer">
                            <button type="button" id="cancelPcModal" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" id="addPcModal" className="btn btn-primary" onClick={handleData} data-bs-dismiss="modal">Añadir</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function ViewVisitsList() {



    return (
        <>
            <div className="modal fade" id="viewVisitsListModal" tabIndex="-1" aria-labelledby="viewVisitsListModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="viewVisitsListModalLabel">Visita Ref</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <ul className="list-group list-group-horizontal-lg"></ul>
                        </div>
                        <div className="modal-footer">
                            <a href="#" target="_blank" role="button" id="view-visit" type="button" className="btn btn-outline-primary" >Ver Ficha</a>
                            <a href="#" role="button" id="close-visit" type="button" className="btn btn-outline-secondary" >Cerrar Visita</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function AddProducts({ callback }) {
    let filter = {      // Guardamos los valores de los inputs para enviarlo como filtro.
        category: '',
        name: '',
        species: ''
    }

    let item = 'products';  // Nos ayuda a distinguir entre productos y servicios.
    let cart = []           // Array del carrito.

    const handleCartItems = () => {

        const chBox = document.querySelectorAll('input[type=checkbox]');    // Quitamos los checks
        for (const i of chBox) {
            if (i.checked == true) {
                i.checked = false;
            }
        }
        callback(cart);
        cart = [];
    }

    const addItem = (e) => {
        e.preventDefault();
        const i = e.target;
        if (i.checked == true) {
            cart.push({
                id: i.dataset.id,
                type: i.dataset.type,
                name: i.dataset.name,
                price: i.dataset.price,
                q: 1
            });
        } else if (i.checked == false) {
            cart = cart.filter(item => item.id !== i.dataset.id || item.type !== i.dataset.type);
        }

    }

    const listeners = () => {
        // CheckBox listeners
        const chBox = document.querySelectorAll('input[type=checkbox]');
        for (const i of chBox) {
            i.addEventListener('input', addItem);
        }
    }

    const fillItems = (data) => {

        // Recogemos la tabla
        const tbody = document.querySelector('#auto-table-modal tbody');
        const thead = document.querySelector('#auto-table-modal thead');

        tbody.innerHTML = '';
        thead.innerHTML = '';

        const trHead = document.createElement('tr');
        const thName = document.createElement('th');
        const thCat = document.createElement('th');
        const thPrice = document.createElement('th');
        const thAdd = document.createElement('th');

        thPrice.classList.add('text-end');
        thAdd.classList.add('text-center');

        thName.textContent = 'Nombre';
        thCat.textContent = 'Categoría';
        thPrice.textContent = 'Precio';
        thAdd.textContent = 'Añadir';

        if (item == 'products') {
            const thSubcat = document.createElement('th');
            const thStock = document.createElement('th');
            const thRef = document.createElement('th');

            thSubcat.textContent = 'Subcategoría';
            thStock.textContent = 'Stock';
            thRef.textContent = 'Ref.';

            trHead.append(thName, thCat, thSubcat, thStock, thRef, thPrice, thAdd);
        } else {
            trHead.append(thName, thCat, thPrice, thAdd);
        }

        thead.append(trHead);


        data.data.forEach(p => {
            // Llenamos la tabla
            const tr = document.createElement('tr');
            const tdName = document.createElement('td');
            const tdCat = document.createElement('td');
            const tdPrice = document.createElement('td');
            const tdCheck = document.createElement('td');
            const checkbox = document.createElement('input');

            tdPrice.classList.add('text-end');
            tdCheck.classList.add('text-center');
            checkbox.classList.add('form-check-input');

            checkbox.setAttribute('type', 'checkbox');
            checkbox.dataset.id = p.id;
            checkbox.dataset.type = item;
            checkbox.dataset.name = p.name;
            checkbox.dataset.price = p.price;

            tdName.textContent = p.name;
            tdCat.textContent = p.category;
            tdPrice.textContent = p.price;

            tdCheck.append(checkbox);

            if (item == 'products') {
                const tdSubcat = document.createElement('td');
                const tdStock = document.createElement('td');
                tdStock.classList.add('text-end');
                const tdCode = document.createElement('td');

                tdSubcat.textContent = p.subcategory;
                tdStock.textContent = p.stock;
                tdCode.textContent = p.code;

                tr.append(tdName, tdCat, tdSubcat, tdStock, tdCode, tdPrice, tdCheck);

            } else {
                tr.append(tdName, tdCat, tdPrice, tdCheck);
            }

            tbody.append(tr);

        });
        listeners();

    }

    const fillDatalist = (data) => {
        // Recogemos los selects para crear las options y los limpiamos
        const catSelect = document.querySelector('#category-select');
        const speSelect = document.querySelector('#species-select');
        catSelect.innerHTML = `<option value="">Categoría</option>`;
        speSelect.innerHTML = `<option value="">Especie</option>`;
        item == 'services' ?
            speSelect.setAttribute('disabled', 'true') :
            speSelect.removeAttribute('disabled');

        // Paginación
        Pagination(data, getProducts, fillDatalist, filter);

        let arrCat = [];
        let arrSpe = [];

        data.data.forEach(i => {
            // Llenamos un array con categorías y otro con especies para quitar los repetidos.
            if (i.species) {
                i.species.forEach(sp => {
                    arrSpe.push(sp);
                });
            }

            arrCat.push(i.category);
        });

        // Quitamos Repetidos
        arrSpe = [... new Set(arrSpe)];
        arrCat = [... new Set(arrCat)];

        // Creamos las options
        arrSpe.forEach(sp => {
            const speOp = document.createElement('option');
            speOp.value = sp;
            speOp.textContent = sp;
            speSelect.append(speOp);
        });

        arrCat.forEach(cat => {
            const catOp = document.createElement('option');
            catOp.value = cat;
            catOp.textContent = cat;
            catSelect.append(catOp);
        });

        fillItems(data)

    }

    // Busca productos o servicios según toque
    const findItems = () => {

        item == 'services' ?
            getServices(fillItems, filter) :
            getProducts(fillItems, filter)

    }

    // Cambia entre productos y servicios
    const changeItems = (e) => {
        e.preventDefault();

        for (const k in filter) {
            filter.k = '';
        }

        item = e.target.value;
        item == 'services' ?
            getServices(fillDatalist, filter) :
            getProducts(fillDatalist, filter)

    }

    // Establecemos filtros
    const capCategory = (e) => {
        e.preventDefault();
        filter.categoryPicker = e.target.value;
        findItems();
    }

    const capSpecies = (e) => {
        e.preventDefault();
        filter.speciesPicker = e.target.value;
        findItems();
    }

    const capName = (e) => {
        e.preventDefault();
        filter.namePicker = e.target.value;
        findItems();
    }

    useEffect(() => {
        getProducts(fillDatalist, filter);
    }, [])
    return (
        <>
            <div className="modal fade" id="addProductsModal" tabIndex="-1" aria-labelledby="addProductsModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addProductsModalLabel">Productos/Servicios</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* BÚSQUEDA */}
                            <div id="filter-form">
                                <div className="d-flex flex-row mb-3">
                                    <select className="form-select" onInput={changeItems}>
                                        <option value="products">Productos</option>
                                        <option value="services">Servicios</option>
                                    </select>
                                    <select className="form-select mx-2" id="category-select" onInput={capCategory}>
                                        <option value="">Categoría</option>
                                    </select>
                                    <select className="form-select" id="species-select" onInput={capSpecies}>
                                        <option value="">Especie</option>
                                    </select>
                                </div>
                                <div className="d-flex flex-row mb-3">
                                    <input className="form-control" type="search" placeholder="Buscar..." onInput={capName} />
                                </div>

                            </div>

                            {/* LISTA PRODUCTOS */}
                            <div className="d-flex flex-row table-responsive">
                                <table className="table table-striped table-hover" id="auto-table-modal">
                                    <thead />
                                    <tbody />
                                </table>

                            </div>
                            <nav aria-label="Table pagination">
                                <ul className="pagination" id="pagination">
                                </ul>
                            </nav>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cancelar
                            </button>
                            <a
                                href="#"
                                role="button"
                                id="add-products"
                                type="button"
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                                onClick={handleCartItems}
                            >
                                Añadir
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export {
    AlertModal,
    NewPatient,
    NewVisit,
    ViewVisitsList,
    AddProducts
}