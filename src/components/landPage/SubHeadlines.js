import Staff from "./Staff";
function SubHeadlines() {
    return (
        <>
            <div className="position-relative page-section" id="clinica">
                <div className="subheadline1 d-md-flex flex-md-equal p-5 w-100">
                    <div className="d-md-flex flex-md-equal w-100 my-md-auto">
                        <div className="text-center text-md-end overflow-hidden flex-fill flex-grow-1">
                            <h3 className="display-5 fw-lighter mb-3">Siempre Pet-Friendly</h3>
                            <p className="m-0">
                                <i className="bi bi-clipboard2-heart fs-4 m-2" />
                                <span className="fs-4 fw-lighter fst-normal">Medicina y Cirujía de <b className="fw-light">exóticos, gatos y perros</b></span>
                            </p>
                            <p className="m-0">
                                <i className="bi bi-fingerprint fs-4 m-2" />
                                <span className="fs-4 fw-lighter fst-normal">Clínica humana con espacio seguro</span>
                            </p>
                            <p className="m-0">
                                <i className="bi bi-house fs-4 m-2" />
                                <span className="fs-4 fw-lighter fst-normal">Residencia de animales</span>
                            </p>
                            <p className="m-0">
                                <i className="bi bi-file-medical fs-4 m-2" />
                                <span className="fs-4 fw-lighter fst-normal">Hospitalización</span>
                            </p>
                        </div>
                    </div>
                </div>
                <Staff />
                <div className="subheadline2 d-md-flex flex-md-equal p-5 w-100">
                    <div className="d-md-flex flex-md-equal w-100 my-md-auto">
                        
                    </div>
                    <div className="d-md-flex flex-md-equal w-100 my-md-auto">
                        <div className="text-center text-md-end overflow-hidden flex-fill flex-grow-1">
                            <h3 className="display-5 fw-lighter mb-3">No olvides pedir cita</h3>
                            <p className="m-0">
                                <span className="fs-4 fw-lighter fst-normal">Funcionamos con servicio de cita previa para dar el mejor 
                                servicio posible con la menor espera por tu parte y por la de tu peludo. </span>
                            </p>
                            
                            <a role="button" className="btn btn-lg btn-outline-secondary text-white mt-2" href="#contact">Pide cita</a>
                        
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SubHeadlines;