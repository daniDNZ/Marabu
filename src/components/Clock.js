import { useEffect } from "react";

function Clock() {

    let color = true;
    const changeHour = () => {
        const date = new Date;

        const h = date.getHours();
        const i = date.getMinutes();
        const s = date.getSeconds();

        const hDOM = document.querySelector('#hours');
        const iDOM = document.querySelector('#minutes');
        const sDOM = document.querySelector('#seconds');

        hDOM.textContent = h.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        });
        iDOM.textContent = i.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        });
        sDOM.textContent = ':';

        color ?
            sDOM.setAttribute('style', 'color: black') :
            sDOM.setAttribute('style', 'color: white');

        color = !color;

    }

    useEffect(() => {
        const timer = setInterval(changeHour, 1000);

        return () => clearInterval(timer);
    }, []);




    return (
        <>
            <div>
                <h3 className="fw-light">
                    <span id="hours"></span>
                    <span id="seconds"></span>
                    <span id="minutes"></span>
                </h3>
            </div>
        </>
    )
}

export default Clock;