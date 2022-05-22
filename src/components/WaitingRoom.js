import { useEffect } from "react";
import { closeVisitFast, findOneVisit, findTodayVisits } from "./api/ApiVisits";
import { ViewVisitsList } from "./Modals";

function WaitingRoom() {
    let date = new Date;
    date = date.toISOString().split('T')[0];

    const fillModal = (v) => {

        const mTitle = document.querySelector('.modal-title');
        const mList = document.querySelector('.modal-body ul');
        const list = `
            <li class='list-group-item'><b>Hora:</b> ${v.time}</li>
            <li class='list-group-item'><b>Fecha:</b> ${v.date}</li>
            <li class='list-group-item'><b>Veterinari@:</b> ${v.vetName}</li>
            <li class='list-group-item'><b>Paciente:</b> ${v.patient}</li>
            <li class='list-group-item'><b>Propietario:</b> ${v.customer}</li>
            <li class='list-group-item'><b>Especie:</b> ${v.species}</li>
            <li class='list-group-item'><b>Raza:</b> ${v.race}</li>
            `;
        mList.innerHTML = list

        mTitle.textContent = v.category;
        
        // Listeners botones
        const viewBtn = document.querySelector('#view-visit');
        viewBtn.setAttribute('href', `/turdus/visits/${v.id}`);

        const closeBtn = document.querySelector('#close-visit');

        if (!v.done) {
            closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                closeVisitFast(v.id, '/turdus/waiting_room');
            })
        } else {
            closeBtn.textContent = 'Cobrar';
            closeBtn.setAttribute('href', `/turdus/visits/${v.id}/bill`);
        }
        

    }

    const handleModal = (e) => {
        e.preventDefault();
        const id = parseInt(e.currentTarget.dataset.id);

        // RELLENAR EL MODAL, ORDENAR LA BÚSQUEDA POR HORA Y ARREGLAR COSITAS
        findOneVisit(fillModal, id);

    }

    const handleData = (data) => {
        const visits = data;
        const vList = document.querySelector('#visitsList');
        const bList = document.querySelector('#billsList');

        bList.innerHTML = '';
        vList.innerHTML = '';
        
        visits.forEach(v => {
            const a = document.createElement('a');
            a.classList.add('list-group-item', 'list-group-item-action', 'd-flex', 'justify-content-between', 'align-items-center');
            const span = document.createElement('span');
            span.innerHTML =`<b>${v.time}</b> | <b>Cat:</b> ${v.category} | <b>Vet:</b> ${v.vetName} | <b>Pat:</b> ${v.patient} | <b>Prop:</b> ${v.customer} | <b>Ref:</b> #${v.id}`;
            a.setAttribute('href', '#');
            a.setAttribute('data-bs-toggle', 'modal');
            a.setAttribute('data-bs-target', '#viewVisitsListModal');
            a.dataset.id = v.id;
            a.addEventListener('click', handleModal);

            a.append(span);

            if (v.done == false) {

                vList.append(a);

            } else {
                if (v.existsBill == false) {
                    bList.append(a);
                }
            }
        });
    }

    
    useEffect(()=> {
        findTodayVisits( handleData, date)

    // Refrescamos las visitas cada minuto en caso de inactividad, para tenerla actualizada.
        const refresh = () => findTodayVisits( handleData, date);
        const intervalTime = 60000;
        let interval = setInterval(refresh, intervalTime);

        const resetInterval = () => {
            clearInterval(interval);
            interval = setInterval(refresh, intervalTime);
        }

        document.addEventListener('mousemove', resetInterval);
        document.addEventListener('keypress', resetInterval);

        return () => { 
            clearInterval(interval);   // Elimina el intervalo cuando el componente se desmonte
            document.removeEventListener('mousemove', resetInterval);
            document.removeEventListener('keypress', resetInterval);
        }
    }, []);
    return (
        <>
            <h3>Recepción</h3>
            <hr />
            <div className="my-4">
                <h5>Visitas pendientes</h5>
                <div id="visitsList" className="list-group overflow-scroll" style={{maxHeight: "20em"}}>
                </div>
            </div>
            <hr />
            <div className="">
                <h5>Visitas cerradas a cobrar</h5>
                <div id="billsList" className="list-group overflow-scroll"  style={{maxHeight: "20em"}}>
                    
                </div>
            </div>
            <ViewVisitsList />
        </>
    )
}

export default WaitingRoom;