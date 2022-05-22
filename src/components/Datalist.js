// DATALIST

// Recoge los valores de la misma key de cada objeto para 
// imprimirlos después en la datalist correspondiente.
const getDataDatalist = (fetchData, id ) => {
    const data = fetchData.allData;

    if (data.length > 0) {                          // Primero comprobamos que tenemos datos.

        let i = 0;                                  // Inicializamos un contador para recorrer los id del array de ids para las datalist.
        
        let keys = Object.keys(data[0]);            // Recogemos las keys del objeto.
        
        keys.shift();                               // Eliminamos la key 'id',

        keys.forEach(k => {                         // Por cada key recorremos todos los objetos y los almacenamos para enviarlos al método que crea la datalist.
            let arrData = [];               

            data.forEach(obj => { arrData.push(obj[k]) });

            arrData = [... new Set(arrData)];       // Eliminamos elementos repetidos.

            handleDatalist(arrData, id[i]);
            i++;
        });
    }
}

const handleDatalist = (data, id) => {
    let arr = [];
    data.forEach(e => {

        arr.push({value: e, text: e})
    });
    const datalistElement = document.getElementById(`${id}-datalist`);

    // Comprobamos si existe la datalist
    if (datalistElement) {
    const datalist = datalistGenerator(id, arr);
    datalistElement.innerHTML = datalist;
    }
}


function datalistGenerator (id, data) {
    let datalist;
    data.forEach(v => {

        datalist += 
        `
            <option id="${id.slice(0,2)}-${v.value}" value='${v.value}'>${v.text}</option> 
        `;

    });
    return datalist;
}


export { getDataDatalist };