import Table from "./Table";
import { useNavigate, useParams } from "react-router-dom";
import { Form } from "./Form";
import { useEffect } from "react";
import { findProduct, removeProduct } from "./api/ApiProducts";

export default function Products() {
    const navigate = useNavigate();
    return (
        <>
            <div className="d-flex flex-row justify-content-between">
                <h3>Productos</h3>
                <div className="d-flex flex-row justify-content-between">
                    <button className="btn btn-outline-secondary mx-1" type="button" onClick={() => navigate('./new')}>
                        Entrada
                    </button>

                    <button className="btn btn-outline-secondary py-0 px-2 ms-1" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvas" aria-controls="offcanvas">
                        <i className="bi bi-filter-left fs-3 text-secondary"></i>
                    </button>
                </div>
            </div>
            <hr />
            <Table selector='products' />
        </>
    )
}

export function NewProducts() {

    return (
        <>
            <Form selector='product' action='add' />
        </>
    )
}

export function ViewProduct() {
    const { id } = useParams();

    const deleteProduct = (e) => {
        e.preventDefault();
        removeProduct(id);
    }

    const setBtn = () => {

        const form = document.querySelector('form#auto-form');
        const btnDelete = document.createElement('button');
        btnDelete.classList.add('btn', 'btn-secondary', 'ms-2');
        btnDelete.textContent = 'Borrar Producto';
        btnDelete.addEventListener('click', deleteProduct);
        form.append(btnDelete);

    }

    const fillForm = (d) => {
        document.querySelector('#productCode').value = d.code;
        document.querySelector('#productName').value = d.name;
        document.querySelector('#productCategory').value = d.category;
        document.querySelector('#productSubcategory').value = d.subcategory;
        document.querySelector('#productDose').value = d.dose;
        document.querySelector('#productPrice').value = d.price;
        document.querySelector('#productStock').value = d.stock;
        document.querySelector('#productLot').value = d.lot;
        document.querySelector('#productExpiration').value = d.expiration;
        document.querySelector('#productSupplier').value = d.supplier;
        document.querySelector('#speciesSelected').value = d.species;
        document.querySelector('#productEan').value = d.ean;

    }

    useEffect(() => {
        findProduct(fillForm, id);
        setBtn();
    })
    return (
        <>
            <Form selector='product' action='update' id={id}/>
            
        </>
    )
}