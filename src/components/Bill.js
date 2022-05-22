import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { addServicesLog } from "./api/ApiServicesLog";
import { addProductsLog } from "./api/ApiProductsLog";
import { addBill, findBill } from "./api/ApiBills";
import { payBill } from "./api/ApiBills";
import { findOneVisit, updateCart } from "./api/ApiVisits";
import global from "../global";

function Bill() {
    const { id } = useParams();
    let bill;
    let cart = [];
    let toPay = [];
    let pendingItems = [];
    let total = 0;

    const handleData = (data) => {

        if (data.cart) cart = data.cart;
        toPay = cart; // Añadimos todos los artículos a la lista de pago
        fillList();
    }

    const listSentences = (p, ul) => {

        const span_currency = document.createElement('span');
        span_currency.classList.add('ms-1');
        span_currency.textContent = global.currency;

        const li = document.createElement('li');
        const div = document.createElement('div');
        const div_1 = document.createElement('div');
        const a = document.createElement('a');
        const i = document.createElement('i');
        const span_1 = document.createElement('span');
        const div_2 = document.createElement('div');
        const input_2 = document.createElement('input');
        const span_2 = document.createElement('span');

        li.classList.add('list-group-item','list-group-item-action', 'd-flex', 'align-items-center');

        div.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'w-100');
        div.addEventListener('click', sendPending);
        div.dataset.id = p.id;
        div.dataset.type = p.type;
        
        a.setAttribute('href', '#');
        a.dataset.id = p.id;
        a.dataset.type = p.type;
        a.addEventListener('click', removeItem);
        i.classList.add('bi', 'bi-x', 'fs-4', 'eliminate');

        div_1.classList.add('d-flex', 'align-items-center');

        div_2.classList.add('d-flex', 'flex-row', 'align-items-center');
        input_2.classList.add('form-control', 'col-auto', 'me-3');
        input_2.setAttribute('type', 'number');
        input_2.dataset.id = p.id;
        input_2.dataset.type = p.type;
        input_2.dataset.price = p.price;
        input_2.dataset.quantity = p.q;
        input_2.addEventListener('input', changeQ);
        span_2.classList.add('col-auto');
        span_2.id = 'product-price';

        span_1.textContent = p.name;
        input_2.value = p.q;
        span_2.textContent = parseFloat(p.price).toFixed(2);

        a.append(i);
        div_1.append(span_1);
        div_2.append(input_2, span_2, span_currency);
        div.append(div_1, div_2)
        li.append(a, div);
        ul.append(li);
    }

    const fillList = () => {
        const ulToPay = document.querySelector('#itemsList');
        ulToPay.innerHTML = '';
        const ulPending = document.querySelector('#pendingItems');
        ulPending.innerHTML = '';

        total = 0;

        const span_currency = document.createElement('span');
        span_currency.classList.add('ms-1');
        span_currency.textContent = global.currency;

        if (toPay.length > 0) {
            toPay.forEach(p => {
                total += parseFloat(p.price * p.q);
                listSentences(p, ulToPay)
           });
        }

        if (pendingItems.length > 0) {
            pendingItems.forEach(p => {
                listSentences(p, ulPending);
                console.log(p)
            });
        }

        // Total
        total = total.toFixed(2);
        const totalAmount = document.querySelector('#total-amount');
        totalAmount.innerHTML = '';
        const spanTotal = document.createElement('span');
        spanTotal.classList.add('ms-3', 'fs-3', 'fw-bold');
        spanTotal.textContent = total;
        span_currency.classList.add('fw-bold', 'fs-3')
        
        totalAmount.append(spanTotal, span_currency);

        findBill(setBill, {visit_id: id})
        
    }

    // Envía el producto a pendientes
    const sendPending = e => {
        e.preventDefault();
        // Hacemos visible la lista de pendientes
        const pendingList = document.querySelector('#pendingContainer');
        pendingList.classList.remove('d-none');

        // Accedemos al enlace de eliminar que tiene almacenado el id y el tipo como propiedades.
        const targetItem = e.currentTarget.dataset;

        let item;
        item = toPay.find(o => o.id === targetItem.id && o.type === targetItem.type);
        
        if (item) {
            toPay = toPay.filter(i => i.id !== targetItem.id || i.type !== targetItem.type);
            pendingItems.push(item);
        } else {
            item = pendingItems.find(o => o.id === targetItem.id && o.type === targetItem.type);
            pendingItems = pendingItems.filter(i => i.id !== targetItem.id || i.type !== targetItem.type);
            toPay.push(item);

            if (pendingItems.length == 0) pendingList.classList.add('d-none');
        }

        fillList();

    }

    // Cambiar cantidad de producto
    const changeQ = e => {
        const input = e.target;
        cart.forEach(p => {
            if (p.id === input.dataset.id && p.type === input.dataset.type) p.q = input.value;
        });
        updateCart(id, cart);
        fillList();
    }

    // Remueve el objeto
    const removeItem = e => {
        e.preventDefault();
        let input = e.currentTarget.dataset;
        cart = cart.filter(i => i.id !== input.id || i.type !== input.type);  // Filtra el carrito, dejando pasar solo los objetos distintos del eliminado.
        updateCart(id, cart);

        toPay = toPay.filter(i => i.id !== input.id || i.type !== input.type);  // Eliminamos el ítem de todos los arrays
        pendingItems = pendingItems.filter(i => i.id !== input.id || i.type !== input.type);

        fillList(); // Volvemos a renderizar la lista
    }

    const giveChange = e => {
        e.preventDefault();
        const amount = parseFloat(e.target.value);
        const cashChange = document.querySelector('#cash-change');
        cashChange.value = (amount - total).toFixed(2);
    }
    
    // Comprueba si exsite el ticket de la visita y si no es así, lo crea
    const setBill = billData => {
        bill = billData;

        if (bill.length === 0) {
            const data = {
                visit_id: id,
                paid: false,
                amount: total
            }
            addBill(setBill, data);
        }
    }

    // Creamos los logs que asocian los productos y servicios a los tickets
    const makeLogs = () => {
        cart.forEach(i => {
            const iData = {
                id: i.id,
                quantity: i.q,
                paid: false,
                visit: id,
            }
            console.log(i)
            i.type === 'products' ?
                addProductsLog(iData) :
                addServicesLog(iData)
        });
        
    }
    
    const completePay = (e) => {
        e.preventDefault();
        makeLogs();
        const cashAmount = document.querySelector('#cash-amount');
        const cashChange = document.querySelector('#cash-change');
        let paid;
        let totalAmount;

        cart.forEach(i => {
            totalAmount += i.price;
        });

        cashChange.value >= 0 ? 
            paid = parseFloat(cashAmount.value - cashChange.value).toFixed(2)
            :
            paid = parseFloat(cashAmount.value).toFixed(2);

        const bData = {
            id: bill.id,
            paid: paid,
            amount: totalAmount
        }
        const location = '/turdus/waiting_room';
        payBill(bData, location);
        

    }
    useEffect(() => {
        findOneVisit(handleData, id);
        
    }, [])
    return (
        <>
            <div id="pendingContainer" className="d-none">
                <h4>Pendientes</h4>
                <hr />
                <ul id="pendingItems" className="list-group list-group-flush overflow-scroll" />
            </div>
            <h4>Carrito</h4>
            <hr />
            <ul id="itemsList" className="list-group list-group-flush overflow-scroll" />
            <hr />
            <div className="d-flex justify-content-between">
                <button 
                    type="button" 
                    className="btn btn-outline-primary" 
                    data-bs-target="#pay-cash" 
                    data-bs-toggle="collapse" 
                    aria-expanded="false" 
                    aria-controls="#pay-cash">
                    Efectivo
                </button>
                <div id="total-amount" className="me-3">
                </div>
            </div>
            <div id="pay-cash" className="collapse mt-3">
                <div className="input-group col-auto mb-3">
                    <span className="input-group-text">Abonado</span>
                    <input id="cash-amount" type="text" className="form-control col-auto" placeholder="Cantidad abonada" onChange={giveChange}></input>
                    <span className="input-group-text">€</span>
                </div>
                <div className="input-group col-auto mb-3">
                    <span className="input-group-text">Cambio</span>
                    <input id="cash-change" type="text" className="form-control col-auto" placeholder="A devolver"></input>
                    <span className="input-group-text">€</span>
                </div>
                <div className="col-auto">
                <button type="button" className="btn btn-primary" onClick={completePay}>Efectuar cobro</button>
                </div>
            </div>
        </>
    )
}

export default Bill;