import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form } from "./Form";
import Table from "./Table";
import { removeService, findService } from "./api/ApiServices";

export default function Services() {
    const navigate = useNavigate();
    return (
        <>
            <div className="d-flex flex-row justify-content-between">
                <h3>Servicios</h3>
                <div className="d-flex flex-row justify-content-between">
                    <button className="btn btn-outline-secondary mx-1" type="button" onClick={() => navigate('./new')}>
                        Entrada
                    </button>

                <button className="btn btn-outline-secondary py-0 px-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvas" aria-controls="offcanvas">
                    <i className="bi bi-filter-left fs-3 text-secondary"></i>
                </button>
                </div>
            </div>
            <hr />
            <Table selector='services' />
        </>
    )
}

export function NewServices() {
    return(
        <>
            <Form selector='service' action='add' />
        </>
    )
}

export function ViewService() {
    const { id } = useParams();

    const deleteService = (e) => {
        e.preventDefault();
        removeService(id);
    }

    const setBtn = () => {

        const form = document.querySelector('form#auto-form');
        const btnDelete = document.createElement('button');
        btnDelete.classList.add('btn', 'btn-secondary', 'ms-2');
        btnDelete.textContent = 'Borrar Servicio';
        btnDelete.addEventListener('click', deleteService);
        form.append(btnDelete);

    }

    const fillForm = (d) => {
        document.querySelector('#serviceName').value = d.name;
        document.querySelector('#serviceCategory').value = d.category;
        document.querySelector('#servicePrice').value = d.price;
    }

    useEffect(() => {
        findService(fillForm, id);
        setBtn();
    }, [])
    return (
        <>
            <Form selector='service' action='update' id={id} />
        </>
    )
}