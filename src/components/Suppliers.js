import Table from "./Table";
import { useNavigate, useParams } from "react-router-dom";
import { Form } from "./Form";
import { useEffect } from "react";
import { findSupplier, removeSupplier } from "./api/ApiSuppliers";
import { NewPostalCode } from "./Modals";

export default function Suppliers() {
    const navigate = useNavigate();
    return (
        <>
            <div className="d-flex flex-row justify-content-between">
                <h3>Proveedores</h3>
                <div className="d-flex flex-row justify-content-between">
                    <button className="btn btn-outline-secondary mx-1" type="button" onClick={() => navigate('./new')}>
                        Nuevo
                    </button>
                </div>
            </div>
            <hr />
            <Table selector='suppliers' />
        </>
    )
}

export function NewSuppliers() {

    return (
        <>
            <Form selector='supplier' action='add' />
            <NewPostalCode />
        </>
    )
}

export function ViewSupplier() {
    const { id } = useParams();

    const deleteSupplier = (e) => {
        e.preventDefault();
        removeSupplier(id);
        
    }

    const setBtn = () => {

        const form = document.querySelector('form#auto-form');
        const btnDelete = document.createElement('button');
        btnDelete.classList.add('btn', 'btn-secondary', 'ms-2');
        btnDelete.textContent = 'Borrar Proveedor';
        btnDelete.addEventListener('click', deleteSupplier);
        form.append(btnDelete);

    }

    const fillForm = (d) => {
        document.querySelector('#supplierCode').value = d.code;
        document.querySelector('#supplierName').value = d.name;
        document.querySelector('#supplierCategory').value = d.category;
        document.querySelector('#supplierEmail').value = d.email;
        document.querySelector('#supplierPhone').value = d.phone;
        document.querySelector('#supplierPc').value = d.postalCode;
        document.querySelector('#supplierAddress').value = d.address;
        document.querySelector('#supplierInfo').value = d.info;

    }

    useEffect(() => {
        findSupplier(fillForm, id);
        setBtn();
    })
    return (
        <>
            <Form selector='supplier' action='update' id={id}/>
            <NewPostalCode />
        </>
    )
}