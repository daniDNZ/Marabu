
function FastAccessBtns() {
    
    const changeUser = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        window.location.assign('/login');
    }

    return (
        <>
                <a href="/turdus/registrations" className="text-reset text-decoration-none">
                    <div className="card m-2 bg-primary" style={{ width: '9rem', height: '9rem' }}>
                        <div className="card-body d-flex flex-column justify-content-center align-items-center">
                            <i className="bi bi-plus-lg fs-1 fw-lighter text-light" />
                            <span className="text-light fw-lighter fs-4">nuevo</span>
                        </div>
                    </div>
                </a>
                <a href="/turdus/search" className="text-reset text-decoration-none">
                    <div className="card m-2 bg-primary" style={{ width: '9rem', height: '9rem' }}>
                        <div className="card-body d-flex flex-column justify-content-center align-items-center">
                            <i className="bi bi-search-heart fs-1 fw-lighter text-light" />
                            <span className="text-light fw-lighter fs-4">buscar</span>
                        </div>
                    </div>
                </a>
                <a href="/turdus/schedule" className="text-reset text-decoration-none">
                    <div className="card m-2 bg-primary" style={{ width: '9rem', height: '9rem' }}>
                        <div className="card-body d-flex flex-column justify-content-center align-items-center">
                            <i className="bi bi-calendar4-week fs-1 fw-lighter text-light" />
                            <span className="text-light fw-lighter fs-4">semana</span>
                        </div>
                    </div>
                </a>
                <a href="#" id="change-user" className="text-reset text-decoration-none" onClick={changeUser}>
                    <div className="card m-2 bg-primary" style={{ width: '9rem', height: '9rem' }}>
                        <div className="card-body d-flex flex-column justify-content-center align-items-center">
                            <i className="bi bi-people fs-1 fw-lighter text-light" />
                            <span className="text-light fw-lighter fs-4">login</span>
                        </div>
                    </div>
                </a>
        </>
    )
}

export default FastAccessBtns;

