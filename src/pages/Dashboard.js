import { Route, Routes } from 'react-router-dom';

import DashboardNavigation from '../components/DashboardNavigation';
import DashboardSidebar from '../components/DashboardSidebar';
import Home from '../components/Home';
import Orders from '../components/Orders';
import Schedule from '../components/Schedule';
import { Customer, Patient, PostalCode, Race, Species, User, Visit } from '../components/View';
import Registrations from '../components/Registrations';
import Search from '../components/Search';
import WaitingRoom from '../components/WaitingRoom';
import Bill from '../components/Bill.js';
import PayDebt from '../components/PayDebt';
import UserProfile from '../components/user/UserProfile';
import AdminSettings from '../components/user/AdminSettings';
import { Form } from '../components/Form';
import Products, { NewProducts, ViewProduct } from '../components/Products';
import Services, { NewServices, ViewService } from '../components/Services';
import Suppliers, { NewSuppliers, ViewSupplier } from '../components/Suppliers';

function Dashboard() {
  document.body.removeAttribute('data-bs-spy');
  document.body.removeAttribute(' data-bs-target');
  document.getElementById('root').classList.add("d-flex", "flex-column", "vh-100", "overflow-hidden");


    return (
    <>
      <header id="header-dashboard" className="border-bottom">
        <DashboardNavigation />
      </header>
      <div className="container-fluid flex-grow-1 d-flex flex-column flex-sm-row overflow-auto">
        <div className="row flex-grow-sm-1 flex-grow-0 vw-100 h-100">
          <DashboardSidebar />
          <main id="main-dashboard" className="col overflow-auto px-0">
            <div className="rounded-3 p-4 h-100">
              <Routes>
                <Route path="dashboard" element={<Home />} />
                <Route path="orders" element={<Orders />} />
                <Route path="schedule" element={<Schedule />} />
                <Route path="visits/:id" element={<Visit />} />
                <Route path="search" element={<Search />} />
                <Route path="patients/:id" element={<Patient />} />
                <Route path="customers/:id" element={<Customer />} />
                <Route path="registrations" element={<Registrations />} />
                <Route path="registrations/:name" element={<Registrations />} />
                <Route path="waiting_room" element={<WaitingRoom />} />
                <Route path="visits/:id/bill" element={<Bill />} />
                <Route path="customers/:id/pay_debt" element={<PayDebt />} />
                <Route path="settings" element={<AdminSettings />} />
                <Route path="users/:id/profile" element={<UserProfile />} />
                <Route path="users/:id" element={<User />} />
                <Route path="users/new" element={<Form selector='user' action='add' />} />
                <Route path="products" element={<Products />} />
                <Route path="products/new" element={<NewProducts />} />
                <Route path="products/:id" element={<ViewProduct />} />
                <Route path="services" element={<Services />} />
                <Route path="services/new" element={<NewServices />} />
                <Route path="services/:id" element={<ViewService />} />
                <Route path="suppliers" element={<Suppliers />} />
                <Route path="suppliers/new" element={<NewSuppliers />} />
                <Route path="suppliers/:id" element={<ViewSupplier />} />
                <Route path="species/:id" element={<Species />} />
                <Route path="races/:id" element={<Race />} />
                <Route path="postal_codes/:id" element={<PostalCode />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </>
  );


}

export default Dashboard;
