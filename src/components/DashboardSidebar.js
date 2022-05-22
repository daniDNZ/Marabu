import DashboardNavContent from "./DashboardNavContent";
function DashboardSidebar() {

    
    return (
        <>
            <aside id="dashboard-sidebar" className="col-sm-2 flex-grow-sm-1 flex-shrink-1 flex-grow-0 sticky-top  bg-light px-0 d-none d-md-flex" >
                <div className="p-1 h-100 sticky-top w-100">
                    <DashboardNavContent/>
                </div>
            </aside>
        </>
    );
}

export default DashboardSidebar;