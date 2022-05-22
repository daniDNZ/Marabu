import { useContext, useEffect } from "react";
import { findTodayVisits } from "./api/ApiVisits";
import { UserContext } from "../context/context";

function Cards() {
    const {user} = useContext(UserContext);
    let date = new Date();
    date = date.toISOString().split('T')[0]

    let total = 0;
    let last = 0;

    const handleData = (d) => {
        const totalDOM = document.querySelector('#num-visits');
        const lastDOM = document.querySelector('#visits-last');

        total = d.length;
        const lastVisits = d.filter( e => e.done == false);
        last = lastVisits.length;

        totalDOM.textContent = total;
        lastDOM.textContent = last;

    }

    useEffect(() => {
        if (user.roles.includes('ROLE_STAFF'))
        findTodayVisits(handleData, date, user.id);
    }, [user])
    return (
        <>
            <div className="card m-2" style={{width: '19rem', height: '12rem'}}>
                <div className="card-body d-flex flex-column">
                    <span className="fw-lighter">Tus visitas de hoy</span>
                    <span id="num-visits" className="fs-1 fw-lighter">{total}</span>
                </div>
                <div className="card-footer bg-dark">
                    <span id="visits-last" className="fw-lighter text-white">{last}</span>
                    <span className="fw-lighter text-white"> Pendientes</span>
                </div>
            </div>
            
        </>
    )
}

export default Cards;