import { useParams } from "react-router-dom";
import { getOneUser, changePswd, updateProfile } from "../api/ApiUser";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/context";

function UserProfile() {
    const { user } = useContext(UserContext);

    const { id } = useParams();

    // Manejador datos del formulario
    const handleFData = (e) => {
        e.preventDefault();

        const fData = new FormData(e.target);
        updateProfile(fData, id); 
    }

    const handlePswd = (e) => {
        e.preventDefault();

        const fData = new FormData(e.target);
        e.target.reset();
        if(fData.get('password') === fData.get('passwordRepeat')) {
            changePswd(fData, id);
        }
    }

    const handleUser = (data) => {

        document.getElementById("name").value = data.name;
        document.getElementById("lastName").value = data.lastName;
        document.getElementById("collegiate").value = data.collegiate;
        document.getElementById("username").value = data.username;
        document.getElementById("phone").value = data.phone;
        document.getElementById("email").value = data.email;
        document.getElementById("dni").value = data.dni;

    }

    const addEvents = () => {
        const formProfile = document.querySelector('#auto-form');
        formProfile.addEventListener('submit', handleFData);

        const formPswd = document.querySelector('#change-pswd');
        formPswd.addEventListener('submit', handlePswd);
    }

    useEffect(() => {

        getOneUser(handleUser, id);
        addEvents();

    })

    return (
        <>
        <h3>Perfil de {user.name}</h3>
            <form id="auto-form" onSubmit={handleFData}>
                <div id="form-row-1" className="row">
                    <div className="d-flex flex-row justify-content-between" id="form-title">
                        <div className="d-flex flex-row">
                            <h3 className="col-auto" id="userViewPage"> </h3>
                        </div>
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="name" className="form-label">Nombre:</label>
                        <input type="text" id="name" name="name" className="form-control" required />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="lastName" className="form-label" >Apellidos:</label>
                        <input type="text" id="lastName" name="lastName" className="form-control" required />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="collegiate" className="form-label" >Colegiado Nº:</label>
                        <input type="text" id="collegiate" name="collegiate" className="form-control" />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="username" className="form-label" >Usuario:</label>
                        <input type="text" id="username" name="username" className="form-control" required />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="phone" className="form-label">Teléfono:</label>
                        <input type="text" id="phone" name="phone" className="form-control" required />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input type="email" id="email" name="email" className="form-control" required />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="dni" className="form-label">DNI:</label>
                        <input type="text" id="dni" name="dni" className="form-control" />
                    </div>
                </div>
                <div id="form-row-2" className="row">
                    <div className="mb-3 col-auto">
                        <label htmlFor="pic" className="form-label" >Foto:</label>
                        <input type="file" id="pic" name="pic" className="form-control" />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Guardar</button>
            </form>
            <hr />
            <h3>Cambiar Contraseña</h3>
            <form id="change-pswd">
                <div id="form-row-2" className="row">
                    <div className="mb-3 col-auto">
                        <label htmlFor="userPassword" className="form-label" >Nueva contraseña:</label>
                        <input type="password" id="userPassword" name="password" className="form-control" />
                        <label htmlFor="userPasswordRepeat" className="form-label" >Repetir contraseña:</label>
                        <input type="password" id="userPasswordRepeat" name="passwordRepeat" className="form-control" />
                    </div>
                </div>
                <button type="submit" className="btn btn-secondary"> Actualizar </button>

            </form>


        </>
    )
}

export default UserProfile;