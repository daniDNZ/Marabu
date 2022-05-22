function ContactForm() {

    const handleForm = (e) => {
        e.preventDefault();

        const fData = new FormData(e.target);
        const date = new Date();
        fData.append('date', date.toISOString().split('T', 1))

        e.target.reset();   // Resetea el formulario
        const config = {
            method: 'POST',
            mode: 'cors',
            body: fData
        }

        const request = new Request("http://192.168.1.81:8888/api/contact_form/add", config);
    
        fetch(request)
            .then(response => response.json())
            .then(data => alert('Enviado'))
            .catch(e => alert('El formulario no se ha podido enviar, revisa los campos'));
    
    }

    return (
        <>
            <div className="container col-xl-10 col-xxl-8 px-4 py-2" id="contact">
                <div className="row align-items-center g-lg-5 py-5">
                    <div className="col-lg-7 text-center text-lg-start">
                        <h1 className="display-4 fw-bold lh-1 mb-3">Pide cita rellenando un simple formulario</h1>
                        <p className="col-lg-10 fs-4">Déjanos un email de contacto y explícanos resumidamente la especie, el problema y los días y horas
                        que tengas disponibles. Buscaremos un hueco y te contestaremos lo antes posible.</p>
                    </div>
                    <div className="col-md-10 mx-auto col-lg-5">
                        <form className="p-4 p-md-5 border rounded-3" onSubmit={handleForm}>
                            <div className="form-floating mb-3">
                                <input type="email" className="form-control" id="floatingInput" name="email" placeholder="name@example.com" />
                                    <label htmlFor="floatingInput" className="text-black">Email</label>
                            </div>
                            <div className="form-floating mb-3">
                                <textarea className="form-control h-100" id="floatingText" name="message" placeholder="Mensaje"/>
                                    <label htmlFor="floatingText" className="form-label text-black">Mensaje</label>
                            </div>
                            <button className="w-100 btn btn-lg btn-primary" type="submit">Enviar</button>
                            <hr className="my-4" />
                                <small className="text-muted">Al hacer click en "Enviar", aceptas las condiciones de uso.</small>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactForm;