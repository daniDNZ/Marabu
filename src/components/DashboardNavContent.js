import { NavLink } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/context";
import global from "../global";

function DashboardNavContent() {
    const { user } = useContext(UserContext);
    let src = '';
    user.pic !== undefined
    ? src = global.apiUri+user.pic
    : src = '';
    const img = <img src={src} alt="user" width="32" height="32" className="rounded-circle me-2"/>;
   
    const profileUri = `/turdus/users/${user.id}/profile`;

    let li;

    user.roles.includes('ROLE_ADMIN')
    ? li = 
        <li>
          <a 
            href="/turdus/settings" 
            className="dropdown-item">
              Administrar Usuarios
          </a>
        </li>
    : li = <></>;

    return (
        <ul className="nav nav-pills flex-column">
            <li className="mx-0 nav-item">
                <NavLink to="/turdus/dashboard" className="nav-link px-2">

                    <i className="bi bi-speedometer fs-5 me-2"></i>
                    <span className="d-inline">Dashboard</span>

                </NavLink>
            </li>
            <li className="mx-0 nav-item">
                <NavLink to="/turdus/schedule" className="nav-link px-2">
                    <i className="bi bi-calendar-week fs-5 me-2"></i>
                    <span className="d-inline">Horario</span>
                </NavLink>
            </li>
            <li className="mx-0 nav-item">
                <NavLink to="/turdus/waiting_room" className="nav-link px-2">
                    <i className="bi bi-signpost-2 fs-5 me-2"></i>
                    <span className="d-inline">Recepción</span>
                </NavLink>
            </li>
            <li className="mx-0 nav-item">
                <NavLink to="/turdus/search" className="nav-link px-2">
                    <i className="bi bi-search fs-5 me-2"></i>
                    <span className="d-inline">Buscar</span>
                </NavLink>
            </li>
            <li className="mx-0 nav-item">
                <NavLink to="/turdus/registrations" className="nav-link px-2">
                    <i className="bi bi-plus-circle fs-5 me-2"></i>
                    <span className="d-inline">Añadir</span>
                </NavLink>
            </li>
            <li className="mx-0 nav-item">
                <a href="#" className="nav-link px-2 dropdown-toggle" data-bs-toggle="collapse" data-bs-target="#stock-collapse" aria-controls="#stock-collapse" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="bi bi-box2-heart fs-5 me-2"></i>
                    <span className="d-inline">Stock</span>
                </a>
                <div id="stock-collapse" className="collapse navbar-collapse">
                    <hr className="m-0" />
                    <ul className="nav navbar-nav flex-column">
                        <li className="mx-0 nav-item">
                            <NavLink to="/turdus/products" className="nav-link px-2">
                                <i className="bi bi-boxes fs-5 me-2"></i>
                                <span className="d-inline">Productos</span>
                            </NavLink>
                        </li>
                        <li className="mx-0 nav-item">
                            <NavLink to="/turdus/suppliers" className="nav-link px-2">
                                <i className="bi bi-shop fs-5 me-2"></i>
                                <span className="d-inline">Proveedores</span>
                            </NavLink>
                        </li>
                        <li className="mx-0 nav-item">
                            <NavLink to="/turdus/services" className="nav-link px-2">
                                <i className="bi bi-heart-pulse fs-5 me-2"></i>
                                <span className="d-inline">Servicios</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </li>
            <li className="mx-0 nav-item d-md-none">
                <a href="#" className="nav-link px-2 dropdown-toggle collapsed" id="dropdownUser2" data-bs-toggle="collapse" data-bs-target="#user-collapse" aria-controls="#user-collapse" aria-expanded="false">
                    {img}
                </a>
                <div id="user-collapse" className="collapse navbar-collapse">
                    <hr className="m-0" />
                    <ul id="dropdownUserUl2" className="nav nav-pills flex-column">
                        {li}
                        <li><a className="dropdown-item" href={profileUri}>Profile</a></li>
                        <li>
                            <hr className="dropdown-divider" />
                        </li>
                        <li>
                            <NavLink to="/logout" className="dropdown-item">Sign out</NavLink>
                        </li>
                    </ul>
                </div>

            </li>
        </ul>
    )
}

export default DashboardNavContent;