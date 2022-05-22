function Headline() {

    return (
        <>
            <div id="home" className="headline display-relative overflow-hidden p-5">
                <div className="d-md-flex flex-md-equal w-100 my-3">
                    <div className="text-center text-md-start text-primary overflow-hidden flex-fill flex-grow-1">
                        <img src="/img/marabu-orange.png" className="w-100" alt="Marabú - Clínica Veterinaria Guadalajara" style={{maxWidth: "964px"}}/>
                        <h3 className="display-6 fw-lighter my-2">Clínica Veterinaria Guadalajara</h3>
                        <p className="m-0">
                            <a role="button" className="btn btn-lg btn-outline-primary" href="#contact">Ven a vernos</a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Headline;