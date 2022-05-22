import { useEffect } from "react";

function FormAlerts() {

    const closeAlert = (e) => {
        e.preventDefault();
    
        const alert = e.target.parentElement;
        alert.classList.contains('d-none') ? alert.classList.remove('d-none') : alert.classList.add('d-none');
    
    }

    useEffect(() => {

        document.getElementById('alert-success-close').addEventListener('click', closeAlert);
        document.getElementById('alert-danger-close').addEventListener('click', closeAlert);

    }, [])

    
    return (
        <>
            <div className="alert alert-success alert-dismissible fade d-none show" tabIndex="-1" id="completedAlert" role="alert" aria-hidden="true">

                <strong>Creado con éxito!</strong>
                <button type="button" id="alert-success-close" className="btn-close" aria-label="Close"></button>

            </div>
            <div className="alert alert-danger alert-dismissible fade d-none show" tabIndex="-1" id="failedAlert" role="alert" aria-hidden="true">

                <strong>Error al crear, compruebe los campos</strong>
                <button type="button" id="alert-danger-close" className="btn-close" aria-label="Close"></button>

            </div>
        </>
    )
}

const handleAlert = (success) => {

    let alert;
    if (success) {
        alert = document.getElementById("completedAlert");
    } else {
        alert = document.getElementById("failedAlert");
    }
    alert.classList.contains('d-none') ? alert.classList.remove('d-none') : alert.classList.add('d-none')

    // Creamos una función y llamamos a un timeout para cerrar la alerta pasados 3 segundos. 
    const closedByTime = () => {
        const alertSuccess = document.getElementById('completedAlert');
        const alertDanger = document.getElementById('failedAlert');

        const arr = [alertSuccess, alertDanger];

        arr.forEach(e => {
           if (!e.classList.contains('d-none')) e.classList.add('d-none');
        });
    }

    setTimeout(closedByTime, 3000);
}

export { 
    FormAlerts, 
    handleAlert, 
};