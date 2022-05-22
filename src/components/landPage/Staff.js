function Staff() {
    return (
        <>
            <h1 className="display-2 fw-lighter mt-5 text-center text-dark" id="staff">Staff</h1>
            <div className="d-md-flex flex-md-equal w-100 mt-2 mb-5 ps-md-3 text-dark fw-light">
                <div className="me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
                    <img className="rounded-circle " alt="Foto de perfil" src="/img/staff/staff2.jpg" style={{ width: "140px", height: "140px" }}></img>

                    <h2 className="fw-light mt-2">Collete</h2>
                    <p>Veterinaria generalista <b>especialista en fisioterapia.</b> También es la que manda en Marabú.</p>
                </div>
                <div className="me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
                    <img className="rounded-circle" alt="Foto de perfil" src="/img/staff/staff3.jpg" style={{ width: "140px", height: "140px" }}></img>

                    <h2 className="fw-light mt-2">Darn</h2>
                    <p>Veterinario <b>especialista en exóticos.</b> Su pasión son los pajaritos aunque es una enciclopedia andante de bichos raros.</p>
                </div>
                <div className="me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
                    <img className="rounded-circle" alt="Foto de perfil" src="/img/staff/staff1.jpg" style={{ width: "140px", height: "140px" }}></img>
                    <h2 className="fw-light mt-2">Ansel</h2>
                    <p>Veterinaria generalista especialista en <b>etología canina y felina.</b> Te cura el constipado mientras te enseña a sentarte.</p>
                </div>
                
            </div>
        </>
    );
}

export default Staff;
