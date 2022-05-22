import { useEffect, useState } from "react"
import { Pagination } from "./TablePagination";
import { Tooltip } from "bootstrap";

export default function Messages() {

    const [jsxElements, setJsxElements] = useState(['']);

    const handleData = (d) => {
        setJsxElements([])     // Limpiamos la lista para los re-renderizados

        Pagination(d, getMessages, handleData);

        const dateObj = new Date();

        d.data.forEach(m => {
            // Comparamos fechas
            const msgDate = new Date(m.date);
            const rest = +dateObj - +msgDate;
            const toDays = Math.floor(rest / 86400000);
            let smallPrint = '';
            toDays === 0
                ? smallPrint = 'Hoy'
                : smallPrint = `${toDays} días`;

            const div = <div className="toast d-block shadow-none" key={m.id}>
                <div className="toast-header">
                    <strong className="me-auto">
                        <a href={`mailto:${m.email}`} className="text-decoration-none" data-bs-toggle="tooltip" data-bs-placement="top" title="Mandar email">{m.email}</a>
                    </strong>
                    <small>
                        {smallPrint}
                    </small>
                    <button type="button" className="btn-close" aria-label="Close" data-id={`${m.id}`} onClick={removeMsg} />
                </div>
                <div className="toast-body text-truncate" data-bs-toggle="tooltip" data-bs-placement="top" title={`${m.message}`}>
                    {m.message}
                </div>
            </div>;

            setJsxElements(current => [...current, div])

            // Bootstrap Tooltips
            const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
            tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new Tooltip(tooltipTriggerEl)
            })
        });
    }

    const removeMsg = (e) => {
        const id = e.currentTarget.dataset.id;
        const config = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
        }

        const request = new Request(`http://192.168.1.81:8888/api/contact_form/remove/${id}`, config);

        fetch(request)
            .then(response => response.json())
            .then(data => getMessages(handleData))
            .catch(e => console.log(e));
    }

    const getMessages = (callback, currentPage = 1) => {
        const config = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
        }

        const request = new Request(`http://192.168.1.81:8888/api/contact_form/${currentPage}`, config);

        fetch(request)
            .then(response => response.json())
            .then(data => callback(data))
            .catch(e => console.log(e));

    }

    useEffect(() => {
        getMessages(handleData);
    }, [])
    return (
        <>
            <div className="my-4 mx-2 fw-light" style={{ width: "19rem" }}>
                <h3 className="">Últimos mensajes</h3>
                <div id="messagesList" className="toast-container">
                    {jsxElements}
                </div>
                <nav className="mt-2" aria-label="Table pagination">
                    <ul className="pagination" id="pagination">

                    </ul>
                </nav>
            </div>

        </>
    )
}