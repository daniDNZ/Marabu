export default function ContactInfo() {
    return (
        <>
            <div className="container col-xl-10 col-xxl-8 px-4 py-2" id="contact">
                <div className="row align-items-center g-lg-5">
                    <div className="col-lg-7 text-center text-lg-start">
                        <iframe className="rounded" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1513.639005285339!2d-3.1538417416779527!3d40.64580169483469!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd43abbb885ca17d%3A0xf931004af4307dae!2sPol%C3%ADgono%20Sppp%204%2C%2026P%2C%2019005%20Guadalajara!5e0!3m2!1ses!2ses!4v1652283043601!5m2!1ses!2ses" height="400" width="100%" style={{ border: 0 }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Google Maps"></iframe>
                    </div>
                    <div className="col-lg-5 mt-3 mt-md-0 text-center text-lg-start">
                        <p className="m-0 fs-4 fw-lighter">
                            <i className="bi bi-phone me-2 text-secondary"></i>
                            <a href="tel:+34 949 84 93 210" className="text-decoration-none">+34 949 84 93 210</a>
                        </p>
                        <p className="m-0 fs-3 fw-lighter">
                            <i className="bi bi-envelope me-2 text-secondary"></i>
                            <a href="mailto:contacto@marabu.com" className="text-decoration-none">contacto@marabu.com</a>
                        </p>
                        <p className="m-0 fs-3 fw-lighter">
                            <i className="bi bi-signpost-2 me-2 text-secondary"></i>
                            <a href="https://goo.gl/maps/R4hjtAHPfP8KVSzQ8" className="text-decoration-none"> Calle de la Aventura, local 3 B.
                                Guadalajara, 19002.</a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}