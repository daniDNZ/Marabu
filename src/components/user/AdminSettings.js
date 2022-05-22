import Table from "../Table";

function AdminSettings() {
    return (
        <>
            <div className="d-flex flex-row justify-content-between">
                <a href="/turdus/users/new" className="btn btn-primary">
                    Nuevo Usuario
                </a>
                <button className="btn btn-outline-secondary py-0 px-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvas" aria-controls="offcanvas">
                    <i className="bi bi-filter-left fs-3 text-secondary"></i>
                </button>
            </div>
            <hr />
            <Table selector='users' />
        </>
    )
}

export default AdminSettings;